const admin = require('./firebaseAdmin'); // Import the initialized admin module

async function testFirebase() {
    try {
        const appName = admin.app().name; // Check if the default app is initialized
        console.log(`Firebase Admin Initialized with App Name: ${appName}`);
    } catch (error) {
        console.error('Error initializing Firebase Admin:', error);
    }
}

testFirebase();

const { sendNotificationToTopic } = require('./firebaseMessaging');

// Test sending a notification
sendNotificationToTopic('test-topic', 'Hello!', 'This is a test notification.');