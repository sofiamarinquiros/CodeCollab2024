const { sendNotificationToDevice, sendNotificationToTopic } = require('./firebase-push-notifications/firebaseMessaging');
//const mongoose = require('mongoose');
const mongoose = require('./database'); // Use the centralized connection
// const uri = 'mongodb+srv://sam2451:codecollab@eventual.riz2z.mongodb.net/?retryWrites=true&w=majority&appName=eventual'
// // Connect to MongoDB
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// Server creation
const express = require('express');
const app = express();

app.use(express.json());

// '/' means root URL
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes
// post route for user sign up (API endpoint simulation)
const bcrypt = require('bcrypt');
const User = require('./models/User');

app.post('/api/auth/signup', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name });
        await user.save();
        res.status(201).send(`User created with email: ${user.email}`);
    } catch (error) {
        res.status(400).send("Error creating user");
    }
});


// post route for event creation
const Event = require('./models/Event');

app.post('/api/events', async (req, res) => {
    const { name, date, location, organizer } = req.body;
    try {
        const event = new Event({ name, date, location, organizer });
        await event.save();
        res.status(201).send(`Event created: ${event.name}`);
    } catch (error) {
        res.status(400).send("Error creating event");
    }
});


// route for retrieving events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).send("Error retrieving events");
    }
});
const jwt = require('jsonwebtoken');

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: "Logged in successfully", token });
    } else {
        res.status(401).send("Invalid email or password");
    }
});

// Firebase
// for registering or updating FCM tokens
app.post('/api/notifications/register', async (req, res) => {
    const { userId, fcmToken } = req.body;

    try {
        const user = await User.findById(userId); // Ensure the user exists
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update the user's FCM token
        user.fcmToken = fcmToken;
        await user.save();

        res.status(200).send('FCM token registered successfully');
    } catch (error) {
        console.error('Error registering FCM token:', error);
        res.status(500).send('Internal server error');
    }
});

// for push notification to a specific user by UserId
app.post('/api/notifications/send', async (req, res) => {
    const { userId, title, body } = req.body;

    if (!userId || !fcmToken) {
        return res.status(400).send("Missing required fields: userId or fcmToken");
    }

    try {
        const user = await User.findById(userId); // Find the user
        if (!user || !user.fcmToken) {
            return res.status(404).send('User or FCM token not found');
        }

        // Send the notification
        await sendNotificationToDevice(user.fcmToken, title, body);
        res.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Internal server error');
    }
});

// send notifications to a topic
app.post('/api/notifications/send-to-topic', async (req, res) => {
    const { topic, title, body } = req.body;

    try {
        // Send the notification to the topic
        await sendNotificationToTopic(topic, title, body);
        res.status(200).send('Notification sent to topic successfully');
    } catch (error) {
        console.error('Error sending notification to topic:', error);
        res.status(500).send('Internal server error');
    }
});

// Creating server PORT, defaults to 3000 if not defined already
const PORT = process.env.PORT || 3000;

// Start server and listen for requests on defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});