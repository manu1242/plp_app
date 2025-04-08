const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

mongoose
  .connect('mongodb+srv://manoharyalla83:MkC8X8ngRQGcBPKL@cluster0.rzdsq.mongodb.net/myDatabase?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

// Sign Up
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sign In
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
