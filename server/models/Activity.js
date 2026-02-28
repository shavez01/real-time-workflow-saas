const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);