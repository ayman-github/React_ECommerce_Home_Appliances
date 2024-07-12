import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/Error.util';
import orderModel from '../models/order.model';

export const paypalKey = async (req: Request, res: Response) => {
  try {
    const key = process.env.PAYPAL_CLIENT_ID || 'sb';

    res.send({ clientId: key });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const paypalPay = async (req: Request, res: Response) => {
  try {
    const { status, email_address } = req.body;
    const { orderId } = req.query;

    console.log('orderId: ' + orderId);
    console.log('email_address: ' + email_address);
    console.log('status: ' + status);

    const order = await orderModel.findById({ _id: orderId }).populate('user');

    if (!order) {
      return res.status(404).send({ message: 'Order Not Found' });
    }

    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    order.payment = {
      paymentId: orderId?.toString() || '',
      status: status,
      email: email_address,
    };
    const updatedOrder = await order.save();

    res.send({
      order: updatedOrder,
      message: 'Paid successfully',
    });
  } catch (error: unknown) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};
