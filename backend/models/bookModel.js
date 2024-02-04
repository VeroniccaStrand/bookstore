import mongoose from 'mongoose';
import Product from './productModel.js';
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  {
    timestamps: true,
  }
);
//bookSchema.post('save', async function (doc, next) {
//try {
// Create a product with default values when a new book is saved
//await Product.create({
// author: doc.author,
//book: doc._id,
// quantity: 1,
// price: 0, // Set your default price here
// });

//  next();
// } catch (error) {
//   next(error);
// }
//});
const Book = mongoose.model('Book', bookSchema);
export default Book;
