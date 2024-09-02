import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import profileRoutes from './routes/ProfileRoutes.js';
import galleryRoute from './routes/GalleryRoutes.js';
import heroRoute from './routes/HeroRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Menggunakan import.meta.url untuk mendapatkan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware untuk melayani file statis dari folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoutes);
app.use('/api',userRoutes);
app.use('/api',profileRoutes);
app.use('/api', galleryRoute);
app.use('/api', heroRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
