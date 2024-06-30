import jwt from 'jsonwebtoken';
import { UserType } from '../types/User.type';

export const generateToken = (user: UserType) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};
