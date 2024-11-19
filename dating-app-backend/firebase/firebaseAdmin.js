//dotenv is for service account key (ignored)
require("dotenv").config({ path: "../ignore/.env" });

console.log("Environment Variable (RAW):", process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

//check to ensure Firebase key is in .env
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY in environment variables");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

console.log("Service Account Object:", serviceAccount); // Debug: Ensure JSON parsed correctly

const admin = require("firebase-admin");

//Initialize Firebase Admin with service account credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://codecollab2024-ce3f8-default-rtdb.firebaseio.com/"
})

console.log("Firebase Admin Initialized");

module.exports = admin;