const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBoard, getBoards, getFullBoard, getBoardActivity, inviteMember, getDashboardStats } = require('../controllers/boardController');

router.post('/', auth, createBoard);
router.get('/', auth, getBoards);
router.get('/:boardId/full', auth, getFullBoard);
router.get('/:boardId/activity', auth, getBoardActivity);
router.put('/:boardId/invite', auth, inviteMember);
router.get('/dashboard/stats', auth, getDashboardStats);

module.exports = router;