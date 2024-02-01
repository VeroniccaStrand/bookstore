import express from 'express';
const router = express.Router();

import {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

router.route('/').get(getAllBooks).post(addBook);
router.route('/:id').delete(deleteBook).put(updateBook).get(getBook);

export default router;
