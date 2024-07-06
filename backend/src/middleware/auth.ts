import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

//* need to upgrade next FB.Bearer

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || 'SecretOfSecretOfSecretOf'
    );

    decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };

    next();
  } else {
    res.status(401).json({ message: 'No Token' });
  }
};
