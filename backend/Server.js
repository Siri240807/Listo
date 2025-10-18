const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Srija@123', // your MySQL password
  database: 'todo'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// Default route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// 🟢 Get all todos
app.get('/todos', (req, res) => {
  const sql = 'SELECT * FROM todoItems';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('❌ Error fetching todos:', err.message);
      return res.status(500).send('Database error');
    }
    res.json(result);
  });
});

// 🟢 Add new todo
app.post('/add-item', (req, res) => {
  const { itemDescription } = req.body;
  if (!itemDescription) {
    return res.status(400).send('itemDescription is required');
  }

  const sql = 'INSERT INTO todoItems (itemDescription) VALUES (?)';
  db.query(sql, [itemDescription], (err, result) => {
    if (err) {
      console.error('❌ Error inserting item:', err.message);
      return res.status(500).send('Database error');
    }
    console.log('✅ Item added');
    res.sendStatus(200);
  });
});

// 🟠 Update todo (edit text)
app.put('/update-item/:id', (req, res) => {
  const { id } = req.params;
  const { itemDescription } = req.body;
  if (!itemDescription) {
    return res.status(400).send('itemDescription is required');
  }

  const sql = 'UPDATE todoItems SET itemDescription = ? WHERE ID = ?';
  db.query(sql, [itemDescription, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating item:', err.message);
      return res.status(500).send('Database error');
    }
    console.log(`✅ Item ${id} updated`);
    res.sendStatus(200);
  });
});

// 🔴 Delete todo
app.delete('/delete-item/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todoItems WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting item:', err.message);
      return res.status(500).send('Database error');
    }
    console.log(`🗑️ Item ${id} deleted`);
    res.sendStatus(200);
  });
});

// ✅ Mark as completed / toggle
app.put('/toggle-completed/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE todoItems SET completed = NOT completed WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error toggling completed:', err.message);
      return res.status(500).send('Database error');
    }
    console.log(`✅ Item ${id} toggled completion`);
    res.sendStatus(200);
  });
});

// Server start
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
