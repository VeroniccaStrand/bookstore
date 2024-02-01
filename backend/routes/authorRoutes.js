import express from 'express';
const router = express.Router();

import {
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  addAuthor,
} from '../controllers/authorController.js';

router.route('/').get(getAllAuthors).post(addAuthor);
router.route('/:id').delete(deleteAuthor).put(updateAuthor).get(getAuthor);

export default router;
