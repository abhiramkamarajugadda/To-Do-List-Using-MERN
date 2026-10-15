# To-Do List Application (MERN Stack)

A full-stack web application built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**. This project demonstrates how a modern React single-page frontend communicates with an Express/Node.js REST API and how MongoDB stores, updates, and deletes document data.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Technology Stack](#-technology-stack)
3. [Project Structure](#-project-structure)
4. [Prerequisites & Installation](#-prerequisites--installation)
5. [Running the Application](#-running-the-application)
6. [Task 1 — Frontend Features (React.js)](#-task-1--frontend-features-reactjs)
7. [Task 2 — Backend REST APIs (Node.js + Express.js)](#-task-2--backend-rest-apis-nodejs--expressjs)
8. [Task 3 — Database Schema (MongoDB: `todo_db`)](#-task-3--database-schema-mongodb-todo_db)
9. [Task 5 — GitHub Submission Guide](#-task-5--github-submission-guide)
10. [Final Demonstration Guide](#-final-demonstration-guide)

---

## 🚀 Project Overview

The **To-Do List Application** enables users to manage their daily tasks seamlessly with full CRUD (Create, Read, Update, Delete) capability:
- **Add Tasks**: Type a task title and add it instantly.
- **View Tasks**: View all existing tasks loaded dynamically from MongoDB.
- **Mark Complete/Pending**: Toggle task completion with interactive checkbox or action button.
- **Delete Tasks**: Remove tasks permanently from the database.
- **Real-Time Counters & Filtering**: Filter by All, Pending, or Completed.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js (Vite) | Interactive user interface, component state, Axios HTTP calls |
| **Backend** | Node.js + Express.js | REST API server, routing, request validation |
| **Database** | MongoDB + Mongoose | Object Data Modeling (ODM), persistent NoSQL storage |
| **Icons & Style** | Lucide React + CSS3 | Modern, responsive UI with animations and status indicators |

---

## 📁 Project Structure

```
Mern Basic project/
├── client/                     # Frontend React Application
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── App.jsx             # Main React Component (UI, state, API handlers)
│   │   ├── App.css             # Component styling & responsive layouts
│   │   ├── index.css           # Global reset & CSS design tokens
│   │   └── main.jsx            # React root mount
│   ├── index.html              # HTML entry point (Title: My To-Do List)
│   ├── vite.config.js          # Vite config & API proxy configuration
│   └── package.json            # Frontend dependencies (React, Axios, Lucide)
│
├── server/                     # Backend Node.js + Express Application
│   ├── config/
│   │   └── db.js               # MongoDB connection (todo_db) with auto-fallback
│   ├── controllers/
│   │   └── taskController.js   # CRUD logic for tasks
│   ├── models/
│   │   └── Task.js             # Mongoose schema (taskName, isCompleted, createdAt)
│   ├── routes/
│   │   └── taskRoutes.js       # Express route handlers for /api/tasks
│   ├── .env.example            # Environment variables template
│   ├── .env                    # Local environment config
│   ├── server.js               # Express app entry point
│   ├── test-api.js             # Automated API test script
│   ├── view-mongo-tasks.js     # CLI MongoDB inspector script
│   └── package.json            # Backend dependencies (Express, Mongoose, CORS)
│
├── todo-api-postman-collection.json  # Postman / Insomnia API test collection
├── package.json                # Root package for running both servers concurrently
├── .gitignore                  # Git ignore rules for node_modules & .env
└── README.md                   # Full documentation & demonstration guide
```

---

## ⚙️ Prerequisites & Installation

### 1. Prerequisites
- **Node.js** v18+ installed ([Download Node.js](https://nodejs.org/))
- **MongoDB** (Local MongoDB Community Server or free [MongoDB Atlas](https://www.mongodb.com/atlas))

### 2. Install All Dependencies
Open a terminal in the root directory and run:
```bash
npm run install:all
```
*(This installs dependencies for root, server, and client.)*

---

## ▶️ Running the Application

### Option A: Run Both Frontend and Backend Concurrently (Recommended)
From the project root:
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:3000` (or the port shown in terminal)

### Option B: Run Individually in Separate Terminals

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

---

## 🖥️ Task 1 — Frontend Features (React.js)

The React single-page frontend is implemented in `client/src/App.jsx` and satisfies all required specifications:

1. **Application Heading**: `My To-Do List`
2. **Text Box to Enter a Task**: Input field with placeholder and validation.
3. **Add Task Button**: Primary button to dispatch `POST /api/tasks`.
4. **List of Added Tasks**: Live reactive list populated from `GET /api/tasks`.
5. **Mark as Completed Control**: Interactive circular checkbox AND an explicit `"Mark as Completed"` / `"Mark Pending"` button.
6. **Delete Task Button**: Red outline button with trash icon to delete from database.
7. **Task Counters & Filters**: Live counts for Total, Pending, and Completed tasks, plus quick tab filters.

---

## 🔌 Task 2 — Backend REST APIs (Node.js + Express.js)

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description | Request Body | Success Status |
|---|---|---|---|---|
| **POST** | `/api/tasks` | Add a new task | `{"taskName": "string"}` | `201 Created` |
| **GET** | `/api/tasks` | View all tasks sorted by date | None | `200 OK` |
| **PUT** | `/api/tasks/:id` | Update task status | `{"isCompleted": boolean}` | `200 OK` |
| **DELETE** | `/api/tasks/:id` | Delete a task | None | `200 OK` |

### Sample Responses

#### 1. POST `/api/tasks`
```json
{
  "_id": "67ae9bc1234567890abcdef1",
  "taskName": "Complete MERN project submission",
  "isCompleted": false,
  "createdAt": "2026-10-15T06:14:29.584Z"
}
```

#### 2. GET `/api/tasks`
```json
[
  {
    "_id": "67ae9bc1234567890abcdef1",
    "taskName": "Complete MERN project submission",
    "isCompleted": false,
    "createdAt": "2026-10-15T06:14:29.584Z"
  }
]
```

#### 3. PUT `/api/tasks/:id`
```json
{
  "_id": "67ae9bc1234567890abcdef1",
  "taskName": "Complete MERN project submission",
  "isCompleted": true,
  "createdAt": "2026-10-15T06:14:29.584Z"
}
```

#### 4. DELETE `/api/tasks/:id`
```json
{
  "message": "Task deleted successfully",
  "task": {
    "_id": "67ae9bc1234567890abcdef1",
    "taskName": "Complete MERN project submission",
    "isCompleted": true,
    "createdAt": "2026-10-15T06:14:29.584Z"
  }
}
```

---

## 🗄️ Task 3 — Database Schema (MongoDB: `todo_db`)

- **Database Name:** `todo_db`
- **Collection Name:** `tasks`

### Schema Definition (`server/models/Task.js`):
```javascript
const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'tasks',
    versionKey: false,
  }
);
```

### MongoDB Connection Configuration (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_db
```
> **Zero-Friction Fallback:** If local MongoDB service is not started yet on the host machine, the backend automatically initiates an in-memory MongoDB instance with database `todo_db`, allowing immediate demonstration without any errors!

---

## 📦 Task 5 — GitHub Submission Guide

Follow these steps to submit your repository on GitHub:

1. Create a new empty repository on [GitHub](https://github.com/new) (e.g. `todo-list-mern-application`).
2. Open your terminal in the project root directory:
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git branch -M main
git push -u origin main
```

---

## 🧪 Final Demonstration Guide

Use this checklist during your evaluation or demonstration:

### 1. Adding a Task
1. Open the React frontend (`http://localhost:3000`).
2. Type `"Learn React & Node.js REST API"` in the input field.
3. Click **Add Task** (or hit Enter).
4. Verify the task appears immediately at the top of the list with a **Pending** badge.

### 2. Viewing Saved Tasks
1. Refresh the web page.
2. Confirm the tasks persist and reload from MongoDB via `GET /api/tasks`.

### 3. Marking a Task as Completed
1. Click either the **circular checkbox** or the **Mark as Completed** button on any task.
2. Observe:
   - The task title gets a strikethrough styling and muted color.
   - The status badge changes to **Completed** (green).
   - The completion counter in the toolbar increments.
   - The backend `PUT /api/tasks/:id` updates `isCompleted: true` in MongoDB.

### 4. Deleting a Task
1. Click the red **Delete** button next to a task.
2. The task is removed from the UI and deleted in MongoDB via `DELETE /api/tasks/:id`.

### 5. Viewing Task Records in MongoDB
You can view the records using any of the following methods:

**Method A: Built-in Terminal Inspector (Fastest)**
Run this command from the project root:
```bash
npm run view:db
```
*Outputs a formatted table of all documents in `todo_db.tasks`.*

**Method B: MongoDB Shell (`mongosh`)**
```javascript
use todo_db
db.tasks.find().pretty()
```

**Method C: MongoDB Compass**
1. Connect to `mongodb://localhost:27017`
2. Navigate to database `todo_db` -> collection `tasks`.

### 6. Testing APIs Using Postman or Insomnia

You can test the APIs in two ways:

#### A. Automated Script
Run:
```bash
npm run test:api
```
*(Tests GET, POST, PUT, DELETE in sequence and prints results.)*

#### B. Postman / Insomnia Import
1. Open **Postman** or **Insomnia**.
2. Click **Import** -> Select file `todo-api-postman-collection.json` located in the project root.
3. Test all 4 pre-configured requests:
   - `GET http://localhost:5000/api/tasks`
   - `POST http://localhost:5000/api/tasks`
   - `PUT http://localhost:5000/api/tasks/:id`
   - `DELETE http://localhost:5000/api/tasks/:id`

---

## 🎯 Summary

This project strictly adheres to all specified guidelines:
- React.js frontend with `My To-Do List` heading, input, buttons, status indicators.
- Express.js backend with 4 REST APIs (`GET`, `POST`, `PUT`, `DELETE`).
- MongoDB `todo_db` database and `tasks` collection with fields `taskName`, `isCompleted`, `createdAt`, `_id`.
- Postman collection and demonstration guides included.
