import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDb();

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
