// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/bookingcontroller');
const asyncHandler = require('../Utils/asyncHandler');
const { register, login } = require('../Controllers/authController');


// API routes for bookings
router.post('/bookings', asyncHandler(bookingController.createBooking));
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:name', bookingController.getBookingByName);
router.put('/bookings/:name', bookingController.updateBooking);
router.delete('/bookings/:name', bookingController.deleteBooking);
router.get('/bookings', bookingController.getSortedBookings);
router.post('/register', register);
router.post('/login', login);


module.exports = router;