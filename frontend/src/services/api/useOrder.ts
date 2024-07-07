import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';
import { Order } from '../../types/Order';

export function useCreateOrder() {
  return useMutation({
    mutationFn: async ({ order }: { order: Order }) => {
      const url = 'api/product/placeOrder';
      const response = await apiClient.post<{ message: string; order: Order }>(
        url,
        {
          userId: order.user._id,
          orderItems: order.orderItems,
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
          itemsPrice: order.itemsPrice,
          shippingPrice: order.shippingPrice,
          taxPrice: order.taxPrice,
          totalPrice: order.totalPrice,
        }
      );
      return response.data;
    },
  });
}
