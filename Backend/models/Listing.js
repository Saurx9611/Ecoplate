const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    donor: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: String, required: true },
    distance: { type: String, required: true },
    expiresIn: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['available', 'claimed'], 
        default: 'available' 
    },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);