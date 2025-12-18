require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Listing = require('./models/Listing');
const User = require('./models/User'); // <--- NEW IMPORT

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// --- API ROUTES ---

// 1. GET LISTINGS (Public)
app.get('/api/listings', async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. ADD LISTING (For Donors)
app.post('/api/listings', async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 3. CLAIM LISTING (For NGOs)
app.put('/api/listings/:id/claim', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: 'Not found' });

        listing.status = 'claimed';
        const updatedListing = await listing.save();
        res.json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// --- NEW AUTH ROUTES ---

// 4. REGISTER USER
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Create user
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. LOGIN USER
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        // Simple password check (In real apps, use bcrypt to compare hashes)
        if (user && user.password === password) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});