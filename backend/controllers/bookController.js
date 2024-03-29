import Book from '../models/bookModel.js';
import Author from '../models/authorModel.js';
import Product from '../models/productModel.js';

// Add a book POST
export const addBook = async (req, res) => {
  try {
    const { title, desc, author } = req.body;

    // Check if the author exists
    const existingAuthor = await Author.findById(author);

    if (!existingAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const book = await Book.create({
      title,
      desc,
      author,
    });

    if (!book) {
      return res.status(500).json({ error: 'Failed to create Book' });
    }

    // Push the book's ID to the author's books array
    existingAuthor.books.push(book._id);
    await existingAuthor.save();

    return res.status(201).json({
      book,
    });
  } catch (error) {
    console.error('Error adding book:', error);

    // Log specific errors for better troubleshooting
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all books GET
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(200).json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get one Book GET
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error getting book:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an Book PUT
export const updateBook = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json(updatedBook);
  } catch (error) {
    console.error('Error updating Book:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// delete author DELETE
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const author = await Author.findById(book.author);
    const bookIndex = author.books.indexOf(book._id);

    if (bookIndex !== -1) {
      author.books.splice(bookIndex, 1);
    }
    await book.deleteOne();
    author.save();
    return res.status(200).json({ message: 'Deleted', id: req.params.id });
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
