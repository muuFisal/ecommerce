import React, { createContext, useContext, useState } from 'react';
import { Product } from '../data/products';

export type OrderMode = 'retail' | 'wholesale';

export interface CartItem {
  id: number;
  product: Product;
  mode: OrderMode;
  quantity: number; // retail: pieces, wholesale: series count
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    const role = localStorage.getItem('auth-user') ? JSON.parse(localStorage.getItem('auth-user')!).type : 'user';
    const mode: OrderMode =
      role === 'trader' && product.seriesConfig?.isSeriesProduct
        ? 'wholesale'
        : role === 'trader' && product.wholesalePrice
        ? 'wholesale'
        : 'retail';

    setCart((prevCart) => [
      ...prevCart,
      { id: Date.now(), product, mode, quantity, selectedSize, selectedColor },
    ]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      if (item.mode === 'wholesale' && item.product.seriesConfig?.isSeriesProduct) {
        return total + (item.product.seriesConfig.wholesalePricePerSeries! * item.quantity);
      } else if (item.mode === 'wholesale') {
        return total + (item.product.wholesalePrice! * item.quantity);
      } else {
        return total + ((item.product.flashSalePrice ?? item.product.price) * item.quantity);
      }
    }, 0);
  };

  const value: CartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    calculateTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return ctx;
}