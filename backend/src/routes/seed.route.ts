import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { sampleProducts, sampleUsers } from '../data/data';
import Product from '../models/product.model';
import User from '../models/user.model';

const router: Router = express.Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(sampleProducts);

    await User.deleteMany({});
    const createdUsers = await User.insertMany(sampleUsers);

    res.json({ createdProducts, createdUsers });
  })
);

export = router;
