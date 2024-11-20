const admin = require('./firebaseAdmin'); // Import Firebase Admin SDK

// Send a notification to a specific device
const sendNotificationToDevice = async (token, title, body) => {
    const message = {
        notification: {
            title: title, // Notification title
            body: body,   // Notification body
        },
        token: token, // FCM token for the device
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

// Send a notification to a specific topic
const sendNotificationToTopic = async (topic, title, body) => {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        topic: topic, // FCM topic name
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Notification sent to topic successfully:', response);
    } catch (error) {
        console.error('Error sending notification to topic:', error);
    }
};

module.exports = { sendNotificationToDevice, sendNotificationToTopic };