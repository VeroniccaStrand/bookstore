import Book from '../models/bookModel.js';
import Product from '../models/productModel.js';
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

// create new product POST

export const createProduct = async (req, res) => {
  try {
    const { author, book, quantity, price } = req.body;

    if (!author || !book || !quantity || !price) {
      return res.status(400).json({
        error:
          'Please provide all required fields: author, book, quantity, price.',
      });
    }

    const existingAuthor = await Author.findById(author);
    const existingBook = await Book.findById(book);

    if (!existingAuthor || !existingBook) {
      return res.status(404).json({
        error: 'Author or book not found. Please make sure they exist.',
      });
    }
    const existingProduct = await Product.findOne({
      author: existingAuthor._id,
      book: existingBook._id,
    });

    if (existingProduct) {
      return res.status(409).json({
        error: 'Product already exists for this author and book combination.',
      });
    }
    const newProduct = new Product({
      author: existingAuthor,
      book: existingBook,
      quantity,
      price,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
