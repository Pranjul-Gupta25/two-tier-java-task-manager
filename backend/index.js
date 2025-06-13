const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Error:", err));

// Task Schema
const Task = mongoose.model('Task', {
    title: String,
    completed: Boolean
});

// Routes
app.get('/', (req, res) => res.send('Task Manager API'));

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});

