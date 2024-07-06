import mongoose, { Document, Schema } from 'mongoose';
import { OrderType } from '../types/Order.type';
const { ObjectId } = mongoose.Schema;

export interface IOrderModel extends OrderType, Document {}

const shippingSchema: Schema = new Schema({
  fullName: { type: String },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});

const itemSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  image: { type: Number, required: true },
  price: { type: Number, required: true },
  product: { type: ObjectId, ref: 'Product' },
});

const paymentSchema: Schema = new Schema({
  paymentId: { type: String },
  status: { type: String },
  update_time: { type: String },
  email_address: { type: String },
});

const orderSchema: Schema = new Schema(
  {
    orderItems: [itemSchema],
    shippingAddress: [shippingSchema],
    user: { type: ObjectId, ref: 'User' },
    paymentMethod: { type: String, required: true },
    payment: paymentSchema,
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IOrderModel>('Order', orderSchema);
