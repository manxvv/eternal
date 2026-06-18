import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
export interface OrderItem {
  product: string; // ID string
  name: string;
  image: string; // Singular as per your JSON
  price: number;
  quantity: number;
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Order {
  _id: string;
  user: User; // Object, not string
  orderItems: OrderItem[];
  shippingAddress: {
    city: string;
    state: string;
  };
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  paymentResult?: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function useOrders() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return Array.isArray(data) ? data : (data.orders ?? []);
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2, // 2 min
  });
}


export function useMyOrders() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<Order[]>({
    queryKey: ["myorders"],
    queryFn: async () => {
      const { data } = await api.get("/orders/myorders");
      return Array.isArray(data) ? data : (data.orders ?? []);
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2, // 2 min
  });
}



// Single order by ID if needed
export function useOrder(orderId: string) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<Order>({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${orderId}`);
      return data;
    },
    enabled: isAuthenticated && !!orderId,
  });
}




export function useDeliverOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const { data } = await api.put(`/orders/${orderId}/deliver`);
      return data;
    },
    onSuccess: (data) => {
      // Invalidate the specific order query and the list of orders to refresh UI
      queryClient.invalidateQueries({ queryKey: ["orders", data._id] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order marked as dispatched");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Failed to update order";
      toast.error(msg);
    },
  });
}
