# 🔍 Google Search Link Scorer Chrome Extension

This Chrome extension highlights links on Google Search result pages based on their domain type (e.g., `.com`, `.org`, `.edu`). It also displays a popup interface that lets users filter which links are highlighted by score using simple checkboxes.

---

## 🚀 Installation & Usage

1. **Clone or download this repository:**

```bash
git clone https://github.com/HotPotatoes3/NLP_Extension
```

2. **Open Chrome and navigate to:**

```
chrome://extensions
```

3. **Enable "Developer mode"** (toggle at the top right).

4. Click **"Load unpacked"** and select the folder where you cloned or downloaded the extension.

5. Navigate to a Google Search results page, such as:

```
https://www.google.com/search?q=test
```

6. Click the extension icon (puzzle piece in the Chrome toolbar) and select the **"Link Highlighter"** extension.

7. In the popup:
   - View the **color key** showing what each domain score means.
   - Use the **checkboxes** to filter which types of domains get highlighted.

> 💡 Note: Only **organic search result links** are highlighted. Tabs, embedded content, and ads are ignored.

---

## 🎯 Scoring Logic

Links are scored based on their domain suffix:

| Domain Type     | Score | Highlight Color |
|------------------|--------|-------------------|
| `.com`           | 3      | Yellow-ish         |
| `.org`           | 2      | Green-ish          |
| `.edu`, `.gov`   | 1      | Blue-ish           |
| Others           | 0      | Red-ish            |

These scores are used both for highlighting links on the page and for filtering them in the popup.

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 🔧 Steps

1. **Fork** this repository on GitHub.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes locally.
4. Commit and push your work:
   ```bash
   git commit -m "Add your feature"
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** describing your changes.

### 💡 Ideas for Contributions

- Add support for more domain-based scoring (e.g., `.net`, `.io`)
- Show the number of links highlighted per score
- Add dark mode for the popup UI
- Persist checkbox filter state using `chrome.storage`
- Include scoring based on content keywords or site metadata
- Add NLP capabilities (in progress)

---


## 📄 License

This project is open source and available under the [MIT License](LICENSE).
