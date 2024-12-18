	const mongoose = require('mongoose');
	require('dotenv').config(); // For environment variables
	
	// MongoDB connection URI
	const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatabase';
	
	// Function to connect to MongoDB
	const connectDB = async () => {
	  try {
	    await mongoose.connect(mongoURI, {useNewUrlParser: true,
	      useUnifiedTopology: true,
	    });
	    console.log('MongoDB connected successfully');
	  } catch (err) {
	    console.error('MongoDB connection error:', err.message);
	    process.exit(1); // Exit process on failure
	  }
	};
