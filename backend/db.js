const mongoose = require('mongoose');

const uri = "mongodb+srv://roveda:Email.lavoro1!@cluster1.075yqt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connesso al DB!');
    } catch (err) {
        console.error('Erroe di connessione a MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;