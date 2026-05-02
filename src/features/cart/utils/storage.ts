import { CART_ITEMS_STORAGE_KEY } from '../constants/storage';
import type { CartItem } from '../types';

export const loadCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const rawCartItems = window.localStorage.getItem(CART_ITEMS_STORAGE_KEY);

  if (!rawCartItems) {
    return [];
  }

  try {
    const parsedCartItems = JSON.parse(rawCartItems) as CartItem[];
    return Array.isArray(parsedCartItems) ? parsedCartItems : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (cartItems: CartItem[]): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
};
