import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const register = (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  User.create(newUser, (err, userId) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'User registered!', userId });
  });
};

export const login = (req, res) => {
  User.findByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).json({ error: err });
    if (!user) return res.status(404).json({ error: 'User not found!' });

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password!' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ auth: true, token });
  });
};

export const getCurrentUser = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    }

    User.findById(decoded.id, (err, user) => {
      if (err) return res.status(500).json({ error: err });
      if (!user) return res.status(404).json({ error: 'User not found!' });

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name
        // Tambahkan field lain yang ingin Anda kembalikan
      });
    });
  });
};
