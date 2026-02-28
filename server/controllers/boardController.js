const Board = require('../models/Board');

exports.createBoard = async (req, res) => {
  try {
    const board = new Board({
      name: req.body.name,
      owner: req.user._id,
      members: [req.user._id]
    });

    await board.save();
    res.json(board);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      members: req.user._id
    }).populate('members', 'name email');

    res.json(boards);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};