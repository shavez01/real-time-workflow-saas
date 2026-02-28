const Column = require('../models/Column');

exports.createColumn = async (req, res) => {
  try {
    const column = new Column({
      name: req.body.name,
      board: req.body.boardId,
      order: req.body.order
    });

    await column.save();
    res.json(column);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getColumns = async (req, res) => {
  try {
    const columns = await Column.find({ board: req.params.boardId })
      .sort({ order: 1 });

    res.json(columns);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};