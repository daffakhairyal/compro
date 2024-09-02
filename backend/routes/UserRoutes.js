import express from 'express';
import { 
  getUserById, 
  getUserByEmail, 
  getAllUsers, 
  updateUserById, 
  deleteUserById 
} from '../controllers/UserController.js';
import { verifyToken } from '../middleware/Auth.js';

const router = express.Router();

// Rute untuk mendapatkan user berdasarkan ID
router.get('/users/:id',verifyToken, getUserById);

// Rute untuk mendapatkan user berdasarkan email
router.get('/users/email/:email',verifyToken, getUserByEmail);

// Rute untuk mendapatkan semua user
router.get('/users',verifyToken, getAllUsers);

// Rute untuk mengupdate user berdasarkan ID
router.put('/users/:id',verifyToken, updateUserById);

// Rute untuk menghapus user berdasarkan ID
router.delete('/users/:id',verifyToken, deleteUserById);

export default router;
