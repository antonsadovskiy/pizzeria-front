import { CategoryType } from '../../entities/api/category/types.ts';
import { useEffect, useState } from 'react';
import { Category } from '../../entities/api/category';
import styles from './styles.module.css';
import { Button, Input, List, message } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { AxiosError } from 'axios';

export const CategoriesPage = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [isAddNewCategoryMode, setIsAddNewCategoryMode] = useState(false);

  const fetchData = async () => {
    try {
      const data = await Category.getAllCategories();
      setCategories(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    }
  };

  const addCategoryHandler = async () => {
    try {
      await Category.createCategory({ name });
      fetchData();
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
      <List
        style={{ width: '500px' }}
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(item, index) => (
          <CategoryItem key={index} {...item} refetchData={fetchData} />
        )}
      />
      {isAddNewCategoryMode && (
        <div className={styles.tempNewCategory}>
          <Input
            autoFocus
            placeholder={'New category name'}
            style={{ width: '100%' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            className={styles.button}
            onClick={addCategoryHandler}
            disabled={!name}
            type={'primary'}
            icon={<PlusOutlined />}
          />
          <Button
            className={styles.button}
            onClick={() => {
              setIsAddNewCategoryMode(false);
              setName('');
            }}
            icon={<CloseOutlined />}
          />
        </div>
      )}
      <div className={styles.addCategory}>
        <Button onClick={() => setIsAddNewCategoryMode(true)}>
          Add category
        </Button>
      </div>
    </div>
  );
};

const CategoryItem = ({
  id,
  name,
  refetchData,
}: CategoryType & { refetchData: () => void }) => {
  const [editMode, setEditMode] = useState(false);

  // const [oldName, setOldName] = useState(name);
  const [newName, setNewName] = useState(name);

  const onEditModeOn = () => setEditMode(true);

  const onSaveHandler = async () => {
    if (name !== newName) {
      try {
        await Category.updateCategory(id, { name: newName });
        refetchData();
      } catch (e) {
        if (e instanceof AxiosError) {
          message.error(e.message);
        }
        setNewName(name);
      }
    }
    setEditMode(false);
  };

  const onDeleteHandler = async () => {
    try {
      await Category.deleteCategory(id);
      refetchData();
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    }
  };

  return (
    <List.Item key={id} className={styles.item}>
      {editMode ? (
        <Input
          autoFocus
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      ) : (
        <div>{name}</div>
      )}
      <div className={styles.buttons}>
        {editMode ? (
          <Button onClick={onSaveHandler} icon={<CheckOutlined />} />
        ) : (
          <Button onClick={onEditModeOn} icon={<EditOutlined />} />
        )}
        <Button onClick={onDeleteHandler} danger icon={<DeleteOutlined />} />
      </div>
    </List.Item>
  );
};
