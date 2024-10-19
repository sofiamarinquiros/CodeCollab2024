/*
// this imports express.js library
const express = require("express");

// creates object 'app' that is an express application
const app = express();

// sets server's port to the environment variable PORT if it exists or 3000 by default
// port is address the server listens on
const PORT = process.env.PORT || 3000;

//tells server to use middleware to parse JSON data sent in requests
app.use(express.json());

// '/' means root URL
// when GET request is made responds with this message
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server and listen for requests on defined port
app.listen(PORT, () => {
    console.log('Server running on http://localhost:PORT', PORT);
})

LISTEN: server-side: starts server and make it listen for connections

GET: client-side: retrieve data (like visiting a webpage) from server
POST: client side: send data to server (usually for creating or submitting forms)
PUT: client side: update existing data
DELETE: client side: remove data

// post route for user sign up (API endpoint simulation)
app.post('/api/auth/signup', (req, res) => {
    // sign up logic goes here
    res.send('User sign up route');
})

app.post('/api/events', (req, res) => {
    // creating an event simulation goes here
    res.send('Event created');
})

Backend team starts building user authentication and event management APIs.
Backend Development:
Build the initial database schema for users, events, and matches.
Implement basic API endpoints for creating events and user profiles.
Database specialist - Database schema design, query optimization, and collaboration with backend developer


*/