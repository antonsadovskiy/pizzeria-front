import { useEffect, useState } from 'react';
import { ProductType } from '../../entities/api/product/types.ts';
import { Product } from '../../entities/api/product';
import styles from './styles.module.css';
import { ProductItem } from './components/product-item';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../app/router/routes.ts';
import { AxiosError } from 'axios';
import { useAppStore } from '../../entities/store';

export const ProductsPage = () => {
  const navigate = useNavigate();

  const isAdmin = useAppStore((state) => state.isAdmin);

  const [products, setProducts] = useState<ProductType[]>([]);

  const addProductHandler = () => navigate(routes.addProduct);

  const fetchData = async () => {
    try {
      const data = await Product.getAllProducts();

      setProducts(data);
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
        {products.map((item, index) => (
          <ProductItem key={index} {...item} refetchData={fetchData} />
        ))}
      </div>
      {isAdmin && (
        <div className={styles.addProduct}>
          <Button onClick={addProductHandler}>Add product</Button>
        </div>
      )}
    </div>
  );
};
