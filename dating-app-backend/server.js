const mongoose = require('mongoose');
const uri = 'mongodb+srv://sam2451:codecollab@eventual.riz2z.mongodb.net/?retryWrites=true&w=majority&appName=eventual'
// Connect to MongoDB 
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server creation
const express = require('express');
const app = express();

// Creating server PORT, defaults to 3000 if not defined already
const PORT = process.env.PORT || 3000;

app.use(express.json());

// '/' means root URL
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server and listen for requests on defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
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


