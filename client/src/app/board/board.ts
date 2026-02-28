import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class Board implements OnInit {

  board: any;
  activities: any[] = [];
  socket: any;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const boardId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');

    // Load board
    const res = await axios.get(
      `http://localhost:5000/api/boards/${boardId}/full`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.board = res.data;

    // Load activity
    await this.reloadActivity();

    // Socket setup
    this.socket = io('http://localhost:5000');

    this.socket.on("taskCreated", () => this.reloadActivity());
    this.socket.on("taskMoved", () => this.reloadActivity());
  }

  async reloadActivity() {
    const token = localStorage.getItem('token');
    const res = await axios.get(
      `http://localhost:5000/api/boards/${this.board._id}/activity`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.activities = res.data;
  }

  async drop(event: CdkDragDrop<any[]>, columnId: string) {

    if (event.previousContainer === event.container) return;

    const task = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const token = localStorage.getItem('token');

    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}/move`,
      { newColumnId: columnId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  async addTask(columnId: string) {

    const title = prompt("Task title?");
    if (!title) return;

    const token = localStorage.getItem('token');

    const res = await axios.post(
      `http://localhost:5000/api/tasks`,
      {
        title,
        boardId: this.board._id,
        columnId,
        priority: "medium"
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const column = this.board.columns.find((c: any) => c._id === columnId);
    column.tasks.push(res.data);
  }
}