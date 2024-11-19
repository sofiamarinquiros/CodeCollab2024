const { sendNotification } = require('./firebaseMessaging');

// Replace with your desired topic
const topicName = 'test-topic';

// Test sending a notification to a topic
sendNotification(topicName, 'Hello Topic!', 'This is a test notification for the topic.');