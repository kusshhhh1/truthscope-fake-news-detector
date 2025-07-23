const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get('/api/news', async (req, res) => {
  const page = Math.floor(Math.random() * 5) + 1;
  const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=15&page=${page}&apiKey=${NEWS_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data.message || 'Failed to fetch news' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/verify-news', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data.message || 'Failed to verify news' });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify news' });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`News proxy running on http://localhost:${PORT}`);
}); 