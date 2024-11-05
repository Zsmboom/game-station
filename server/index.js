import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Database setup
const db = new Database(join(__dirname, 'circles.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS circles (
    id TEXT PRIMARY KEY,
    image TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.post('/api/circles', (req, res) => {
  const { id, image, score } = req.body;

  try {
    const stmt = db.prepare('INSERT INTO circles (id, image, score) VALUES (?, ?, ?)');
    stmt.run(id, image, score);
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error saving circle:', error);
    res.status(500).json({ error: 'Failed to save circle' });
  }
});

app.get('/api/circles/:id', (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare('SELECT * FROM circles WHERE id = ?');
    const circle = stmt.get(id);

    if (!circle) {
      return res.status(404).json({ error: 'Circle not found' });
    }

    res.json({
      id: circle.id,
      image: circle.image,
      score: circle.score,
      created_at: circle.created_at
    });
  } catch (error) {
    console.error('Error retrieving circle:', error);
    res.status(500).json({ error: 'Failed to retrieve circle' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});