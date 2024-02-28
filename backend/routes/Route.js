const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.use('/tasks', TaskController);

module.exports = router;
