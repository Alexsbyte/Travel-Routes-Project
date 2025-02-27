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
  Flex,
  rgba,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classes from './header.module.css';
import React, { useState } from 'react';
import logo from './tr-logo.png';
import { signOutThunk } from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { AuthModal } from '@/features/auth/AuthModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { clearPoints } from '@/entities/point';

export function Header(): React.JSX.Element {
  const isMobile = useMediaQuery('(max-width: 48em)');
  const isTablet = useMediaQuery('(min-width: 48em) and (max-width: 64em)');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
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

  const redirectToHomPage = (): void => {
    dispatch(clearPoints());
    navigate('/');
  };

  // const createRouteHandler = (): void => {
  // dispatch(clearPoints())
  //navigate('/createRoute');
  //};

  const handleSuccess = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setAuthType('signin');
      setIsModalOpen(true);
    }, 300);
  };

  // При наличии токена автоматически открываем модальное окно авторизации
  React.useEffect(() => {
    if (token) {
      navigate(CLIENT_ROUTES.HOME);
      openModal('signin');
    }
  }, [token, navigate]);

  return (
    <Box bg={rgba('gray', 0.07)} mb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group onClick={redirectToHomPage} style={{ cursor: 'pointer' }}>
            <Image src={logo} w={isMobile ? 40 : isTablet ? 50 : 70} />
            <h1 style={{ fontSize: isMobile ? 16 : isTablet ? 18 : 24 }}>
              Travel Routes
            </h1>
          </Group>

          <Group visibleFrom="md">
            {user ? (
              <Group>
                <Button h={55} onClick={() => navigate(CLIENT_ROUTES.WELCOME)}>
                  Главная
                </Button>
                <Button h={55} onClick={() => navigate(CLIENT_ROUTES.HOME)}>
                  Маршруты
                </Button>

                <Button
                  className={classes.cretaRoute}
                  h={55}
                  onClick={() => navigate(CLIENT_ROUTES.ROUTE_FORM)}
                >
                  Создать маршрут
                </Button>
                <Menu withArrow width={180}>
                  <Menu.Target>
                    <Avatar
                      className={classes.avatar}
                      src={`${import.meta.env.VITE_API}images/avatars/${user.avatar}`}
                      alt="User Avatar"
                      radius="xl"
                      size={55}
                      style={{ cursor: 'pointer' }}
                    />
                  </Menu.Target>
                  <Menu.Dropdown bd={'2 solid blue'}>
                    <Menu.Item onClick={() => navigate(CLIENT_ROUTES.PROFILE)}>
                      Профиль
                    </Menu.Item>

                    <Menu.Item onClick={() => navigate(CLIENT_ROUTES.FAVORITE_FORM)}>
                      Избранное
                    </Menu.Item>
                    <Divider />
                    <Menu.Item onClick={signOutHandler}>Выйти</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            ) : (
              <Group>
                <Button h={55} onClick={() => openModal('signin')}>
                  Войти
                </Button>
                <Button h={55} onClick={() => openModal('signup')}>
                  Регистрация
                </Button>
              </Group>
            )}
          </Group>

          <Burger
            // bg={rgba('gray', 0.07)}
            pl={5}
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
          />
        </Group>
      </header>

      <Drawer
        className={classes.drawer}
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title="Навигация"
        padding="sm"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="sm">
          <Flex
            direction={isMobile ? 'column' : 'row'}
            gap="sm"
            justify={isMobile ? 'center' : 'space-around'}
            // align="center"
          >
            <Button
              className={classes.buttons}
              onClick={() => {
                navigate(CLIENT_ROUTES.WELCOME);
                closeDrawer();
              }}
            >
              Главная
            </Button>
            <Button
              className={classes.buttons}
              onClick={() => {
                navigate(CLIENT_ROUTES.HOME);
                closeDrawer();
              }}
            >
              Маршруты
            </Button>
            {user ? (
              <>
                <Button
                  className={classes.buttons}
                  onClick={() => {
                    navigate(CLIENT_ROUTES.FAVORITE_FORM);
                    closeDrawer();
                  }}
                >
                  Профиль
                </Button>

                <Button
                  className={classes.buttons}
                  onClick={() => {
                    navigate(CLIENT_ROUTES.ROUTE_FORM);
                    closeDrawer();
                  }}
                >
                  Создать маршрут
                </Button>
                <Button
                  className={classes.buttons}
                  onClick={() => {
                    signOutHandler();
                    closeDrawer();
                  }}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={classes.buttons}
                  onClick={() => {
                    openModal('signin');
                    closeDrawer();
                  }}
                >
                  Войти
                </Button>
                <Button
                  className={classes.buttons}
                  onClick={() => {
                    closeDrawer();
                    openModal('signup');
                  }}
                >
                  Регистрация
                </Button>
              </>
            )}
          </Flex>
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
