import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post('/users/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      // 1. Set Cookies for Middleware
      Cookies.set("is-admin", String(data.isAdmin), { expires: 7, path: '/' });
      Cookies.set("auth-token", data.token, { expires: 7, path: '/' });
      Cookies.set("user_data", JSON.stringify(data), { expires: 7, path: '/' });
      
      // 2. Set Zustand State
      setUser(data);

      // 3. Navigate based on isAdmin key
      if (data.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/tea');
      }
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await api.post('/users/register', userData, {
        headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "" }
      });
      return data;
    },
    onSuccess: (data) => {
      Cookies.set("is-admin", String(data.isAdmin), { expires: 7, path: '/' });
      Cookies.set("auth-token", data.token, { expires: 7, path: '/' });
      Cookies.set("user_data", JSON.stringify(data), { expires: 7, path: '/' });
      
      setUser(data);
      router.push('/tea');
    },
  });
};