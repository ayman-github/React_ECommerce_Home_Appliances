import { useQuery, keepPreviousData } from '@tanstack/react-query';
import apiClient from './apiClient';
import { Product } from '../../types/Product';

export function useProducts() {
  return useQuery({
    enabled: true,
    _defaulted: true,
    placeholderData: keepPreviousData,
    queryKey: ['PRODUCTS'],
    queryFn: async () => {
      const url = 'api/products';
      const response = await apiClient.get<Product[]>(url);
      return response.data;
    },
  });
}
