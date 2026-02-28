const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);