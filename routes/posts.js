const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')

// @route    GET api/posts
// @desc     Test route
// @access   Private
router.get('/',  verifyToken, async (req, res) => {
  res.json({posts : { title: 'my first post', description: 'private data'}})
});

module.exports = router;
