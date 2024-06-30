export type CartItem = {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  countInStock: number;
  price: number;
  currency: string;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type Cart = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentMethod: string;
};
