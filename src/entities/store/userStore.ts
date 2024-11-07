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
  editOrderItemQuantity: (id: number, quantity: number) => void;
};

export type UserSliceType = StateType & ActionsType;

export const createUserSlice: StateCreator<
  AppStore,
  [['zustand/devtools', never]],
  [],
  UserSliceType
> = (set) => ({
  isLoggedIn: false,
  isAdmin: true,
  userData: undefined,
  cart: [],
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
  setUserData: (userData) => set(() => ({ userData })),
  addToCart: (orderItem) =>
    set((state) => ({ cart: [...state.cart, orderItem] })),
  editOrderItemQuantity: (id, quantity) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item.product.id === id);
      if (index !== -1) {
        state.cart[index].quantity = quantity;
      }
      return state;
    }),
  setCart: (cart) => set(() => ({ cart })),
});
