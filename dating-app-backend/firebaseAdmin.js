//Importing Firebase Admin SDK
const admin = require("firebase-admin");

//Import service account key
const serviceAccount = require("./firebaseServiceAccountKey.json");

//Initialize Firebase Admin with service account credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://codecollab2024-4f284.firebaseio.com"
})

module.exports = admin;