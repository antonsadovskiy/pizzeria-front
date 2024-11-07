import { useEffect, useMemo, useState } from 'react';
import { CategoryType } from '../../entities/api/category/types.ts';
import styles from './styles.module.css';
import { App, Button, Input, Select } from 'antd';
import { Category } from '../../entities/api/category';
import { Product } from '../../entities/api/product';
import { useNavigate } from 'react-router-dom';

export const AddProductPage = () => {
  const { message } = App.useApp();

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
        const data = await Category.getAllCategories();
        setAllCategories(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const addProductHandler = async () => {
    try {
      if (!category || !price) return;

      setIsLoading(true);
      await Product.adminCreateProduct({ name, price, category, description });
      message.success('Product added');
      navigate(-1);
    } catch (e) {
      console.error(e);
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
        onClick={addProductHandler}
        disabled={isButtonDisabled}
        style={{ width: '100%' }}
        type={'primary'}
      >
        Add product
      </Button>
    </div>
  );
};
