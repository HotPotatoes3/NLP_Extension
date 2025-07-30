# 🔍 Research Helper Extension – Frontend (Chrome Extension)

This Chrome extension highlights links on Google Search result pages based on an AI credibility score. It also shows a popup with filtering controls and fetches detailed trustworthiness information when hovering over links.

---

## 🧩 How to Deploy the Extension

1. **Clone the repository:**

```bash
git clone https://github.com/HotPotatoes3/Research-Helper-Extension.git
```

2. **Open Chrome and go to:**

```
chrome://extensions
```

3. **Enable "Developer mode"** (top-right toggle).

4. Click **"Load unpacked"** and select the "extension" folder in the cloned repository.

5. Go to a Google Search page, like:

```
https://www.google.com/search?q=test
```

6. Click the extension icon (puzzle piece) → select **"Link Highlighter"**.

7. In the popup:
   - View the color key for credibility scores.
   - Use checkboxes to filter which links are highlighted.

---

## 💡 Notes

- The extension only highlights **organic search links** (no ads or embedded widgets).
- Hovering over a link sends a request to the backend and displays an AI-generated credibility popup.
- Make sure the backend server is running and accessible (see `README-backend.md`).
