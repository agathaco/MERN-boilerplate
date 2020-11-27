const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkObjectId = require('../middleware/checkObjectId');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route    GET api/profile/me
// @desc     Get current user profile
// @access   Private
router.get('/current', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).send('There is no profile for this user');
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Update user profile
// @access   Private
router.post('/', verifyToken, async (req, res) => {
    const {
      location,
      bio,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    const profileFields = {
      user: req.user.id,
      location,
      bio
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = value;
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profiles
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).send('Profile not found');

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      if (error.kind == 'ObjectId') {
        return res.status(400).send('Profile not found');
      }
      return res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', verifyToken, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.send('User deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

