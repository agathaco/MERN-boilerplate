const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No token, access denied')

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedUser.user;
    next();
  } catch (err) {
    console.error('Authentication failed');
    res.status(500).send('Server Error');
  }
}

module.exports = auth;
