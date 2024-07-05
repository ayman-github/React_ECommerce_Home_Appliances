import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { getErrorMessage } from '../utils/Error.util';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.util';

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const isUser = await UserModel.findOne({ email: email });

  if (isUser) {
    return res.status(400).json({ message: 'user is a ready exist' });
  }

  try {
    const user = await new UserModel({
      fullName: fullName,
      email: email,
      password: bcrypt.hashSync(password, 12),
    }).save();

    res.send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message:
          'the email address you entered is not connected to an account.',
      });
    }

    const isPassword: boolean = bcrypt.compareSync(password, user?.password);

    if (!isPassword) {
      return res.status(400).json({
        message: 'Invalid credentials. Please try again.',
      });
    }

    res.send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};
