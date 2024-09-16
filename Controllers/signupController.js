const { Registration } = require('../model/signupModel');

const createRegistration = async (req, res) => {
  const { firstName, lastName, phone, email, address, suburb, postalCode, password } = req.body;

  if (!firstName || !lastName || !phone || !email || !address || !suburb || !postalCode || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newRegistration = new Registration({
    firstName,
    lastName,
    phone,
    email,
    address,
    suburb,
    postalCode,
    password
  });

  try {
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    console.error('Error saving registration:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to save registration' });
  }
};

module.exports = {
  createRegistration,
};
