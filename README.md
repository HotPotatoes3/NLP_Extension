# 🧠 Google Search Research Helper – Full System Overview

This project consists of a Chrome Extension frontend and a Node.js backend working together to evaluate the trustworthiness of links shown in Google Search results.

---

## 🔍 Features

- Highlights search result links based on the top-level Domains of the url (.com, .gov, etc.).
- Hovering over a link displays a credibility popup with a short summary.
- Built-in popup UI lets users filter highlights.

---

## 🔗 Components

### 🧩 Frontend: Chrome Extension

- Injects content scripts into Google Search pages.
- Scores and colors links.
- Fetches AI trust summaries on hover.
- See `README-frontend.md` for setup instructions.

### 🖥️ Backend: Node.js Server

- Accepts URLs and returns a credibility score and AI-generated summary.
- Uses caching and NLP to reduce latency and cost.
- See `README-backend.md` for deployment instructions.

---

## 🧪 Example Flow

1. User visits Google Search.
2. Extension highlights links (e.g., red = likely untrustworthy, green = likely reliable).
3. User hovers over a link.
4. The extension requests a trust summary from the backend.
5. A popup shows the credibility score and explanation.

---

## ⚙️ Deployment Notes

- Make sure the backend is deployed and accessible (localhost or hosted).
- Update any hardcoded URLs in the extension's JavaScript to match your deployment target (e.g., `http://yourdomain.com:3000`).

---

## 🛡️ Security & Limitations

- CORS is configured for extension–server communication.
- No personal data is stored.
- Backend performance depends on your NLP model and hosting provider.

---

## 👨‍💻 Authors

Developed by [Shridath Kanuparthy](https://github.com/HotPotatoes3)
