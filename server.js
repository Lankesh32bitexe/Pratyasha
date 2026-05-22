// server.js – Simple Express server to serve static files and handle wishes
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const WISHES_FILE = path.join(__dirname, 'wishes.json');

app.use(express.json());
// Simple CORS middleware for same‑origin or development testing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(express.static(__dirname)); // serve static assets

function readWishes() {
  try {
    const data = fs.readFileSync(WISHES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeWishes(wishes) {
  try {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write wishes file:', e);
  }
}

app.get('/api/wishes', (req, res) => {
  res.json(readWishes());
});

app.post('/api/wishes', (req, res) => {
  try {
    const { name, avatar, message } = req.body;
    if (!name || !avatar || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const wishes = readWishes();
    wishes.unshift({ name, avatar, message, timestamp: Date.now() });
    writeWishes(wishes);
    res.status(201).json({ success: true });
  } catch (e) {
    console.error('Error handling POST /api/wishes:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/wishes', (req, res) => {
  writeWishes([]);
  res.json({ success: true });
});
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
