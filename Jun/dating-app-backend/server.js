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
app.post('/api/auth/signup', (req, res) => {
    const userData = req.body;
    // sign up logic goes here
    res.send(`User signed up with email: ${userData.email}`);
})

// post route for event creation
app.post('/api/events', (req, res) => {
    const eventData = req.body;
    // event creation logic goes here
    res.send(`Event created: ${eventData.name}`);
})

// route for retrieving events
app.get('/api/events', (req, res) => {

})
