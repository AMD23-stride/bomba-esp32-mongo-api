const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection string (from your Atlas account)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define a data model (e.g., temperature and humidity)
const Data = mongoose.model('Data', {
    temperature: Number,
    humidity: Number,
    timestamp: Date,
});

// Endpoint to receive data
app.post('/api/data', async (req, res) => {
    const { temperature, humidity } = req.body;
    const newData = new Data({
        temperature,
        humidity,
        timestamp: new Date(),
    });

    await newData.save();
    res.send('Data saved!');
});

// Set the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
