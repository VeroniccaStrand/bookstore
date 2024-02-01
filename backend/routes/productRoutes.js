import express from 'express';
const router = express.Router();

import { getAllProducts } from '../controllers/productController.js';

router.route('/').get(getAllProducts);
export default router;
