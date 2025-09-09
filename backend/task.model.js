const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;