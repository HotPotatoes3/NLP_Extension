import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const cache = new Map(); // In-memory cache

app.post('/gemini', async (req, res) => {
  const url = req.body.url;
  const prompt = `Analyze what you estimate trustworthiness of this website to be: ${url}. Provide a short 1-2 sentence overview.`;

  // ✅ Check cache first
  if (cache.has(url)) {
    console.log("🧠 Cache hit for:", url);
    return res.json({ summary: cache.get(url) });
  }

  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      })
    });

    const json = await geminiRes.json();
    const summary = json?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";

    // ✅ Store in cache
    cache.set(url, summary);

    res.json({ summary });
  } catch (e) {
    console.error("❌ Gemini API Error:", e);
    res.status(500).json({ error: 'Gemini API request failed.' });
  }
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
