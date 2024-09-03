import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  getProfile, 
  upsertProfile, 
  deleteProfile
} from '../controllers/ProfileController.js';
import { verifyToken } from '../middleware/Auth.js';

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// Rute untuk menambahkan profile baru dengan upload gambar (hanya jika belum ada profile)
router.post('/profile', verifyToken, upload.single('image'), upsertProfile);

// Rute lainnya...
router.get('/profile', getProfile); // Untuk mendapatkan semua profile (meskipun harusnya hanya ada satu) // Mengupdate profile berdasarkan ID
router.delete('/profile/:id', verifyToken, deleteProfile); // Menghapus profile berdasarkan ID

export default router;
