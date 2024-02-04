import express from 'express';
const router = express.Router();

import {
  createProduct,
  getAllProducts,
} from '../controllers/productController.js';

router.route('/').get(getAllProducts).post(createProduct);
export default router;
