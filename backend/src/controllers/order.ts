import { Response, Request } from 'express';
import { getErrorMessage } from '../utils/Error.util';
import OrderModel from '../models/order.model';
import { ProductType } from '../types/Product.type';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems.length === 0) {
      return res.status(400).send({ message: 'Cart is empty' });
    }

    const newOrder = await new OrderModel({
      orderItems: orderItems.map((product: ProductType) => ({
        ...product,
        product: product._id,
      })),
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      user: userId,
    }).save();

    res.status(201).send({
      message: 'Order Created',
      order: newOrder,
    });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.query;

    const order = await OrderModel.findOne({ _id: orderId });

    res.status(201).send(order);
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};
