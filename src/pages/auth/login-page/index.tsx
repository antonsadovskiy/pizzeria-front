import styles from '../styles.module.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useMemo, useState } from 'react';
import { Auth } from '../../../entities/api/auth';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../app/router/routes.ts';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    try {
      setLoading(true);
      const data = await Auth.login({
        email: login,
        password,
      });

      console.log(data.access_token);
    } catch (e) {
      console.error(e);
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
