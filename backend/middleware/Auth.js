// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ auth: false, message: 'No token provided.' });
    }
  
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      }
  
      // Simpan ID pengguna di request untuk digunakan di route selanjutnya
      req.userId = decoded.id;
      next();
    });
  };