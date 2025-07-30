# 🖥️ Research Helper Credibility Backend – Deployment Guide

This Node.js backend powers the Chrome extension by sending URLs to Google’s Gemini API and returning brief credibility summaries. It includes in-memory caching for better performance.

---

## 📦 Requirements

- Node.js (v16 or later)
- npm
- A Gemini API key (from Google AI Studio or GCP Console)

---

## 🔧 Dependencies

Install the following dependencies with:

```bash
npm install express node-fetch dotenv cors
```

Your `package.json` should include:

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.0",
    "express": "^5.1.0",
    "node-fetch": "^3.3.2"
  }
}
```

---

## ⚙️ Environment Setup

Create a `.env` file in the backend directory with the following content:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with your actual API key.

---

## 🚀 Run the Server

From the backend folder:

```bash
node server.js
```

This will start the backend on:

```
http://localhost:3000
```

> Make sure port 3000 is accessible if you're hosting this on a server.

---

## 🌐 API Endpoint

### `POST /gemini`

Send a POST request to evaluate the credibility of a URL.

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "summary": "This website appears moderately trustworthy based on public information."
}
```

---

## 🧠 Caching

The backend uses an in-memory cache (`Map`) to avoid sending repeated requests to Gemini for the same URL. Cached summaries are returned instantly.

---

## ✅ Production Tips

- Use a process manager like `pm2` to keep the server alive:

  ```bash
  npm install -g pm2
  pm2 start server.js
  ```

- For public deployment:
  - Enable HTTPS with a reverse proxy like NGINX.
  - Allow CORS for your extension domain if restricting origins.

---
