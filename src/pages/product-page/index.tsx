import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../entities/api/product';
import { ProductType } from '../../entities/api/product/types.ts';
import { Typography } from 'antd';

export const ProductPage = () => {
  const params = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductType | undefined>();

  useEffect(() => {
    if (params.id) {
      const fetchData = async () => {
        try {
          const data = await Product.getProductById(Number(params.id));
          setProduct(data);
        } catch (e) {
          console.error(e);
        }
      };

      fetchData();
    }
  }, [params.id]);

  return (
    <div>
      <div>
        <Typography.Title level={3}>
          Name: {product?.name ?? ''}
        </Typography.Title>
      </div>
      <div>
        <Typography.Title level={3}>
          Price: {product?.price ?? '1000000'}$
        </Typography.Title>
      </div>
    </div>
  );
};
