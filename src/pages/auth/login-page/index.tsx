import styles from '../styles.module.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import { useMemo, useState } from 'react';
import { Auth } from '../../../entities/api/auth';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../app/router/routes.ts';
import { User } from '../../../entities/api/user';
import { useAppStore } from '../../../entities/store';
import { AxiosError } from 'axios';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('antonsadovskiy6@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const setUserData = useAppStore((state) => state.setUserData);
  const setIsAdmin = useAppStore((state) => state.setIsAdmin);
  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);

  const loginHandler = async () => {
    try {
      setLoading(true);

      await Auth.login({
        email: login,
        password,
      });

      setIsLoggedIn(true);

      const data = await User.me();
      setUserData(data);

      const isAdmin = data.role.name === 'ADMIN';
      if (isAdmin) {
        setIsAdmin(true);
      }

      message.success('Successfully logged in');
      navigate(routes.products);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const redirectToRegister = () => navigate(routes.register);

  const isButtonDisabled = useMemo(() => {
    return !login || !password;
  }, [login, password]);

  return (
    <div className={styles.page}>
      <Input
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <Button
        disabled={isButtonDisabled}
        loading={loading}
        type={'primary'}
        onClick={loginHandler}
      >
        Login
      </Button>
      <div onClick={redirectToRegister} className={styles.link}>
        {"Don't have an account yet?"}
      </div>
    </div>
  );
};
