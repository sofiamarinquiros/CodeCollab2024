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
    // sign up logic goes here
    const userData = req.body;
    res.send(`User signed up with email: ${userData.email}`);
})

// post route for event creation
app.post('/api/events', (req, res) => {
    // event creation logic goes here
    const eventData = req.body;
    res.send(`Event created: ${JSON.stringify(eventData)}`);
})

// route for retrieving events
app.get('/api/events', (req, res) => {

})
