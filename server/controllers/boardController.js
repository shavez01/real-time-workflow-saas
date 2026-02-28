const Board = require('../models/Board');
const Task = require('../models/Task');
const Column = require('../models/Column');

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

exports.getFullBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId)
      .populate('members', 'name email');

    if (!board) return res.status(404).json({ msg: "Board not found" });

    const columns = await Column.find({ board: board._id }).sort({ order: 1 });

    const tasks = await Task.find({ board: board._id });

    const formattedColumns = columns.map(col => ({
      ...col.toObject(),
      tasks: tasks.filter(task => task.column.toString() === col._id.toString())
    }));

    res.json({
      ...board.toObject(),
      columns: formattedColumns
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoardActivity = async (req, res) => {
  try {
    const activities = await Activity.find({ board: req.params.boardId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(activities);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.inviteMember = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);

    if (!board.owner.equals(req.user._id))
      return res.status(403).json({ msg: "Only owner can invite" });

    if (!board.members.includes(req.body.userId)) {
      board.members.push(req.body.userId);
      await board.save();
    }

    res.json(board);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { assignedTo: req.user._id } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};