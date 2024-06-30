import mongoose, { Document, Schema } from 'mongoose';
import { UserType } from '../types/User.type';
//const { ObjectId } = mongoose.Schema;

export interface IUserModel extends UserType, Document {}

const userSchema: Schema = new Schema(
  {
    //_id: { type: String },
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
    token: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>('User', userSchema);
