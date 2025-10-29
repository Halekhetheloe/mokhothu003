const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Add this import
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow all origins for now
app.use(cors());
app.use(express.json());

app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Student Feedback API' });
});

// Add database download route
app.get('/api/debug/download-db', (req, res) => {
  const path = '/tmp/feedback.db';
  
  console.log('Attempting to download database from:', path);
  
  if (fs.existsSync(path)) {
    console.log('Database file found, sending download...');
    res.download(path, 'feedback.db', (err) => {
      if (err) {
        console.error('Error downloading database:', err);
        res.status(500).json({ error: 'Error downloading database file' });
      }
    });
  } else {
    console.log('Database file not found at:', path);
    res.status(404).json({ 
      error: 'Database file not found',
      message: 'The SQLite database file does not exist at /tmp/feedback.db'
    });
  }
});

// Optional: Add database info route
app.get('/api/debug/db-info', (req, res) => {
  const path = '/tmp/feedback.db';
  
  if (fs.existsSync(path)) {
    const stats = fs.statSync(path);
    res.json({
      exists: true,
      path: path,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      downloadUrl: '/api/debug/download-db'
    });
  } else {
    res.json({
      exists: false,
      path: path,
      message: 'Database file not found'
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Listen on all network interfaces (important for Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});