import styles from '../styles.module.css';
import { Button, DatePicker, Input, message, Select } from 'antd';
import { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { Auth } from '../../../entities/api/auth';
import { routes } from '../../../app/router/routes.ts';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../entities/api/user';
import { useAppStore } from '../../../entities/store';
import { AxiosError } from 'axios';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | undefined>();
  const [birthDate, setBirthDate] = useState<Dayjs | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const setUserData = useAppStore((state) => state.setUserData);
  const setIsAdmin = useAppStore((state) => state.setIsAdmin);
  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);

  const registerHandler = async () => {
    if (!gender || !birthDate) return;
    try {
      setIsLoading(true);
      await Auth.register({
        email,
        gender,
        birthDate: birthDate.format('YYYY-MM-DD'),
        firstname,
        lastname,
        password,
      });
      setIsLoggedIn(true);

      const data = await User.me();
      setUserData(data);

      const isAdmin = data.role.name === 'ADMIN';
      if (isAdmin) {
        setIsAdmin(true);
      }

      message.success('Successfully registered');
      navigate(routes.products);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = () => navigate(routes.login);

  const isButtonDisabled = useMemo(() => {
    return (
      !firstname || !lastname || !email || !password || !gender || !birthDate
    );
  }, [firstname, lastname, email, password, gender, birthDate]);

  return (
    <div className={styles.page}>
      <Input
        placeholder="First name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <Input
        placeholder="Last name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Select
        value={gender}
        options={[
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
        ]}
        onChange={(value) => setGender(value)}
        placeholder="Gender"
      />
      <DatePicker
        value={birthDate}
        placeholder={'Birth date'}
        format={dateFormatList}
        onChange={(value) => {
          setBirthDate(value);
        }}
      />
      <Button
        disabled={isButtonDisabled}
        loading={isLoading}
        onClick={registerHandler}
        type={'primary'}
      >
        Register
      </Button>
      <div onClick={redirectToLogin} className={styles.link}>
        Already have an account?
      </div>
    </div>
  );
};
