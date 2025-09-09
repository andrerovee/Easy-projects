const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true, default: 'Da fare'},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;