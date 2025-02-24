import {
  Avatar,
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  Image,
  Menu,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import React, { useState } from 'react';
import logo from './tr-logo.png';

import { signOutThunk } from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { AuthModal } from '@/features/auth/AuthModal';
import { useNavigate } from 'react-router-dom';

export function Header(): React.JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();

  const openModal = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setIsModalOpen(true);
  };

  const signOutHandler = async (): Promise<void> => {
    try {
      dispatch(signOutThunk());
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unexpected error');
      }
    }
  };

  const createRouteHandler = (): void => {
    navigate('/createRoute');
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
  };
  return (
    <Box pb={50}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Image src={logo} w={70} h="auto" /> <h1>Travel Routes</h1>
          </Group>

          <Group visibleFrom="md">
            {user ? (
              <Group>
                <Button
                  bg={'orange'}
                  c={'white'}
                  variant="default"
                  onClick={createRouteHandler}
                >
                  Создать маршрут
                </Button>
                <Button bg={'white'} c={'orange'} onClick={() => navigate('/welcome')}>
                  Главная
                </Button>
                <Button bg={'white'} c={'orange'} onClick={() => navigate('/routes')}>
                  Маршруты
                </Button>
                <Menu withArrow>
                  <Menu.Target>
                    <Avatar
                      className={classes.avatar}
                      src={`http://localhost:3000/images/avatars/${user.avatar}`}
                      alt="User Avatar"
                      radius="xl"
                      size={66}
                      style={{ cursor: 'pointer' }}
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => navigate('/profile')}>Профиль</Menu.Item>
                    <Menu.Item onClick={signOutHandler}>Выйти</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            ) : (
              <Group>
                <Button
                  w={120}
                  h={50}
                  variant="default"
                  onClick={() => openModal('signin')}
                >
                  Войти
                </Button>
                <Button w={160} h={50} onClick={() => openModal('signup')}>
                  Регистрация
                </Button>
              </Group>
            )}
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        // padding="md"
        title="Навигация"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Group grow pb="xl" px="md">
            <Button
              bg="white"
              c="orange"
              onClick={() => {
                navigate('/welcome');
                closeDrawer();
              }}
            >
              Главная
            </Button>
            <Button
              bg="white"
              c="orange"
              onClick={() => {
                navigate('/routes');
                closeDrawer();
              }}
            >
              Маршруты
            </Button>
            {user && (
              <>
                <Button
                  bg="orange"
                  c="white"
                  onClick={() => {
                    navigate('/profile');
                    closeDrawer();
                  }}
                >
                  Профиль
                </Button>
                <Button
                  bg="red"
                  c="white"
                  onClick={() => {
                    signOutHandler();
                    closeDrawer();
                  }}
                >
                  Выйти
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        type={authType}
      />
    </Box>
  );
}
