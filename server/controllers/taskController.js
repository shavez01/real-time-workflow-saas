const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      board: req.body.boardId,
      column: req.body.columnId,
      assignedTo: req.user._id,
      priority: req.body.priority,
      dueDate: req.body.dueDate
    });

    await task.save();

    // Real-time emit
    req.io.emit("taskCreated", task);

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    task.column = req.body.newColumnId;
    await task.save();

    req.io.emit("taskMoved", task);

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksByBoard = async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId })
      .populate('assignedTo', 'name email');

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};