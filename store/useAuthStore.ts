import { create } from 'zustand';
import Cookies from 'js-cookie';
import { useCartStore } from './useCartStore';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean; // 1. Add this to the interface
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Helper to get initial user safely
const getInitialUser = (): User | null => {
  const userData = Cookies.get('user_data');
  if (!userData) return null;
  try {
    return JSON.parse(userData);
  } catch (error) {
    return null;
  }
};

const initialUser = getInitialUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser, // 2. Initialize based on cookie presence

  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user // 3. Update boolean when user is set
  }),

  logout: () => {
    Cookies.remove("is-admin");
    Cookies.remove("auth-token");
    Cookies.remove("user_data");
    set({ user: null, isAuthenticated: false }); // 4. Reset both
    useCartStore.getState().clearCartLocal();

    window.location.href = "/login";
  },
}));