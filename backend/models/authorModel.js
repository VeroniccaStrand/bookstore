import mongoose from 'mongoose';
import Book from './bookModel.js';
import Product from './productModel.js';
const authorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    timestamps: true,
  }
);

authorSchema.pre('deleteOne', async function (next) {
  console.log('Pre-hook middleware is running.');
  try {
    const authorId = this.getQuery()._id;

    await Book.deleteMany({ author: authorId });

    await Product.deleteMany({ author: authorId });

    next();
  } catch (error) {
    console.error('Error during pre-remove hook:', error);
    next(error);
  }
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
