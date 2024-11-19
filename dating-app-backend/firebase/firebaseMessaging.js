const admin = require('./firebaseAdmin');

//send notifcation function
//const sendNotification = async(token, title, message) => {
const sendNotification = async (topic, title, message) => {
    const payload = {
        notification: {
            title: title,
            body: message,
        }
    };

    try {
        //await admin.messaging().sendToDevice(token, payload);
        await admin.messaging().sendToTopic(topic, payload);
        console.log("Notification sent successfully");
    }catch (error) {
        console.error("Error sending notification: ", error);
    }
};

module.exports = {sendNotification};
//sendNotification('test-topic', 'Test Title', 'Test Message');