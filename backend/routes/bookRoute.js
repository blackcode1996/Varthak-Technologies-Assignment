const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Route for creating books
router.post('/create',bookController.createBook);
// Route for viewing all books
router.get('/viewallbooks', bookController.viewAllBooks);
// Route for viewing specific user books
router.get('/viewuserbooks', bookController.viewUserBooks);
// Route for getting books that were created more than 10 minutes ago
router.get('/oldbooks', bookController.showOldBooks);
// Route for getting books that were created less than 10 minutes ago
router.get('/newbooks', bookController.showNewBooks);

module.exports = router;
