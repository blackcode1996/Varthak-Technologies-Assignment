const jwt = require('jsonwebtoken');
const BookModel = require('../models/book.model.ts');
const UserModel = require('../models/user.model.ts');

const createBook = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized error' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the userId from the decoded token
    const userId = decoded.userId;

    // Find the user by userId
    const user = await UserModel.findById(userId);

    // If the user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { roles } = user;

    if (roles.includes('CREATOR')) {
      const { title, author } = req.body;

      const createdBy = user._id;

      const book = await BookModel.create({ title, author, createdBy });

      return res.status(201).json({ message: 'Book created successfully', book });
    }

    return res.status(403).json({ message: 'User does not have the required role' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create book' });
  }
};

const viewAllBooks = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized error' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the userId from the decoded token
    const userId = decoded.userId;

    // Find the user by userId
    const user = await UserModel.findById(userId);

    // If the user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { roles } = user;

    if (roles.includes('VIEW_ALL')) {
      const books = await BookModel.find();

      return res.status(200).json({ message: 'All books retrieved successfully', books });
    }

    return res.status(403).json({ message: 'User does not have the required role' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve books' });
  }
};

const viewUserBooks = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized error' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the userId from the decoded token
    const userId = decoded.userId;

    // Find the user by userId
    const user = await UserModel.findById(userId);

    // If the user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { roles } = user;

    if (roles.includes('VIEWER')) {
      const books = await BookModel.find({ createdBy: userId });

      return res.status(200).json({ message: 'User books retrieved successfully', books });
    }

    return res.status(403).json({ message: 'User does not have the required role' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user books' });
  }
};


const showOldBooks = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized error' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the userId from the decoded token
    const userId = decoded.userId;

    // Find the user by userId
    const user = await UserModel.findById(userId);

    // If the user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the "VIEW_ALL" role
    if (user.roles.includes('VIEW_ALL')) {
      // Check if the query parameter "old" is present and truthy
      if (req.query.old) {
        const books = await BookModel.find({ createdAt: { $lte: new Date(Date.now() - 10 * 60 * 1000) } });

        return res.status(200).json({ message: 'Old books retrieved successfully', books });
      }

      return res.status(400).json({ message: 'Invalid request' });
    }

    return res.status(403).json({ message: 'User does not have the required role' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve old books' });
  }
};

const showNewBooks = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized error' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the userId from the decoded token
    const userId = decoded.userId;

    // Find the user by userId
    const user = await UserModel.findById(userId);

    // If the user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the "VIEW_ALL" role
    if (user.roles.includes('VIEW_ALL')) {
      // Check if the query parameter "new" is present and truthy
      if (req.query.new) {
        const books = await BookModel.find({ createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) } });

        return res.status(200).json({ message: 'New books retrieved successfully', books });
      }

      return res.status(400).json({ message: 'Invalid request' });
    }

    return res.status(403).json({ message: 'User does not have the required role' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve new books' });
  }
};

module.exports = { createBook,viewAllBooks,viewUserBooks,showOldBooks,showNewBooks };
