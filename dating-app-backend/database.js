// centralized MongoDB connection

const mongoose = require('mongoose');

//const uri = 'mongodb+srv://sam2451:codecollab@eventual.riz2z.mongodb.net/?retryWrites=true&w=majority&appName=eventual';
const uri = 'mongodb://localhost:27017/firebaseNotifications'; //Jun temp one

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;