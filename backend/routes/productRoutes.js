import express from 'express';
const router = express.Router();

import {
  createProduct,
  getAllProducts,
  getProdFromAuthor,
} from '../controllers/productController.js';

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProdFromAuthor);
export default router;
