const bcrypt = require('bcrypt');
const User = require('../models/user.model.ts');
const jwt = require('jsonwebtoken');

const userController = {
//registration
  registerUser: async (req, res) => {
    try {
      const { username, email, password, roles } = req.body;

      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document
      let newUser;

      if (roles) {
        newUser = new User({
          username,
          email,
          password: hashedPassword,
          roles: roles
        });
      } else {
        newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
      }


      // Save the user to the database
      const savedUser = await newUser.save();

      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to register a user' });
    }
  },

//login
  loginUser: async (req, res) => {

    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });


      // If the user doesn't exist, return error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // If the passwords don't match, return error
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '16h' });

      res.json({ token,user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to login' });
    }
  },
  //update roles
  updateRoles: async (req, res) => {
    try {
      // Get the token from the request headers
      const token = req.headers.authorization;

      const { roles } = req.body;

      if(!token){
        return res.status(401).json({message:"Unauthorized error"})
      }

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the userId from the decoded token
      const userId = decoded.userId;

      // Find the user by userId
      const user = await User.findById(userId);

      // If the user doesn't exist, return error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's roles
      user.roles = roles;
      const updatedUser = await user.save();

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update roles' });
    }
  },

};



module.exports = userController;
