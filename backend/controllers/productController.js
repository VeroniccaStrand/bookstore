import Book from '../models/bookModel.js';
import Author from '../models/authorModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const product = await Book.find().populate('author');

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error getting books:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
