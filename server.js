// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { connectDB } = require("./public/js/DBConnection");
const path = require("path");
const bookingController = require("./Controllers/bookingcontroller");
const webRoutes = require("./Routes/webroutes"); // Import static file routes
const apiRoutes = require("./Routes/apiroutes"); // Import API routes
const bookingRoutes = require("./Routes/bookings");
const reviewRoutes = require("./Routes/reviews"); // Import review routes
const registrationRoutes = require("./Routes/registration");

const loginRoutes = require("./Routes/loginroutes");

const app = express();
const port = 3041;

const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socket(server);

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "Views")));

// Use the routes
app.use("/", webRoutes); // Serve static file routes
app.use("/api", apiRoutes); // Serve API routes
app.use("/user", bookingRoutes); // Bookings-related routes
app.use("/reviews", reviewRoutes); // Review-related routes
app.use("/registration", registrationRoutes); // Registration-related routes

app.use("/login", loginRoutes); // Map the login routes

// Socket setup
const users = {};
io.on("connection", (socket) => {
  socket.on("register", (userId) => {
    console.log("user registered");
    users[userId] = socket.id;
    console.log(`User registered: ${userId}, Socket ID: ${socket.id}`);
  });

  socket.on("user_connected", (data) => {
    const username = data.username || "Guest";
    console.log(`${username} has connected`);
    socket.emit("welcome_message", { message: `Welcome, ${username}!` });
  });

  socket.on("Transaction", (data) => {
    let userId = data.notificateUserId;
    const socketId = users[userId];
    if (socketId) {
      io.to(socketId).emit("Transaction", { message: "New message" });
    }
  });
});

// Main server function
const runServer = async () => {
  try {
    await connectDB(); // Centralized DB connection
    console.log("Server is running on port", port);

    // Test MongoDB Connection
    const testConnection = async () => {
      try {
        const result = await mongoose.connection.db
          .collection("Booking")
          .findOne({});
        console.log("Connection test result:", result);
      } catch (error) {
        console.error("Error during connection test:", error);
      }
    };

    mongoose.connection.once("open", () => {
      testConnection();
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

runServer();
