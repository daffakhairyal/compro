import express from 'express';
import { 
  getProfile, 
  upsertProfile, 
  deleteProfile 
} from '../controllers/ProfileController.js';
import { verifyToken } from '../middleware/Auth.js';

const router = express.Router();

// Rute untuk mendapatkan profile
router.get('/profile', verifyToken, getProfile);

// Rute untuk menambah atau mengupdate profile
router.post('/profile', verifyToken, upsertProfile);

// Rute untuk menghapus profile
router.delete('/profile', verifyToken, deleteProfile);

export default router;
