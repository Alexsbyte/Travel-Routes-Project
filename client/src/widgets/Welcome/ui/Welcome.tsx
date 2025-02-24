import { useAppSelector } from '@/shared/hooks/reduxHooks';
// import { HelloCard } from '@/widgets/HelloCard';
import { Button, Title, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { AuthModal } from '@/features/auth/AuthModal';
import style from './Welcome.module.css';

export function Welcome(): React.JSX.Element {
  const { user } = useAppSelector((state) => state.user);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const redirectToHomePage = () => {
    if (!user) {
      setIsAuthModal(true);
    } else {
      navigate(CLIENT_ROUTES.HOME);
    }
  };

  const redirectToCreateRoute = () => {
    if (!user) {
      setIsAuthModal(true);
    } else {
      navigate(CLIENT_ROUTES.ROUTE_FORM);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModal(false); // Закрываем модальное окно после успешной авторизации
    navigate('/createRoute'); // Перенаправляем пользователя на главную страницу
  };

  return (
    <>
      <Title
        order={2}
        style={{
          marginBottom: theme.spacing.md,
          textAlign: 'center',
          fontFamily: 'PT Sans',
          fontSize: '50px',
          fontWeight: '300',
          margin: '0 0 30 0',
        }}
      >
        Добро пожаловать в мир путешествий!
      </Title>

      <div className={style.container} style={{ position: 'relative' }}>
        <img
          src="../../../../public/vecteezy_young-tourist-couple-watching-spectacular-mountain-scenery_10621909.jpg"
          width="100%"
          height="800px"
        />
        <div
          style={{
            width: '800px',
            position: 'absolute',
            top: '50%',
            right: '50px',
            color: 'white',
            fontSize: '70px',
            fontWeight: 'bold',
            fontFamily: 'PT Sans',
            textAlign: 'end',
            borderRadius: '8px',
          }}
        >
          Создай маршрут путешествия
        </div>
        <div
          style={{
            position: 'absolute',
            top: '85%',
            right: '60px',
          }}
        >
          <Button
            variant="white"
            className={`${style.buttonBlue} ${style.customButton}`}
            onClick={redirectToHomePage}
          >
            Начать путешествие
          </Button>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '85%',
            right: '280px',
          }}
        >
          <Button
            variant="white"
            className={`${style.buttonGreen} ${style.customButton}`}
            onClick={redirectToCreateRoute}
          >
            Построить маршрут
          </Button>
        </div>
      </div>
      <div className={style.description}>
        <h2 className={style.font}>Категории маршрутов</h2>
        <div className={style.svg}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/вело.svg" width="100px" />
            <h3 style={{ fontFamily: 'PT Sans', fontSize: '25px' }}>Велосипедный</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/вело.svg" width="100px" />
            <h3 style={{ fontFamily: 'PT Sans', fontSize: '25px' }}>Пеший</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/вело.svg" width="100px" />
            <h3 style={{ fontFamily: 'PT Sans', fontSize: '25px' }}>Автомобильный</h3>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModal}
          onClose={() => setIsAuthModal(false)}
          onSuccess={handleAuthSuccess}
          type="signin"
        />
      </div>
      {/* <HelloCard /> */}
    </>
  );
}
