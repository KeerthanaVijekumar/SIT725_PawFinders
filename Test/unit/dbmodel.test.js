const mongoose = require('mongoose');
const { expect } = require('chai');
require('dotenv').config(); // To load environment variables like MONGODB_URI

describe('MongoDB Connection', () => {
    before(async function () {
      this.timeout(10000); // Increase timeout for connection
      try {
        // Connect to MongoDB using the URI from the .env file
        const mongoURI = process.env.MONGODB_URI;
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Fail the test if connection fails
      }
    });
  
    it('should successfully connect to MongoDB and perform a simple query', async function () {
      try {
        // Perform a query to ensure MongoDB is operational
        const result = await mongoose.connection.db
          .collection('Bookings')
          .findOne({});
        if (result) {
          console.log('MongoDB is operational.');
        } else {
          console.log('No data found in the Booking collection.');
        }
      } catch (error) {
        console.error('Error during MongoDB query:', error);
        throw error; // Fail the test if query fails
      }
    });
  
    after(async function () {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error; // Fail the test if disconnection fails
      }
    });
});