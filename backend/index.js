import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import profileRoutes from './routes/ProfileRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Gunakan rute autentikasi
app.use('/auth', authRoutes);
app.use('/api',userRoutes);
app.use('/api',profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
