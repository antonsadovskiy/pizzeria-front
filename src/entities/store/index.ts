import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { createUserSlice, UserSliceType } from './userStore.ts';
import { CartLocalStorageManager } from '../local-storage';

export type AppStore = UserSliceType;

export const useAppStore = create<AppStore>()(
  subscribeWithSelector(
    devtools((...args) => ({
      ...createUserSlice(...args),
    })),
  ),
);

useAppStore.subscribe(
  (state) => state.cart, // отслеживаем только изменения в cart
  (cart) => {
    const userId = useAppStore.getState().userData?.id;
    CartLocalStorageManager.save(cart, userId);
  },
);
