const admin = require('./firebaseAdmin');

//send notifcation function
const sendNotification = async(token, title, message) => {
    const payload = {
        notification: {
            title: title,
            body: message,
        }
    };

    try {
        await admin.messaging().sendToDevice(token, payload);
        console.log("Notification sent successfully");
    }catch (error) {
        console.error("Error sending notification: ", error);
    }
};

module.exports = {sendNotifaction};