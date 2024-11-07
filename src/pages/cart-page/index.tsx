import { useAppStore } from '../../entities/store';
import { Button, List, message, Typography } from 'antd';
import styles from './styles.module.css';
import { Order } from '../../entities/api/order';
import { AxiosError } from 'axios';

export const CartPage = () => {
  const cart = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const increase = useAppStore((state) => state.increaseOrderItemQuantity);
  const decrease = useAppStore((state) => state.decreaseOrderItemQuantity);
  const setCard = useAppStore((state) => state.setCart);

  const increaseProductAmount = (id: number) => increase(id);
  const decreaseProductAmount = (id: number) => decrease(id);

  const removeFromCartHandler = (id: number) => removeFromCart(id);

  const onOrderClick = async () => {
    try {
      await Order.createOrder({ orderItems: cart });
      message.success('Order created');
      setCard([]);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    }
  };

  return (
    <div className={styles.page}>
      <List>
        {cart.map((item) => (
          <List.Item key={item.product.id} className={styles.item}>
            <div className={styles.name}>
              <Typography.Title style={{ margin: '10px 0' }} level={5}>
                {item.product.name}
              </Typography.Title>
              <Typography.Title style={{ margin: '10px 0' }} level={5}>
                {item.quantity} x {item.product.price}$
              </Typography.Title>
            </div>
            <div className={styles.description}>
              {item.product.description}
              <div className={styles.buttons}>
                <div className={styles.amountButtons}>
                  <Button
                    onClick={() => decreaseProductAmount(item.product.id)}
                    className={styles.button}
                  >
                    -
                  </Button>
                  <Typography.Text className={styles.amount}>
                    {item.quantity}
                  </Typography.Text>
                  <Button
                    onClick={() => increaseProductAmount(item.product.id)}
                    className={styles.button}
                  >
                    +
                  </Button>
                </div>
                <Button onClick={() => removeFromCartHandler(item.product.id)}>
                  Remove from cart
                </Button>
              </div>
            </div>
          </List.Item>
        ))}
      </List>
      <div className={styles.orderContainer}>
        <Button disabled={cart.length === 0} onClick={onOrderClick}>
          Order
        </Button>
      </div>
    </div>
  );
};
