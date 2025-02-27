import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { TbPhotoCog } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React from 'react';
import { useForm } from '@mantine/form';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
// import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import {
  changePasswordThunk,
  // changePhotoThunk,
  changeUsernameThunk,
} from '@/entities/user/api';

interface PassForm {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}

interface UsernameForm {
  newUsername: string;
}

export function ProfilePage(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const passForm = useForm<PassForm>({
    mode: 'controlled',
    initialValues: {
      oldPass: '',
      newPass: '',
      confirmPass: '',
    },
  });
  const usernameForm = useForm<UsernameForm>({
    mode: 'controlled',
    initialValues: {
      newUsername: '',
    },
  });

  const changeUsernameHandler = async () => {
    const newUsername = usernameForm.values.newUsername.trim();
    console.log(newUsername);
    if (!newUsername) return;

    try {
      await dispatch(changeUsernameThunk({ newUsername })).unwrap();
      usernameForm.reset();
    } catch (error) {
      console.error('Ошибка при изменении имени:', error);
    }
  };
  const changePasswordHandler = async () => {
    const { oldPass, newPass, confirmPass } = passForm.values;
    console.log(oldPass, newPass, confirmPass);

    if (newPass !== confirmPass) {
      console.error('Пароли не совпадают');
      return;
    }

    try {
      await dispatch(changePasswordThunk({ oldPass, newPass })).unwrap();
      passForm.reset();
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);
    }
  };
  const changePhotoHandler = async () => {
    console.log(3);
    // const file = event.target.files?.[0];
    // if (!file) return;

    // const formData = new FormData();
    // formData.append('avatar', file);

    // try {
    //   await dispatch(changePhotoThunk(formData)).unwrap();
    // } catch (error) {
    //   console.error('Ошибка при изменении фото:', error);
    // }
  };

  return (
    <Flex
      className={styles.container}
      h={600}
      m={'30 50'}
      justify={'space-around'}
      direction={'column'}
    >
      <Title className={styles.title} fz={44}>
        Профиль
      </Title>

      <Flex mt={30} className={styles.test}>
        <Flex justify="center" flex={3}>
          <Paper
            w={400}
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            className={styles.userCard}
          >
            <Box pos={'relative'}>
              <Avatar
                src={`${import.meta.env.VITE_API}images/avatars/${user?.avatar}`}
                size={240}
                radius={120}
                mx="auto"
              />
              <Button
                className={styles.editButton}
                pos={'absolute'}
                right={0}
                top={0}
                onClick={changePhotoHandler}
                disabled
              >
                <TbPhotoCog size={25} />
              </Button>
            </Box>
            <Text ta="center" fz={36} fw={700} mt="md">
              {user?.username}
            </Text>
            <Text ta="center" fz={20} fw={400} mt="md">
              {user?.email}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              Аккаунт создан: {user?.createdAt.slice(0, 10)}
            </Text>

            <Button
              variant="default"
              fullWidth
              mt="md"
              onClick={() => navigate('/favorites')}
            >
              Перейти в избранное
            </Button>
          </Paper>
        </Flex>

        <Flex h={400} flex={7} justify="center" direction={'row'} mt="xl">
          <Flex m={20} flex={4} direction={'column'}>
            <Title fz={30} fw={600} order={3}>
              Изменить пароль
            </Title>
            <TextInput
              label="Старый пароль"
              type="password"
              placeholder="Введите старый пароль"
              {...passForm.getInputProps('oldPass')}
            />
            <TextInput
              mt="sm"
              label="Новый пароль"
              type="password"
              placeholder="Введите новый пароль"
              {...passForm.getInputProps('newPass')}
            />
            <TextInput
              mt="sm"
              label="Подтвердите пароль"
              type="password"
              placeholder="Подтвердите новый пароль"
              {...passForm.getInputProps('confirmPass')}
            />

            <Button mt={20} onClick={changePasswordHandler} disabled>
              Отправить
            </Button>
          </Flex>

          <Flex m={20} flex={4} direction={'column'}>
            <Title fz={30} fw={600} order={3}>
              Изменить имя пользователя
            </Title>
            <Input
              mt="sm"
              // label="Новое имя пользователя"
              placeholder="Ввидите новое имя пользователя"
              // {...usernameForm.getInputProps('newUsername')}
              value={usernameForm.values.newUsername} // ✅ Теперь данные обновляются
              onChange={(event) =>
                usernameForm.setFieldValue('newUsername', event.currentTarget.value)
              }
            />

            <Button mt={20} onClick={changeUsernameHandler}>
              Отправить
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
