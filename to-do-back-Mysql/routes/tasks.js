const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create Task
router.post('/', async (req, res) => {
  const { assignedTo, status, dueDate, priority, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const [result] = await db.execute(
      'INSERT INTO tasks (title, completed, assignedTo, status, dueDate, priority, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, false, assignedTo, status, dueDate, priority, description]
    );
    res.status(201).json({ id: result.insertId, title, completed: false, assignedTo, status, dueDate, priority, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

// Get All Tasks
router.get('/', async (req, res) => {
  try {
    const [tasks] = await db.execute('SELECT * FROM tasks');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Update Task
router.put('/:id', async (req, res) => {
  const { title, completed, assignedTo, status, dueDate, priority, description } = req.body;
  try {
    await db.execute(
      'UPDATE tasks SET title = ?, completed = ?, assignedTo = ?, status = ?, dueDate = ?, priority = ?, description = ? WHERE id = ?',
      [title, completed, assignedTo, status, dueDate, priority, description, req.params.id]
    );
    res.json({ id: req.params.id, title, completed, assignedTo, status, dueDate, priority, description });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
