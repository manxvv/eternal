import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  weight?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  // Sync setters — called by react-query mutations/queries
  setCart: (items: CartItem[], totalPrice: number) => void;
  clearCartLocal: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalPrice: 0,

      setCart: (items, totalPrice) => set({ items, totalPrice }),
      clearCartLocal: () => set({ items: [], totalPrice: 0 }),
    }),
    {
      name: "eternal-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ── Shared mapper ──────────────────────────────────────────────
export function mapCartResponse(data: any): {
  items: CartItem[];
  totalPrice: number;
} {
  const items: CartItem[] = (data.items ?? []).map((i: any) => ({
    _id: i.product._id,
    name: i.product.name,
    price: i.price,
    images: i.product.images,
    category: i.product.category,
    quantity: i.quantity,
  }));
  return { items, totalPrice: data.totalPrice ?? 0 };
}

const SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING = 99;

// ── Selector hooks (subscribe to slice → re-render only when that slice changes)
export const useCartItems = () => useCartStore((s) => s.items);
export const useCartTotalPrice = () => useCartStore((s) => s.totalPrice);
export const useCartCount = () =>
  useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
export const useShippingFee = () =>
  useCartStore((s) => {
    const total = s.totalPrice;
    return total === 0 || total >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  });
export const useGrandTotal = () =>
  useCartStore((s) => {
    const total = s.totalPrice;
    const shipping =
      total === 0 || total >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    return total + shipping;
  });