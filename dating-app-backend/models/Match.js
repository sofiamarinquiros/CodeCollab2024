const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    status: String, // e.g., 'pending', 'accepted'
});

module.exports = mongoose.model('Match', matchSchema);
