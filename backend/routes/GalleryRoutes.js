import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  getGalleryItemById, 
  getAllGalleryItems, 
  createGalleryItem, 
  updateGalleryItemById, 
  deleteGalleryItemById 
} from '../controllers/GalleryController.js';
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
router.post('/gallery', verifyToken, upload.single('image'), createGalleryItem);

// Rute lainnya...
router.get('/gallery', getAllGalleryItems);
router.get('/gallery/:id', getGalleryItemById);
router.put('/gallery/:id', verifyToken, updateGalleryItemById);
router.delete('/gallery/:id', verifyToken, deleteGalleryItemById);

export default router;
