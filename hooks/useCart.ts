import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useCartStore, mapCartResponse } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

export const CART_KEY = ["cart"];

// ── GET /api/cart ──────────────────────────────────────────────
export function useCart() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setCart = useCartStore((s) => s.setCart);

  return useQuery({
    queryKey: CART_KEY,
    queryFn: async () => {
      const { data } = await api.get("/cart");
      const mapped = mapCartResponse(data);
      setCart(mapped.items, mapped.totalPrice); // keep Zustand in sync
      return mapped;
    },
    enabled: isAuthenticated, // don't fetch when logged out
    staleTime: 1000 * 30,     // 30s before re-fetching in background
  });
}

// ── POST /api/cart ─────────────────────────────────────────────
export function useAddToCart() {
  const qc = useQueryClient();
  const setCart = useCartStore((s) => s.setCart);

  return useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.post("/cart", { productId, quantity: 1 });
      return mapCartResponse(data);
    },
    onSuccess: (mapped) => {
      setCart(mapped.items, mapped.totalPrice);
      qc.invalidateQueries({ queryKey: CART_KEY });
    },
    onError:(AxiosError:any) => {

            const errorMessage = AxiosError.response?.data?.message || AxiosError.message || "An error occurred";

      console.log("osdwer",errorMessage);
      
            toast.error(errorMessage)

    } 
  });
}

// ── PUT /api/cart/:productId ───────────────────────────────────
export function useUpdateQuantity() {
  const qc = useQueryClient();
  const setCart = useCartStore((s) => s.setCart);

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      return mapCartResponse(data);
    },
    onSuccess: (mapped) => {
      setCart(mapped.items, mapped.totalPrice);
      qc.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}

// ── DELETE /api/cart/:productId ────────────────────────────────
export function useRemoveFromCart() {
  const qc = useQueryClient();
  const setCart = useCartStore((s) => s.setCart);

  return useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.delete(`/cart/${productId}`);
      return mapCartResponse(data);
    },
    onSuccess: (mapped) => {
      setCart(mapped.items, mapped.totalPrice);
      qc.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}

// ── DELETE /api/cart ───────────────────────────────────────────
export function useClearCart() {
  const qc = useQueryClient();
  const clearCartLocal = useCartStore((s) => s.clearCartLocal);

  return useMutation({
    mutationFn: async () => {
      await api.delete("/cart");
    },
    onSuccess: () => {
      clearCartLocal();
      qc.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}