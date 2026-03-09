# Code Review – AI Generated Code

## Overview

While building this Task Manager application, most of the initial code was generated using Cursor IDE. The AI was very helpful in quickly setting up the project structure, generating API routes, and creating the React components. However, after running the application and deploying it, I noticed several issues in the generated code that required manual fixes.

Below are the main issues I found during review and how they were resolved.

---

# Issue 1: Deprecated MongoDB Connection Options

**File:** `config/db.js`
**Approx Line:** 6

## Problem

The AI generated the MongoDB connection code with the following configuration:

```javascript
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

When starting the server, the terminal showed this warning:

```
[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option
```

This happens because newer versions of the MongoDB Node.js driver already handle these settings internally.

## Fix

I removed the deprecated options and simplified the connection code:

```javascript
mongoose.connect(MONGO_URI);
```

## Reason

Removing deprecated options prevents warnings and ensures the application uses the modern MongoDB driver configuration.

---

# Issue 2: Vite Proxy Only Worked During Local Development

**File:** `client/vite.config.js`
**Approx Line:** 11

## Problem

The AI configured a proxy in the Vite configuration like this:

```javascript
proxy: {
  '/api': 'https://task-manager-ai-assignment-2yge.onrender.com/'
}
```

This worked perfectly during local development using `npm run dev`. However, after deploying the frontend to Vercel, the API calls started returning **404 errors**.

The issue was that Vite's proxy only works when the development server is running locally. In production environments, the proxy configuration is not applied.

## Fix

I created a dedicated Axios configuration file to directly call the backend API.

**File:** `client/src/api/axios.js`

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-ai-assignment-2yge.onrender.com/api"
});

export default api;
```

All API requests were updated to use this instance.

## Reason

In production, the frontend must communicate directly with the backend API instead of relying on development proxies.

---

# Issue 3: Missing Error Handling in API Requests

**File:** `client/src/components/TaskList.jsx`
**Approx Line:** 20

## Problem

The initial AI-generated code fetched tasks like this:

```javascript
const res = await axios.get('/api/tasks');
setTasks(res.data);
```

This works when the API is available, but if the server fails or the request is rejected, the user receives no feedback.

## Fix

I wrapped the request inside a `try/catch` block and added loading and error states.

```javascript
try {
  setLoading(true);
  const res = await api.get("/tasks");
  setTasks(res.data);
  setError(null);
} catch (err) {
  console.error(err);
  setError("Failed to load tasks");
} finally {
  setLoading(false);
}
```

## Reason

Handling errors properly improves the user experience and prevents silent failures in the UI.

---

# Issue 4: Hardcoded Backend URL

**File:** `client/src/api/axios.js`

## Problem

The backend API URL was initially hardcoded in the Axios configuration:

```javascript
baseURL: "https://task-manager-ai-assignment-2yge.onrender.com/api"
```

Hardcoding URLs can make it difficult to switch between development and production environments.

## Fix

I moved the API URL to an environment variable.

**File:** `.env`

```
VITE_API_URL=https://task-manager-ai-assignment-2yge.onrender.com/api
```

Updated Axios configuration:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
```

## Reason

Using environment variables makes the application easier to configure and deploy in different environments.

---

# Summary

Cursor IDE helped significantly with speeding up the development process by generating the initial project setup, API structure, and React components. However, the generated code still required careful review, especially for deployment and configuration issues.

This experience showed that AI tools are very helpful for productivity, but developers still need to understand and verify the generated code to ensure everything works correctly in real-world environments.
