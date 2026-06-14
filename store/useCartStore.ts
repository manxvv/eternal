import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the shape of a product in the cart
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  weight?: string; // e.g., "250g" or "15 Bags"
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Derived Calculations (Getters)
  getTotalPrice: () => number;
  getCartCount: () => number;
  getShippingFee: () => number;
  getGrandTotal: () => number;
}

const SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING = 99; // Adjust as per brand strategy

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item._id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      // Calculations
      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getShippingFee: () => {
        const total = get().getTotalPrice();
        if (total === 0 || total >= SHIPPING_THRESHOLD) return 0;
        return STANDARD_SHIPPING;
      },

      getGrandTotal: () => {
        return get().getTotalPrice() + get().getShippingFee();
      },
    }),
    {
      name: "eternal-cart-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);