const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks - GET /api/tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.GetAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get task by id - GET /api/tasks/:id
router.get('/:id', async (req, res) => {
    
    const taskId = req.params.id;
    try {
        const task = await Task.GetTasksById(taskId);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
        
    } catch (error) {
        console.error('Error fetching task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a task - POST /api/tasks
router.post('/', async (req, res) => {
    const newTask = req.body;
    try {
        const result = await Task.AddTask(newTask);
        if(result){
            res.json({ message: 'Task added successfully' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error adding task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a task - PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    try {
        const result = await Task.UpdateTask(taskId, updatedTask);
        if(result.modifiedCount > 0) {
            res.json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error('Error updating task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a task - DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const result = await Task.DeleteTask(taskId);
        if(result.deletedCount > 0) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error('Error deleting task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
