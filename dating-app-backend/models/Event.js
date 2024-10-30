const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: Date,
    location: String,
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Additional fields as needed
});

module.exports = mongoose.model('Event', eventSchema);
