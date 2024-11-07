import { useEffect, useState } from 'react';
import styles from '../products-page/styles.module.css';
import { Order } from '../../entities/api/order';
import { OrderType } from '../../entities/api/order/types.ts';
import { OrderItem } from './components/order-item';

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const fetchData = async () => {
    try {
      const data = await Order.getAllOrders();

      setOrders(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.list}>
        {orders.map((item, index) => (
          <OrderItem key={index} {...item} refetchData={fetchData} />
        ))}
      </div>
    </div>
  );
};
