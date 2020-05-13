const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const authRouter = new Router();

// Users
authRouter.get('/users', async (req, res) => {
  if (req.user.isAuthenticated) {
    const users = await userModel.find();
    res.json(users);
  } else {
    res.json({ error: 'Invalid token.' });
  }
});

// Login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await userModel.findOne({ email });
  if (!user) {
    res.json({
      error: `User doesn't exists.`,
    });
  } else {
    const authenticated = await bcrypt.compare(password, user.password);
    if (authenticated) {
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: '2 days',
      });
      res.json({ token });
    } else {
      res.json({ error: 'Invalid credentials.' });
    }
  }
});

// Signup
authRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({
      error: `Coudn't get email or password.`,
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email: email,
      password: hashedPassword,
    });
    res.json(user);
  }
});

module.exports = authRouter;
