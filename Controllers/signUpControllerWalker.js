const { Registration } = require('../model/signupModel'); // Adjust the path according to your file structure

// Create a new registration
const createNewWalkerRegistration = async (req, res) => {
  const { firstName, lastName, phone, email, idProof, certification, address, suburb, postalCode, service, password } = req.body;

  // Check for missing fields
  if (!firstName || !lastName || !phone || !email || !idProof || !certification || !address || !suburb || !postalCode || !service || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create a new registration instance
  const newRegistrationWalker = new Registration({
    firstName,
    lastName,
    phone,
    email,
    idUpload: req.file ? req.file.path : undefined,
    certification,
    address,
    suburb,
    postalCode,
    service,
    password
  });

  try {
    await newRegistrationWalker.save();
    res.status(201).json(newRegistrationWalker);
  } catch (error) {
    console.error('Error saving registration:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to save registration' });
  }
};

// Export the function for use in other files
module.exports = {
    createNewWalkerRegistration,
};
