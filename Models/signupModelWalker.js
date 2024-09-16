const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const mongoURI = 'mongodb+srv://keerthuvije:ZEZS1JlZIvPPwkPe@cluster0.avmbigb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const runDBConnection = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

// Define Walker Schema
const walkerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    idProof: { type: String, required: true }, // Ensure 'required: true' matches if necessary
    idUpload: { type: String }, // Adjust data type if you want to save as a file path or URL
    certification: { type: String, required: true },
    otherCertification: { type: String }, // Optional if not always provided
    address: { type: String, required: true },
    suburb: { type: String, required: true },
    postalCode: { type: String, required: true },
    services: { type: [String], required: true }, // Expecting an array of strings
    password: { type: String, required: true },
  });
  

const Walker = mongoose.model('Walker', walkerSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route for Walker Registration
app.post('/registerWalker', async (req, res) => {
    const { firstName, lastName, phone, email, idProof, idUpload, certification, otherCertification, address, suburb, postalCode, services, password } = req.body;

    const newWalker = new Walker({
        firstName,
        lastName,
        phone,
        email,
        idProof,
        idUpload,
        certification,
        otherCertification,
        address,
        suburb,
        postalCode,
        services,
        password,
    });

    try {
        await newWalker.save();
        res.status(201).json({ message: 'Walker registration successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving walker data', error });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

runDBConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start the server:', error);
    });

module.exports = {
    Walker,
    runDBConnection,
    mongoURI,
};
