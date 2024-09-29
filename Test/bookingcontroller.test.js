const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Load the MongoDB URI from the .env file
const { Booking } = require('../Models/bookingmodel'); // Adjust if necessary
const bookingController = require('../Controllers/bookingcontroller');
const app = express();

// Middleware
app.use(bodyParser.json());

// Define a test route to test the controller
app.post('/api/bookings', bookingController.createBooking);
app.get('/api/bookings', bookingController.getBookings);
app.get('/api/bookings/:name', bookingController.getBookingByName);

describe('Booking Controller', () => {
  
  before(async function () {
    // Connect to MongoDB using the URI from the .env file
    this.timeout(10000); // Allow more time for connection
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
  });

  beforeEach(async function () {
    // Clear the database before each test
    await mongoose.connection.db.collection('Booking').deleteMany({});
  });

  after(async function () {
    // Disconnect from MongoDB after all tests are done
    await mongoose.disconnect();
  });

  it('should create a new booking and return status 201', async function () {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        name: 'Kay',
        phone: '1234567890',
        date: '2024-09-01',
        time: '10:00',
      })
      .expect(201);

    expect(response.headers['content-type']).to.match(/json/);

    const expectedResponse = {
      name: 'Kay',
      phone: '1234567890',
      date: '2024-09-01T00:00:00.000Z',
      time: '10:00',
      _id: response.body._id, // MongoDB-generated _id
      __v: response.body.__v,  // MongoDB version key
    };

    expect(response.body).to.deep.include(expectedResponse);
  });
});

describe('GET /api/bookings', () => {
  before(async function () {
    this.timeout(10000); // Allow enough time for MongoDB connection
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
  });

  beforeEach(async function () {
    await Booking.deleteMany({});
  });

  after(async function () {
    await mongoose.disconnect();
  });

  it('should return all bookings and status 200', async function () {
    const bookings = [
      {
        name: 'Kay',
        phone: '1234567890',
        date: '2024-09-01T00:00:00.000Z',
        time: '10:00',
      },
    ];

    await Booking.insertMany(bookings);

    const response = await request(app)
      .get('/api/bookings')
      .timeout({ deadline: 5000, response: 2000 })
      .expect(200);

    expect(response.headers['content-type']).to.match(/json/);

    const normalizedResponse = response.body.map((booking) => ({
      name: booking.name,
      phone: booking.phone,
      date: booking.date.split('T')[0],
      time: booking.time,
    }));

    const expectedResponse = bookings.map((booking) => ({
      name: booking.name,
      phone: booking.phone,
      date: booking.date.split('T')[0],
      time: booking.time,
    }));

    expect(normalizedResponse).to.deep.equal(expectedResponse);
  });

  it('should handle errors and return status 500', async function () {
    const findStub = sinon.stub(Booking, 'find').rejects(new Error('Failed to fetch bookings'));

    const response = await request(app)
      .get('/api/bookings')
      .timeout({ deadline: 5000, response: 2000 })
      .expect(500);

    expect(response.body.error).to.equal('Failed to fetch bookings');
    findStub.restore();
  });
});

describe('GET /api/bookings/:name', () => {
  before(async function () {
    this.timeout(10000); // Allow enough time for MongoDB connection
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
  });

  beforeEach(async function () {
    await Booking.deleteMany({});
  });

  after(async function () {
    await mongoose.disconnect();
  });

  it('should return the specific booking by name and status 200', async function () {
    const specificName = 'Kay';
    const booking = {
      name: specificName,
      phone: '1234567890',
      date: '2024-09-01T00:00:00.000Z',
      time: '10:00',
    };

    await Booking.insertMany([booking]);

    const response = await request(app)
      .get(`/api/bookings/${specificName}`)
      .timeout({ deadline: 10000, response: 2000 })
      .expect(200);

    expect(response.headers['content-type']).to.match(/json/);

    const responseBody = {
      name: response.body.name,
      phone: response.body.phone,
      date: response.body.date,
      time: response.body.time,
    };

    expect(responseBody).to.deep.equal(booking);
  });

  it('should handle errors and return status 500', async function () {
    sinon.stub(Booking, 'findOne').throws(new Error('Database failure'));

    const response = await request(app)
      .get('/api/bookings/InvalidName')
      .expect(500);

    expect(response.body.error).to.equal('Failed to fetch specific booking');
    Booking.findOne.restore();
  });
});
