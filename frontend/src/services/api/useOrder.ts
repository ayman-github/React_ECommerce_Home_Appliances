import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
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

export function useGetOrder(id: string) {
  return useQuery({
    enabled: true,
    _defaulted: true,
    placeholderData: keepPreviousData,
    queryKey: ['ORDER', id],
    queryFn: async () => {
      const url = `api/product/getOrder?orderId=${id}`;
      const response = await apiClient.get<Order>(url);
      return response.data;
    },
  });
}
