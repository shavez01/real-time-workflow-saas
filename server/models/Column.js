const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  order: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Column', ColumnSchema);