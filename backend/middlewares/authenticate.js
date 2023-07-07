const jwt = require('jsonwebtoken');
const User = require('../models/user.model.ts');

const authenticate = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized error' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the userId from the decoded token
    const userId = decoded.userId;

    // Find the user by userId
    const user = User.findById(userId);

    // If the user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
