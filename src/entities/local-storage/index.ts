import { OrderItemType } from '../store/userStore.ts';

export class CartLocalStorageManager {
  public static key = 'cart';

  public static save(data: OrderItemType[], userId?: number) {
    if (userId) {
      let dataFromCartLS = CartLocalStorageManager.get() || [];

      const userCart = dataFromCartLS.find((item) => item.userId === userId);
      if (userCart) {
        userCart.data = data;
      } else {
        dataFromCartLS.push({ userId, data });
      }

      localStorage.setItem(
        CartLocalStorageManager.key,
        JSON.stringify(dataFromCartLS),
      );
    }
  }

  public static get() {
    const data = localStorage.getItem(CartLocalStorageManager.key);
    if (data) {
      return JSON.parse(data) as {
        userId: number;
        data: OrderItemType[];
      }[];
    }
    return [];
  }
}
