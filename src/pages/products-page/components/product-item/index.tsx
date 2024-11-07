import { ProductType } from '../../../../entities/api/product/types.ts';

import styles from './styles.module.css';
import { Button, message, Typography } from 'antd';
import { useAppStore } from '../../../../entities/store';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/router/routes.ts';
import { Product } from '../../../../entities/api/product';
import { AxiosError } from 'axios';

export const ProductItem = ({
  id,
  name,
  price,
  category,
  description,
  refetchData,
}: ProductType & { refetchData: () => void }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);
  const isAdmin = useAppStore((state) => state.isAdmin);

  const isInCart = useMemo(() => {
    return cart.some((item) => item.product.id === id);
  }, [cart, id]);

  const addToCartHandler = () => {
    addToCart({
      product: { id, name, price, category, description },
      quantity: 1,
    });
  };

  const updateNavigate = () => navigate(`/products/update-product/${id}`);

  const goToCardHandler = () => navigate(routes.cart);

  const deleteProductHandler = async () => {
    try {
      setIsLoading(true);
      await Product.adminDeleteProduct(id);

      message.success('Product deleted');

      refetchData();
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className={styles.buttons}>
          {!isAdmin &&
            (isInCart ? (
              <Button onClick={goToCardHandler}>Go to cart</Button>
            ) : (
              <Button type={'primary'} onClick={addToCartHandler}>
                Order
              </Button>
            ))}
          {isAdmin && (
            <>
              <Button onClick={updateNavigate}>Update product data</Button>
              <Button
                loading={isLoading}
                onClick={deleteProductHandler}
                type={'primary'}
                danger
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
