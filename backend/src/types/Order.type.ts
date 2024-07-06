import mongoose from 'mongoose';
import { UserType } from './User.type';
const { ObjectId } = mongoose.Schema;

type ShippingType = {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
};

type Item = {
  name: string;
  quantity: string;
  image: number;
  price: number;
  product: typeof ObjectId;
};

type Payment = {
  paymentId: string;
  status: string;
  updateTime: string;
  emailAddress: string;
};

export type OrderType = {
  orderItems: Item;
  shippingAddress: ShippingType;
  user: UserType;
  paymentMethod: string;
  payment: Payment;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
};
