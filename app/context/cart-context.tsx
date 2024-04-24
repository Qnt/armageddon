'use client';

import { ReactNode, createContext, useReducer } from 'react';
import { NearEarthObjectDated } from '../lib/types';

type Cart = NearEarthObjectDated[];

const initValues: Cart = [];

type CartAction = {
  type: 'ADD' | 'DELETE' | 'RESET';
  nearEarthObject?: NearEarthObjectDated;
  nearEarthObjectId?: string;
};

export const CartContext = createContext<Cart>(initValues);
export const CartDispatchContext =
  createContext<React.Dispatch<CartAction> | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initValues);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

const cartReducer = (cart: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD': {
      if (action.nearEarthObject) {
        return [...cart, action.nearEarthObject];
      }
    }
    case 'DELETE': {
      if (action.nearEarthObjectId) {
        return cart.filter(
          item => Number(item.id) !== Number(action.nearEarthObjectId)
        );
      }
    }
    case 'RESET': {
      return initValues;
    }
    default:
      return cart;
  }
};
