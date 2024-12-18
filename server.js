const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware for parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Sample Book Data
const books = [
    { id: 1, title: 'The Clock Shifter', author: 'Alea Harper', year: 2024 },
    { id: 2, title: 'Caraval', author: 'Stephanie Garber', year: 2017 },
    { id: 3, title: 'The Black Witch', author: 'Laurie Forest', year: 2018 },
    { id: 4, title: 'Variety', author: 'Colleen Hoover', year: 2021 },
    { id: 5, title: 'Gothikana', author: 'Runyx', year: 2022 },
    { id: 6, title: 'A Crooked Kingdom', author: 'Leigh Bardugo', year: 2016 }
];

// Routes
// Route to fetch all books
app.get('/api/books', (req, res) => {
    res.json({
        success: true,
        data: books
    });
});

// Route to fetch a single book by ID
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.json({
            success: true,
            data: book
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
});

// Additional Routes for Projects (if applicable)
const projectRoutes = require('./routes/projectRoutes'); // Ensure this file exists
app.use('/projects', projectRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
