import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';

export const intoCart = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    countInStock: product.stockCount,
    quantity: 1,
    currency: product.currency,
  };
  return cartItem;
};
