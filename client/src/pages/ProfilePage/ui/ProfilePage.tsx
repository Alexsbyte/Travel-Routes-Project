import { Avatar, Box, Button, Flex, Paper, Text, TextInput, Title } from '@mantine/core';
import { TbPhotoCog } from 'react-icons/tb';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import React from 'react';
import { useForm } from '@mantine/form';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

interface PassForm {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}

interface usernameForm {
  username: string;
}

export function ProfilePage(): React.JSX.Element {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const passForm = useForm<PassForm>({
    mode: 'uncontrolled',
    initialValues: {
      oldPass: '',
      newPass: '',
      confirmPass: '',
    },
  });
  const usernameForm = useForm<usernameForm>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
    },
  });

  const changeUsernameHandler = async () => {
    console.log(1);
  };
  const changePasswordHandler = async () => {
    console.log(2);
  };
  const changePhotoHandler = async () => {
    console.log(3);
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
              onClick={() => navigate(CLIENT_ROUTES.HOME)}
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
              placeholder="Введите старый пароль"
              {...passForm.getInputProps('name')}
            />
            <TextInput
              mt="sm"
              label="Новый пароль"
              placeholder="Введите новый пароль"
              {...passForm.getInputProps('email')}
            />
            <TextInput
              mt="sm"
              label="Подтвердите пароль"
              placeholder="Подтвердите новый пароль"
              {...passForm.getInputProps('email')}
            />

            <Button mt={20} onClick={changePasswordHandler}>
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
              {...usernameForm.getInputProps('email')}
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
