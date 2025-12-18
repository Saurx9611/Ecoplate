const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In real apps, we encrypt this!
  role: { 
    type: String, 
    enum: ['donor', 'ngo'], // User must be one of these two
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);