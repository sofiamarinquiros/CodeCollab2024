// require("dotenv").config({ path: "./ignore/.env" }); // Load environment variables
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../ignore/.env') });
console.log('Service Account Path:', process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH); //

//const mongoose = require('mongoose');
const mongoose = require('../database');
const admin = require('firebase-admin');

// Load the service account key
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://codecollab2024-ce3f8-default-rtdb.firebaseio.com/', // Replace <your-project-id> with your actual Firebase project ID
});

console.log('Firebase Admin Initialized');

module.exports = admin;

// mongoose
//     .connect("mongodb://localhost:27017/firebaseNotifications")
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Error connecting to MongoDB:", err));