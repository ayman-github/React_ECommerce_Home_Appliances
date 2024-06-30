import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import { getErrorMessage } from '../utils/Error.util';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.send(products);
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      image,
      category,
      brand,
      price,
      currency,
      stockCount,
      descriptions,
      rating,
      reviews,
    } = req.body;

    const product = await new ProductModel({
      name: name,
      image: image,
      category: category,
      brand: brand,
      price: price,
      currency: currency,
      stockCount: stockCount,
      descriptions: descriptions,
      rating: rating,
      reviews: reviews,
    }).save();

    res.send({
      data: product,
    });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.query.productId;
    //console.log('productId:' + productId);

    const product = await ProductModel.findOne({ _id: productId });
    res.send(product);
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};
