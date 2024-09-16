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

const registrationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    suburb: String,
    postalCode: String,
    password: String,
});

const Registration = mongoose.model('Registration', registrationSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/registerOwner', async (req, res) => {
    const { firstName, lastName, phone, email, address, suburb, postalCode, password } = req.body;

    const newRegistration = new Registration({
        firstName,
        lastName,
        phone,
        email,
        address,
        suburb,
        postalCode,
        password,
    });

    try {
        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving registration data', error });
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
    Registration,
    runDBConnection,
    mongoURI,
};
