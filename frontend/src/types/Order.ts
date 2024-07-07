import { CartItem, ShippingAddress } from './Cart';
import { UserType } from './User.type';

export type Order = {
  _id?: string;
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  user: UserType;
  //createdAt: string;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
