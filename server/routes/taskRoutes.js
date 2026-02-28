const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTask, moveTask, getTasksByBoard } = require('../controllers/taskController');

router.post('/', auth, createTask);
router.put('/:taskId/move', auth, moveTask);
router.get('/:boardId', auth, getTasksByBoard);

module.exports = router;