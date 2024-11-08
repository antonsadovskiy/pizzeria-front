import { useEffect, useMemo, useState } from 'react';
import { UserType } from '../../entities/api/user/types.ts';
import { User } from '../../entities/api/user';
import { AxiosError } from 'axios';
import { Button, message, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { DeleteOutlined } from '@ant-design/icons';

type TableUserType = {
  id: number;
  fullName: string;
  email: string;
  gender: 'Male' | 'Female';
  birthDate: string;
  role: string;
};

const columns = (
  handleDelete: (id: number) => void,
): TableProps<TableUserType>['columns'] => [
  {
    title: 'Full name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Birth date',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: (value) => <span>{dayjs(value).format('DD.MM.YYYY')}</span>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Button
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(record.id)}
      />
    ),
  },
];

export const UsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchData = async () => {
    try {
      const data = await User.adminGetAllUsers();
      setUsers(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await User.adminDeleteUser(Number(userId));
      message.success('User deleted successfully');
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

  const processedUsers = useMemo(() => {
    return users.map((item) => ({
      id: item.id,
      fullName: `${item.firstname} ${item.lastname}`,
      email: item.email,
      gender: item.gender,
      birthDate: item.birthDate,
      role: item.role.name,
    }));
  }, [users]);

  return (
    <div style={{ width: '100%' }}>
      <Table<TableUserType>
        style={{ width: '100%' }}
        columns={columns(handleDelete)}
        dataSource={processedUsers}
        rowKey="id"
      />
    </div>
  );
};
