import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, UserSliceType } from './userStore.ts';
import { CartLocalStorageManager } from '../local-storage';

export type AppStore = UserSliceType;

export const useAppStore = create<AppStore>()(
  devtools((...args) => ({
    ...createUserSlice(...args),
  })),
);

useAppStore.subscribe((state) => {
  CartLocalStorageManager.save(state.cart, state.userData?.id);
});
