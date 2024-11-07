import { StateCreator } from 'zustand/index';
import { UserType } from '../api/user/types.ts';
import { AppStore } from './index.ts';

export type OrderItemType = {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    category: {
      name: string;
    };
  };
  quantity: number;
};

type StateType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userData?: UserType;
  cart: OrderItemType[];
};

type ActionsType = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserData: (userData: UserType) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setCart: (cart: OrderItemType[]) => void;
  addToCart: (orderItem: OrderItemType) => void;
  removeFromCart: (id: number) => void;
  decreaseOrderItemQuantity: (id: number) => void;
  increaseOrderItemQuantity: (id: number) => void;
};

export type UserSliceType = StateType & ActionsType;

export const createUserSlice: StateCreator<
  AppStore,
  [['zustand/devtools', never]],
  [],
  UserSliceType
> = (set) => ({
  isLoggedIn: false,
  isAdmin: false,
  userData: undefined,
  cart: [],
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
  setUserData: (userData) => set(() => ({ userData })),
  addToCart: (orderItem) =>
    set((state) => ({ cart: [...state.cart, orderItem] })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== id),
    })),
  increaseOrderItemQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    })),
  decreaseOrderItemQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    })),
  setCart: (cart) => set(() => ({ cart })),
});
