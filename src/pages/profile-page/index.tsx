import { useAppStore } from '../../entities/store';
import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styles from './styles.module.css';
import { Button, DatePicker, Input, message, Select } from 'antd';
import { User } from '../../entities/api/user';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export const ProfilePage = () => {
  const navigate = useNavigate();

  const user = useAppStore((state) => state.userData);
  const setUserData = useAppStore((state) => state.setUserData);

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState<'Male' | 'Female' | undefined>(
    user?.gender,
  );
  const [birthDate, setBirthDate] = useState<Dayjs | undefined>(
    user?.birthDate ? dayjs(user?.birthDate) : undefined,
  );

  const updateHandler = async () => {
    if (user?.id && firstname && lastname && email && gender && birthDate) {
      try {
        await User.adminUpdateUser(user.id, {
          firstname,
          lastname,
          email,
          gender,
          birthDate: birthDate?.format('YYYY-MM-DD'),
          password: user.password,
        });
        message.success('Successfully updated');

        const data = await User.me();
        setUserData(data);

        navigate(-1);
      } catch (e) {
        if (e instanceof AxiosError) {
          message.error(e.message);
        }
      }
    }
  };

  const isButtonDisabled = useMemo(() => {
    return !firstname || !lastname || !email || !gender || !birthDate;
  }, [birthDate, email, firstname, gender, lastname]);

  return (
    <div className={styles.page}>
      <Input
        placeholder={'First name'}
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <Input
        placeholder={'Last name'}
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <Input
        placeholder={'Email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        type={'primary'}
        disabled={isButtonDisabled}
        onClick={updateHandler}
      >
        Update profile
      </Button>
    </div>
  );
};
