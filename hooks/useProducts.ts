import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product removed from Atelier');
    },
  });

  return { productsQuery, deleteMutation };
};



export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  countInStock: number;
}

/**
 * Common hook to fetch products
 * @param category - Optional category string (e.g., 'tea', 'coffee')
 */

export function useProductsUser(category?: string) {
  return useQuery<Product[]>({
    // The queryKey changes when category changes, triggering a refetch
    queryKey: ["products", category || "all"],
    queryFn: async () => {
      // Construct URL: if category exists, add as param, else just /products
      const url = category 
        ? `/products?category=${category}` 
        : "/products";

      const { data } = await api.get(url);

      // Handle the API response mapping logic centrally
      return Array.isArray(data) ? data : (data.products ?? []);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}