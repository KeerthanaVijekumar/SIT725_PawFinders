const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../src/models/userModel');

chai.use(chaiHttp);
const { expect } = chai;

before(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterEach(async () => {
  // Clear the test database
  await User.deleteMany({});
});

after(async () => {
  // Close the database connection
  await mongoose.connection.close();
});

describe('Authentication Tests', () => {
  it('should register a new user', async () => {
    const res = await chai.request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message').eql('User registered successfully');
  });

  it('should login an existing user', async () => {
    await chai.request(app)
      .post('/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });

    const res = await chai.request(app)
      .post('/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

  it('should not login with invalid credentials', async () => {
    // Try logging in with incorrect credentials
    const res = await chai.request(app)
      .post('/login')
      .send({
        email: 'john.doe@example.com',
        password: 'wrongpassword'
      });

    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message').eql('Invalid credentials');
  });
});