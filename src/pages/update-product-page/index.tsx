import { useEffect, useMemo, useState } from 'react';
import { CategoryType } from '../../entities/api/category/types.ts';
import styles from './styles.module.css';
import { Button, Input, message, Select } from 'antd';
import { Category } from '../../entities/api/category';
import { Product } from '../../entities/api/product';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

export const UpdateProductPage = () => {
  const params = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | undefined>();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

  const setCategoryHandler = (
    option:
      | { label: string; value: number }
      | { label: string; value: number }[],
  ) => {
    if (!Array.isArray(option)) {
      const category = allCategories.find(
        (item) => item.id === Number(option.value),
      );
      if (category) {
        setCategory(category);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await Product.getProductById(Number(params.id));
        setName(productData.name);
        setCategory(productData.category);
        setDescription(productData.description);
        setPrice(productData.price);

        const data = await Category.getAllCategories();
        setAllCategories(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          message.error(e.message);
        }
      }
    };

    fetchData();
  }, []);

  const updateProductHandler = async () => {
    if (params.id && price && category) {
      try {
        setIsLoading(true);
        await Product.adminUpdateProduct(Number(params.id), {
          name,
          price,
          category,
          description,
        });
        message.success('Product added');
        navigate(-1);
      } catch (e) {
        if (e instanceof AxiosError) {
          message.error(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isButtonDisabled = useMemo(() => {
    return !name || !price || !category || !description;
  }, [name, price, category, description]);

  return (
    <div className={styles.page}>
      <Input
        placeholder={'Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder={'Description'}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder={'Price'}
        type={'number'}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <Select
        style={{ width: '100%' }}
        value={category?.id}
        options={allCategories.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
        onChange={(_, option) => setCategoryHandler(option)}
        placeholder="Category"
      />
      <Button
        loading={isLoading}
        onClick={updateProductHandler}
        disabled={isButtonDisabled}
        style={{ width: '100%' }}
        type={'primary'}
      >
        Update product
      </Button>
    </div>
  );
};
