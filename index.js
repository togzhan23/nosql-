const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const Task = require('./models/Task');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/todo', {
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use('/auth', authRoutes);

app.post('/tasks', authMiddleware, async (req, res) => {
  try {
      const { title, description } = req.body;

      if (!title || title.length < 3) return res.status(400).json({ message: "Title must be at least 3 characters" });
      if (title.length > 100) return res.status(400).json({ message: "Title must be less than 100 characters" });
      if (description && description.length > 500) return res.status(400).json({ message: "Description must be less than 500 characters" });

      const task = new Task({ title, description, userId: req.user.userId });
      await task.save();
      res.status(201).json(task);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/tasks', authMiddleware, async (req, res) => {
  try {
      const tasks = await Task.find({ userId: req.user.userId });
      res.status(200).json(tasks);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.put('/tasks/:id', authMiddleware, async (req, res) => {
  try {
      const { title, description } = req.body;

      if (title && title.length < 3) return res.status(400).json({ message: "Title must be at least 3 characters" });
      if (title && title.length > 100) return res.status(400).json({ message: "Title must be less than 100 characters" });
      if (description && description.length > 500) return res.status(400).json({ message: "Description must be less than 500 characters" });

      const task = await Task.findOneAndUpdate(
          { _id: req.params.id, userId: req.user.userId },
          { title, description },
          { new: true }
      );

      if (!task) return res.status(404).json({ message: "Task not found" });

      res.status(200).json(task);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

app.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

      if (!task) return res.status(404).json({ message: "Task not found" });

      res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));