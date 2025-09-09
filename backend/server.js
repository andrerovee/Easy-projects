const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Project = require('./project.model');
const Task = require('./task.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const app = express();
const port = 3000;

// Connessione al DB
connectDB();

app.use(cors());
app.use(express.json());

// 🔑 Segreto JWT 
const JWT_SECRET = process.env.JWT_SECRET || 'LaTuaPassword';

// Middleware di autenticazione 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // manca il token

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // token non valido
        req.user = user; // contiene { id: user._id }
        next();
    });
};

// ROUTE PROJECTS 

// GET tutti i progetti
app.get('/api/projects', authenticateToken, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST nuovo progetto
app.post('/api/projects', authenticateToken, async (req, res) => {
    const newProject = new Project({ ...req.body, userId: req.user.id });
    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT aggiornamento progetto
app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const updatedProject = await Project.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedProject) return res.status(404).json({ message: 'Project non trovato' });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE progetto
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const deletedProject = await Project.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!deletedProject) return res.status(404).json({ message: 'Project non trovato' });
        res.json({ message: 'Project eliminato con successo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//  ROUTE TASKS 

// GET tasks di un progetto
app.get('/api/projects/:projectId/tasks', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST nuovo task
app.post('/api/projects/:projectId/tasks', authenticateToken, async (req, res) => {
    const newTask = new Task({
        name: req.body.name,
        isCompleted: req.body.isCompleted,
        projectId: req.params.projectId
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT task
app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task non trovato' });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE task
app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task non trovato' });
        res.json({ message: 'Task eliminato con successo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// AUTH 

// Registrazione
app.post('/api/register', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Utente registrato :)' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ message: 'Credenziali non valide' });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenziali non valide' });

        // Crea token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login effettuato', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`);
});
