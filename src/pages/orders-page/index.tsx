import { useEffect, useState } from 'react';
import styles from '../products-page/styles.module.css';
import { Order } from '../../entities/api/order';
import { OrderType } from '../../entities/api/order/types.ts';
import { OrderItem } from './components/order-item';
import { AxiosError } from 'axios';
import { message } from 'antd';

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const fetchData = async () => {
    try {
      const data = await Order.getAllOrders();

      setOrders(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
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
