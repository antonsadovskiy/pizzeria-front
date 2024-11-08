import { useEffect, useState } from 'react';
import { Order } from '../../entities/api/order';
import { OrderType, StatusType } from '../../entities/api/order/types.ts';
import { AxiosError } from 'axios';
import { Button, message, Select, Table, TableColumnsType } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export type OrderItemType = {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productCategory: string;
  quantity: number;
};

const expandColumns: TableColumnsType<OrderItemType> = [
  { title: 'Product id', dataIndex: 'productId', key: 'productId' },
  { title: 'Product name', dataIndex: 'productName', key: 'productName' },
  {
    title: 'Product description',
    dataIndex: 'productDescription',
    key: 'productDescription',
  },
  {
    title: 'Product price',
    dataIndex: 'productPrice',
    key: 'productPrice',
  },
  {
    title: 'Product category',
    dataIndex: 'productCategory',
    key: 'productCategory',
  },
  {
    title: 'Product quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  /*{
    title: 'Action',
    key: 'operation',
    render: () => (
      <Space size="middle">
        <a>Pause</a>
        <a>Stop</a>
        <Dropdown menu={{ items }}>
          <a>
            More <DownOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },*/
];

const orderStatuses: { label: string; value: StatusType }[] = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const fetchData = async () => {
    try {
      const data = await Order.getAllOrders();

      setOrders(data.sort((a, b) => a.id - b.id));
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataSource = orders.map<OrderType>((order) => ({
    key: order.id,
    id: order.id,
    status: order.status,
    orderItems: order.orderItems,
  }));

  const expandedRowRender = (order: OrderType) => {
    const expandDataSource = order.orderItems.map<OrderItemType>((item) => ({
      key: item.id,
      productId: item.product.id,
      productName: item.product.name,
      productDescription: item.product.description,
      productCategory: item.product.category.name,
      productPrice: item.product.price,
      quantity: item.quantity,
    }));

    return (
      <Table<OrderItemType>
        columns={expandColumns}
        dataSource={expandDataSource}
        pagination={false}
      />
    );
  };

  const onChangeOrderStatus = async (id: number, status: StatusType) => {
    try {
      await Order.adminUpdateOrderStatus(id, status);

      message.success('Order status with id ' + id + ' updated');
      fetchData();
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        message.error(e?.response?.data.message);
      }
    }
  };

  const onDeleteHandler = async (id: number) => {
    try {
      await Order.adminDeleteOrder(id);
      message.success(`Order with id ${id} deleted successfully`);
      fetchData();
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    }
  };

  const columns: TableColumnsType<OrderType> = [
    { title: 'Order id', dataIndex: 'id', key: 'id' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value, record) => (
        <Select
          options={orderStatuses}
          onChange={(value) => onChangeOrderStatus(record.id, value)}
          value={value}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <Button
          onClick={() => onDeleteHandler(record.id)}
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Table<OrderType>
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={dataSource}
      />
    </div>
  );
};
