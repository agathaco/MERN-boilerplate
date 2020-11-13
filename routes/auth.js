const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('./validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @route    POST api/auth
// @desc     Register route
// @access   Public
router.post('/register',  async (req, res) => {

  // Validate the user data first
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { name, email, password } = req.body;

  // Check if user already exists
  let userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send('Email already exists')

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    const newUser = await user.save()
    res.status(201).send({user: newUser._id})
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err)
  }
});

// @route    POST api/auth
// @desc     Login route
// @access   Public
router.post('/login', async (req, res) => {

  // Validate the user data first
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { email, password } = req.body;

  // Check if user exists
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email')

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) return res.status(400).send('Invalid password')

  // get token
  const payload = {
    user: {
      id: user.id
    }
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET)
  res.header('auth_token', token).send(token)

});

module.exports = router;