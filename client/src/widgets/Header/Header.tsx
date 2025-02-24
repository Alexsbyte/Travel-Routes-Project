import { Box, Burger, Button, Drawer, Group, Image, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import React, { useState } from 'react';
import logo from './tr-logo.png';
import { signOutThunk } from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { AuthModal } from '@/features/auth/AuthModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

export function Header(): React.JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.user);

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

  const handleSuccess = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setAuthType('signin'); // Переключаем на вход
      setIsModalOpen(true); 
    }, 300); // Даем небольшую задержку, чтобы выглядело плавнее
  };


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  // При наличии токена автоматически открываем модальное окно авторизации
  React.useEffect(() => {
    if (token) {
      navigate(CLIENT_ROUTES.HOME); // Перенаправляем на главную страницу
      openModal('signin'); // Открываем окно авторизации
    }
  }, [token, navigate]);

  return (
    <Box pb={50}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Image src={logo} w={70} h="auto" /> <h1>Travel Routes</h1>
          </Group>

          <Group visibleFrom="sm">
            {user ? (

              <Button w={120} h={50} variant="default" onClick={signOutHandler}>

                Выйти
              </Button>
            ) : (
              <>
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
              </>
            )}
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Group justify="center" grow pb="xl" px="md"></Group>
        </ScrollArea>
      </Drawer>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        authType={authType}
      />
    </Box>
  );
}
