import express from 'express'
import { register, login, getCurrentUser } from '../controllers/AuthController.js';
import { verifyToken } from '../middleware/Auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getCurrentUser);

export default router;
