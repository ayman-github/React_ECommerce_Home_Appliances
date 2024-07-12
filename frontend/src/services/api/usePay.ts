import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { Order } from '../../types/Order';

export const useGetPaypalKey = () => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryKey: ['PAYPAL-CLIENT-ID'],
    queryFn: async () => {
      const url = `api/pay/paypal/key`;
      const response = await apiClient.get<{ clientId: string }>(url);
      return response.data;
    },
  });
};

export const usePaypalPay = () => {
  return useMutation({
    mutationFn: async (details: { orderId: string }) => {
      const url = `api/pay/paypal/pay?orderId=${details.orderId}`;
      const response = await apiClient.put<{ message: string; order: Order }>(
        url,
        details
      );
      return response.data;
    },
  });
};
