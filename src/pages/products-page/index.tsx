import { useEffect, useState } from 'react';
import { ProductType } from '../../entities/api/product/types.ts';
import { Product } from '../../entities/api/product';
import styles from './styles.module.css';
import { ProductItem } from './components/product-item';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../app/router/routes.ts';

export const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductType[]>([]);

  const addProductHandler = () => navigate(routes.addProduct);

  const fetchData = async () => {
    try {
      const data = await Product.getAllProducts();

      setProducts(data);
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
        {products.map((item, index) => (
          <ProductItem key={index} {...item} refetchData={fetchData} />
        ))}
      </div>
      <div className={styles.addProduct}>
        <Button onClick={addProductHandler}>Add product</Button>
      </div>
    </div>
  );
};
