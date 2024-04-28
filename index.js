// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const { v4: uuidv4 } = require('uuid');





// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('scripts'));

const templatesPath = path.join(__dirname, 'templates');

// Serve static files from the templates folder
app.use(express.static(templatesPath));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(templatesPath, 'index.html'));
});



app.get('/home', async (req, res) => {
  const { username } = req.query; // Get the username from the query parameters

  try {
      // Check if the username is present in the active user table
      const activeUser = await ActiveUser.findOne({ username });

      if (!activeUser) {
          // If the user is not logged in, redirect to another page (e.g., login page)
          res.redirect('/');
          return;
      }

      // If the user is logged in, serve the home page
      res.sendFile(path.join(templatesPath, 'home.html'));
  } catch (error) {
      console.error('Error checking active user:', error);
      res.status(500).send('Internal Server Error');
  }
});









// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Define MongoDB schemas
const User = mongoose.model('User', new mongoose.Schema({
    token:String,
    name: String,
    username: String,
    email: String,
    password: String
}));

const ActiveUser = mongoose.model('ActiveUser', new mongoose.Schema({
    token: String,
    username: String
}));

const Post = mongoose.model('Post', new mongoose.Schema({
    username: String,
    postTitle: String,
    postDesc: String,
    postUrl: String,
    date: { type: Date, default: Date.now }
}));

// Middleware to parse JSON requests
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;
  const userToken = uuidv4(); // Generate a random user token
  try {
      // Check if username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
          return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Create new user
      const user = new User({ userToken, name, username, email, password });
      await user.save();
      res.status(201).json({ message: 'User created successfully', userToken });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      // Find the user by username and password
      const user = await User.findOne({ username, password });

      // Check if user exists
      if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check if the user is already logged in
      const activeUser = await ActiveUser.findOne({ username });

      // If the user is already logged in, return a response asking to logout
      if (activeUser) {
        return res.status(400).json({ message: `User is already logged in. Please logout to continue.` });
        
    }

      // Save active user
      const newActiveUser = new ActiveUser({ userToken: user.userToken, username });
      await newActiveUser.save();

      res.status(200).json({ message: 'Login successful', userToken: user.userToken });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Logout route
app.post('/logout', async (req, res) => {
  const { username } = req.body;
  try {
      // Find the active user by username
      const activeUser = await ActiveUser.findOne({ username });
      if (!activeUser) {
          return res.status(400).json({ message: 'User is not logged in' });
      }

      // Remove active user
      await ActiveUser.findOneAndDelete({ username });
      res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Post route
app.post('/post', async (req, res) => {
  const { postTitle, postDesc, username } = req.body; // Retrieve username from request body
  try {
      // Check if active user exists for the provided username
      const activeUser = await ActiveUser.findOne({ username });
      if (!activeUser) {
          return res.status(401).json({ message: 'Unauthorized' });
      }

      // Save post
      const post = new Post({ username: activeUser.username, postTitle, postDesc });
      await post.save();
      res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.get('/posts', async (req, res) => {
  try {
      // Fetch posts from the database
      const posts = await Post.find();

      // Send the posts data as JSON response
      res.json(posts);
  } catch (error) {
      // Handle any errors
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
