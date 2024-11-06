//dotenv is for service account key (ignored)
require("dotenv").config();

//Importing Firebase Admin SDK
const admin = require("firebase-admin");

//Import service account key from dotenv
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

//Initialize Firebase Admin with service account credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://codecollab2024-4f284.firebaseio.com"
})

module.exports = admin;