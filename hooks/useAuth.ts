import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore, mapCartResponse } from "@/store/useCartStore";
import { CART_KEY } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const setCart = useCartStore((s) => s.setCart);
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post("/users/login", credentials);
      return data;
    },
    onSuccess: async (data) => {
      Cookies.set("is-admin", String(data.isAdmin), { expires: 7, path: "/" });
      Cookies.set("auth-token", data.token, { expires: 7, path: "/" });
      Cookies.set("user_data", JSON.stringify(data), { expires: 7, path: "/" });
      setUser(data);

      // Fetch cart immediately after login
      const cartRes = await api.get("/cart");
      const mapped = mapCartResponse(cartRes.data);
      setCart(mapped.items, mapped.totalPrice);
      qc.setQueryData(CART_KEY, mapped);

      router.push(data.isAdmin ? "/admin" : "/tea");
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((s) => s.setUser);
  // const setCart = useCartStore((s) => s.setCart);
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await api.post("/users/register", userData, {
        headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "" },
      });
      return data;
    },
    onSuccess: async (data) => {
      Cookies.set("is-admin", String(data.isAdmin), { expires: 7, path: "/" });
      Cookies.set("auth-token", data.token, { expires: 7, path: "/" });
      Cookies.set("user_data", JSON.stringify(data), { expires: 7, path: "/" });
      setUser(data);

      // const cartRes = await api.get("/cart");
      // const mapped = mapCartResponse(cartRes.data);
      // setCart(mapped.items, mapped.totalPrice);
      // qc.setQueryData(CART_KEY, mapped);

      router.push("/login");
    },
  });
};