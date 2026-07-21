import { create } from 'zustand';
import { Product } from '../data/mockProducts';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (product) => set((state) => {
    const existing = state.items.find(item => item.id === product.id);
    if (existing) {
      return {
        items: state.items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isOpen: true,
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id),
  })),
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));
