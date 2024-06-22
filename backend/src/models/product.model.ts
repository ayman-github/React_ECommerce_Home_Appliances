import mongoose, { Document, Schema } from 'mongoose';
import { Product } from '../types/Product';
//const { ObjectId } = mongoose.Schema;

export interface IProductModel extends Product, Document {}

const productSchema: Schema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    category: { type: String },
    brand: { type: String },
    price: { type: Number },
    currency: { type: String },
    stockCount: { type: Number },
    descriptions: { type: String },
    rating: { type: Number },
    reviews: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IProductModel>('Product', productSchema);
