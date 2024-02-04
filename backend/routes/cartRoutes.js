import express from 'express';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';
import { addToCart } from '../controllers/cartController.js';

router.route('/').post(protect, addToCart);

export default router;
