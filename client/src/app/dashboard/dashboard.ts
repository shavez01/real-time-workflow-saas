import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  boards: any[] = [];
  stats: any = {};

  constructor(private router: Router) {}

  async ngOnInit() {

    const token = localStorage.getItem('token');

    const boardsRes = await axios.get(
      'http://localhost:5000/api/boards',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    this.boards = boardsRes.data;

    const statsRes = await axios.get(
      'http://localhost:5000/api/boards/dashboard/stats',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    statsRes.data.forEach((item: any) => {
      this.stats[item._id] = item.count;
    });
  }

  async createBoard() {
    const name = prompt("Board name?");
    if (!name) return;

    const token = localStorage.getItem('token');

    const res = await axios.post(
      'http://localhost:5000/api/boards',
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    this.boards.push(res.data);
  }

  openBoard(id: string) {
    this.router.navigate(['/board', id]);
  }
}