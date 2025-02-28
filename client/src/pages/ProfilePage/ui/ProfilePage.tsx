import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { TbPhotoCog } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import {
  changePasswordThunk,
  // changePhotoThunk,
  changeUsernameThunk,
} from '@/entities/user/api';
import { IApiResponseReject } from '@/shared/types';
import { useDisclosure } from '@mantine/hooks';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

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
  const [error, setError] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(false);
  const [usernameButtonDisabled, setUsernameButtonDisabled] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
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
    if (!newUsername) {
      setError('Имя пользователя не может быть пустым');
      open();
      setUsernameButtonDisabled(false);
      return;
    }

    try {
      await dispatch(changeUsernameThunk({ newUsername })).unwrap();
      usernameForm.reset();
      setUsernameButtonDisabled(false);
    } catch (error) {
      const { message } = error as IApiResponseReject;
      setError(message);
      open();
      setUsernameButtonDisabled(false);
    }
  };

  const changePasswordHandler = async () => {
    const { oldPass, newPass, confirmPass } = passForm.values;
    if (newPass !== confirmPass) {
      setError('Пароли не совпадают!');
      open();

      setPasswordButtonDisabled(false);
      return;
    }

    try {
      await dispatch(changePasswordThunk({ oldPass, newPass })).unwrap();
      passForm.reset();
      setPasswordButtonDisabled(false);
    } catch (error) {
      const { message } = error as IApiResponseReject;
      setError(message);
      open();
      setPasswordButtonDisabled(false);
    }
  };
  const changePhotoHandler = async () => {
    // const file = event.target.files?.[0];
    // if (!file) return;

    // const formData = new FormData();
    // formData.append('avatar', file);

    // try {
    //   await dispatch(changePhotoThunk(formData)).unwrap();
    // } catch (error) {
    // const { message } = error as IApiResponseReject;
    // antMessage.error(message);
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
              h={55}
              onClick={() => navigate(CLIENT_ROUTES.FAVORITE_FORM)}
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
              type={showOldPass ? 'text' : 'password'}
              placeholder="Введите старый пароль"
              {...passForm.getInputProps('oldPass')}
              rightSection={
                <span
                  // size={40}
                  // bg={rgba('white', 0)}
                  // variant="subtle"
                  onClick={() => setShowOldPass((prev) => !prev)}
                >
                  {showOldPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              }
            />
            <TextInput
              mt="sm"
              label="Новый пароль"
              type={showNewPass ? 'text' : 'password'}
              placeholder="Введите новый пароль"
              {...passForm.getInputProps('newPass')}
              rightSection={
                <span
                  // size={40}
                  // bg={rgba('white', 0)}
                  // variant="subtle"
                  onClick={() => setShowNewPass((prev) => !prev)}
                >
                  {showNewPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              }
            />
            <TextInput
              mt="sm"
              label="Подтвердите пароль"
              type={showConfirmPass ? 'text' : 'password'}
              placeholder="Подтвердите новый пароль"
              {...passForm.getInputProps('confirmPass')}
              rightSection={
                <span onClick={() => setShowConfirmPass((prev) => !prev)}>
                  {showConfirmPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              }
            />

            <Button
              mt={20}
              h={55}
              disabled={passwordButtonDisabled}
              onClick={() => {
                changePasswordHandler();
                setPasswordButtonDisabled(true);
              }}
            >
              Отправить
            </Button>
          </Flex>

          <Flex m={20} flex={4} direction={'column'}>
            <Title fz={30} fw={600} order={3}>
              Изменить имя пользователя
            </Title>
            <TextInput
              mt="sm"
              label="Новое имя пользователя"
              placeholder="Ввидите новое имя пользователя"
              value={usernameForm.values.newUsername}
              onChange={(event) =>
                usernameForm.setFieldValue('newUsername', event.currentTarget.value)
              }
            />

            <Button
              mt={20}
              h={55}
              disabled={usernameButtonDisabled}
              onClick={() => {
                changeUsernameHandler();
                setUsernameButtonDisabled(true);
              }}
            >
              Отправить
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setError('');
        }}
        withCloseButton={false}
      >
        <Text ta={'center'} c={'red'}>
          {error}
        </Text>
      </Modal>
    </Flex>
  );
}
