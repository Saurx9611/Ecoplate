const mongoose = require('mongoose');
require('dotenv').config();
const Listing = require('./models/Listing');

const sampleListings = [
  {
    title: "Sourdough Bread & Pastries",
    donor: "City Bakery",
    type: "Bakery",
    quantity: "5kg",
    distance: "1.2 km",
    expiresIn: "4 hours",
    status: "available"
  },
  {
    title: "Leftover Catering Rice",
    donor: "Grand Hotel",
    type: "Cooked Food",
    quantity: "20 meals",
    distance: "3.5 km",
    expiresIn: "2 hours",
    status: "available"
  },
  {
    title: "Fresh Tomatoes",
    donor: "Downtown Market",
    type: "Raw Ingredients",
    quantity: "10kg",
    distance: "0.8 km",
    expiresIn: "2 days",
    status: "claimed"
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");
        
        await Listing.deleteMany({}); // Clear old data
        await Listing.insertMany(sampleListings); // Add new data
        console.log("Data Imported Successfully!");
        
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();