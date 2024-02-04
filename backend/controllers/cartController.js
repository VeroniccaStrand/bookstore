import Book from '../models/bookModel.js';
import Product from '../models/productModel.js';
import Author from '../models/authorModel.js';
import Cart from '../models/cartModel.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Kontrollera om det finns en giltig produkt-ID och kvantitet i begäran
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Hämta varukorgen för den inloggade användaren
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      'items.product'
    );

    // Om varukorgen inte finns, skapa en ny
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    // Kontrollera om produkten redan finns i varukorgen
    const existingItem = cart.items.find(
      (item) => item.product && item.product._id.toString() === productId
    );

    if (existingItem) {
      // Om produkten redan finns, öka bara antalet
      existingItem.quantity += quantity;
    } else {
      // Annars lägg till en ny post i varukorgen
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      cart.items.push({
        product: product._id,
        quantity: quantity,
      });
    }

    // Beräkna den totala priset för varukorgen (för din användning)
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    // Uppdatera det totala priset i varukorgen (för din användning)
    cart.totalPrice = totalPrice;

    // Spara varukorgen till databasen
    await cart.save();

    return res
      .status(201)
      .json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
// get cart
