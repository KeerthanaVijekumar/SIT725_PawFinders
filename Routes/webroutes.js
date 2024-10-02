// routes/webRoutes.js
const express = require("express");
const path = require("path");
const router = express.Router();

// Route to serve index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "index.html"));
});

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Views', 'dashboard.html'));
});

// Route to serve about.html
router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "about.html"));
});

// Route to serve booking.html
router.get("/bookings", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "bookings.html"));
});

// Route to serve gallery.html
router.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "gallery.html"));
});

// Route to serve services.html
router.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "services.html"));
});

// Route to serve search.html
router.get("/findsitter", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "findsitter.html"));
});

//Route to signup page
router.get("/signUp", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "signUp.html"));
});
//Route to walker signup page
router.get("/signUpWalker", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "walkerSignUp.html"));
});
//Route to owner signup page
router.get("/signUpOwner", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "ownerSignUp.html"));
});


module.exports = router;
