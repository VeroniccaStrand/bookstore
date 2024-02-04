import mongoose from 'mongoose';
import authorSchema from './authorModel.js';
import bookSchema from './bookModel.js';

const productSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
