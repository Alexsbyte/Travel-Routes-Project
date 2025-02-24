import {
  Avatar,
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  Image,
  Menu,
  Divider,
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
                <Button onClick={createRouteHandler}>Создать маршрут</Button>
                <Button onClick={() => navigate('/welcome')}>Главная</Button>
                <Button onClick={() => navigate('/routes')}>Маршруты</Button>
                <Menu withArrow width={180}>
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
                  <Menu.Dropdown bd={'2 solid orange'}>
                    <Menu.Item onClick={() => navigate('/profile')}>Профиль</Menu.Item>
                    <Divider />
                    <Menu.Item onClick={signOutHandler}>Выйти</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            ) : (
              <Group>
                <Button onClick={() => openModal('signin')}>Войти</Button>
                <Button onClick={() => openModal('signup')}>Регистрация</Button>
              </Group>
            )}
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title="Навигация"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="sm">
          <Group>
            <Button
              onClick={() => {
                navigate('/welcome');
                closeDrawer();
              }}
            >
              Главная
            </Button>
            <Button
              onClick={() => {
                navigate('/routes');
                closeDrawer();
              }}
            >
              Маршруты
            </Button>
            {user ? (
              <>
                <Button
                  onClick={() => {
                    navigate('/profile');
                    closeDrawer();
                  }}
                >
                  Профиль
                </Button>
                <Button
                  onClick={() => {
                    signOutHandler();
                    closeDrawer();
                  }}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Group>
                <Button
                  onClick={() => {
                    openModal('signin');
                    closeDrawer();
                  }}
                >
                  Войти
                </Button>
                <Button
                  onClick={() => {
                    closeDrawer();
                    openModal('signup');
                  }}
                >
                  Регистрация
                </Button>
              </Group>
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
