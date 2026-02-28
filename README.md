👨‍💻 Author

Shavez Mohammad
Full-Stack Developer (Java + MEAN + Distributed Systems)

# 🚀 Real Time Workflow Manager

A full-stack **Real-Time Workflow & Task Management System** built using the **MEAN stack (MongoDB, Express, Angular, Node.js)**.

This project demonstrates modern SaaS architecture with authentication, role-based access, drag-and-drop Kanban boards, real-time updates, and activity tracking.

---

## ✨ Features

- 🔐 JWT Authentication (Login / Register)
- 🗂 Boards with Members
- 📌 Columns (To Do / In Progress / Done)
- 📝 Task Creation & Assignment
- 🎯 Priority Levels (Low / Medium / High)
- 🔄 Drag & Drop Task Movement
- 📡 Real-Time Updates (Socket.IO)
- 📊 Dashboard Aggregation (Backend)
- 📜 Activity Log Sidebar
- 🧠 MongoDB Relations & Aggregation
- 🐳 Docker-ready Backend

---

## 🏗 Architecture

Angular (Standalone Components)
        ↓
Node.js + Express REST API
        ↓
MongoDB (Mongoose ODM)
        ↓
Socket.IO (Real-Time Updates)

---

## 🛠 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | Angular 17+ (Standalone) |
| Backend      | Node.js + Express |
| Database     | MongoDB |
| Realtime     | Socket.IO |
| Authentication | JWT |
| Drag & Drop  | Angular CDK |
| HTTP Client  | Axios |

---

## 📁 Project Structure


---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository

```bash
git https://github.com/shavez01/real-time-workflow-saas.git
cd real-time-workflow-saas
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
```
## Start backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
ng serve
```

## 📡 Core API Endpoints

- Authentication
    POST /api/auth/register
    POST /api/auth/login
- Boards
    POST /api/boards
    GET /api/boards
    GET /api/boards/:boardId/full
    GET /api/boards/:boardId/activity
    PUT /api/boards/:boardId/invite
- Columns
    POST /api/columns
    GET /api/columns/:boardId
- Tasks
    POST /api/tasks
    PUT /api/tasks/:taskId/move
    GET /api/tasks/:boardId

## 🚀 Future Enhancements

- Persistent drag order saving
- Task comments & attachments
- Advanced dashboard analytics
- Deployment (AWS / Render / Docker Compose)
- CI/CD integration