const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const User = require('../models/User');
const Profile = require('../models/Profile');

const { registerValidation, loginValidation } = require('./validation');
const verifyToken = require('../middleware/verifyToken')

// @route    GET api/auth
// @desc     Get signed in user route
// @access   Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // excludes password from object so we don't send it back to the frontend
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth/register
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

  const avatar = normalize(
    gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    }),
    { forceHttps: true }
  );

  const user = new User({
    name,
    email,
    avatar,
    password: hashedPassword
  });
  const savedUser = await user.save();

  // create profile
  const profile = new Profile({
    user: savedUser._id
  });
  await profile.save();

  try {
    const token = getToken(user)
    res.header('x-auth-token', token)
    res.status(201).send({token})
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err)
  }
});

// @route    POST api/auth/login
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

  // check if profile exists, if not, create it
  const profileExists = await Profile.findOne({ user: user._id });
  if (!profileExists) {
    const profile = new Profile({
      user: savedUser._id
    });
    await profile.save();
  }
  
  // get token
  const token = getToken(user)
  res.header('x-auth-token', token).send({token})

});

const getToken = (user) => {
  const payload = {
    user: {
      id: user.id
    }
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

module.exports = router;