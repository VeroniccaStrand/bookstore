import Book from '../models/bookModel.js';
import Product from '../models/productModel.js';
import Author from '../models/authorModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({ message: 'no products in store' });
    }
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const author = await Author.findById(product.author);
        const book = await Book.findById(product.book);

        return {
          productId: product.id,
          name: author.name,
          title: book.title,
          desc: book.desc,
          quantity: product.quantity,
          price: product.price,
        };
      })
    );

    return res.status(200).json(productsWithDetails);
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

// get products from author

export const getProdFromAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    const author = await Author.findById(authorId);

    if (!author) {
      return res
        .status(404)
        .json({ message: 'No books from this author found' });
    }

    const products = await Product.find({ author: authorId });

    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const author = await Author.findById(product.author);
        const book = await Book.findById(product.book);

        return {
          name: author.name,
          title: book.title,
          desc: book.desc,
          quantity: product.quantity,
          price: product.price,
        };
      })
    );

    return res.status(200).json(productsWithDetails);
  } catch (error) {
    console.error('Error getting products from author:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
