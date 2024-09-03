const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token });
    } catch (err) {
      console.error('Error in registration:', err.message);  // Log the error
      res.status(500).send('Server error');
    }
  };
  
// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  