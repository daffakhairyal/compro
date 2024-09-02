import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  getHeroItemById, 
  getAllHeroItems, 
  createHeroItem, 
  updateHeroItemById, 
  deleteHeroItemById 
} from '../controllers/HeroController.js';
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

// Rute untuk menambahkan gallery item baru dengan upload gambar
router.post('/hero', verifyToken, upload.single('image'), createHeroItem);

// Rute lainnya...
router.get('/hero', getAllHeroItems);
router.get('/hero/:id', getHeroItemById);
router.put('/hero/:id', verifyToken, updateHeroItemById);
router.delete('/hero/:id', verifyToken, deleteHeroItemById);

export default router;
