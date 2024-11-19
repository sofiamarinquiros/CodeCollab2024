require('dotenv').config({ path: "../ignore/.env" }); // Load .env file
const admin = require('./firebaseAdmin'); // Import Firebase Admin

console.log("Firebase Admin Module Imported Successfully"); // Debug

const messaging = admin.messaging(); // Initialize Messaging

// Wrap everything in an async function
async function testSubscribeToTopic() {
    try {
        console.log("Starting Subscription Test"); // Debug
        const response = await messaging.subscribeToTopic(['sample-device-token'], 'test-topic');
        console.log('Subscription successful:', response);
    } catch (error) {
        console.error('Error subscribing to topic:', error);
    }
}

testSubscribeToTopic(); // Call the async function