const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createColumn, getColumns } = require('../controllers/columnController');

router.post('/', auth, createColumn);
router.get('/:boardId', auth, getColumns);

module.exports = router;