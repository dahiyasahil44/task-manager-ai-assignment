# Task Manager Backend

Simple Node.js Express backend for a task manager.

## Features

- Express server
- CORS enabled
- JSON body parsing middleware
- Runs on port 5000 by default

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

3. Optional: run in development mode with automatic restarts (requires `nodemon`, already in devDependencies):

```bash
npm run dev
```

## Test the API

- Health check:

  - **Method**: `GET`
  - **URL**: `http://localhost:5000/api/health`

You should receive a JSON response:

```json
{
  "status": "ok",
  "message": "Task Manager API is running"
}
```

## Suggested Folder Structure

This project is ready to be extended. A common structure for a task manager backend would be:

- `index.js` - Application entry point / Express server
- `routes/` - Route definitions (e.g., `tasks.js`)
- `controllers/` - Request handlers
- `models/` - Data models
- `middleware/` - Custom middleware (e.g., auth, validation)
- `config/` - Configuration and environment-specific settings

