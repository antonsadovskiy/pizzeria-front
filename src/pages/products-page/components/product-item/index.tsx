import { ProductType } from '../../../../entities/api/product/types.ts';

import styles from './styles.module.css';
import { Button, Typography } from 'antd';
import { useAppStore } from '../../../../entities/store';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/router/routes.ts';

export const ProductItem = ({
  id,
  name,
  price,
  category,
  description,
}: ProductType) => {
  const navigate = useNavigate();

  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);

  const isInCart = useMemo(() => {
    return cart.some((item) => item.product.id === id);
  }, [cart, id]);

  const addToCartHandler = () => {
    addToCart({
      product: { id, name, price, category, description },
      quantity: 1,
    });
  };

  const goToCardHandler = () => navigate(routes.categories);

  return (
    <div className={styles.product}>
      <div className={styles.description}>
        <Typography.Text>{description}</Typography.Text>
      </div>
      <div className={styles.priceAndCategory}>
        <Typography.Text strong>Category: {category.name}</Typography.Text>
        <div className={styles.price}>
          <Typography.Title style={{ margin: '10px 0' }} level={3}>
            {name}
          </Typography.Title>
          <Typography.Title style={{ margin: '10px 0' }} level={3}>
            {price}$
          </Typography.Title>
        </div>
        {isInCart ? (
          <Button onClick={goToCardHandler}>Go to cart</Button>
        ) : (
          <Button type={'primary'} onClick={addToCartHandler}>
            Order
          </Button>
        )}
      </div>
    </div>
  );
};
