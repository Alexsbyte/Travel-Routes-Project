import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { HelloCard } from '@/widgets/HelloCard';
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
        className={style.title}
      >
        Добро пожаловать в мир путешествий!
      </Title>

      <div className={style.container} style={{ position: 'relative' }}>
        <img
          className={style.img}
          src="/vecteezy_young-tourist-couple-watching-spectacular-mountain-scenery_10621909.jpg"
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
            lineHeight: '1.2',
          }}
          className={style.mainText}
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
            <img src="/bicycle.svg" width="100px" className={style.icon} />
            <h3 style={{ fontFamily: 'PT Sans', fontSize: '25px' }}>Велосипедный</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <img src="/person-walking.svg" width="80px" className={style.icon} />
            <h3 style={{ fontFamily: 'PT Sans', fontSize: '25px' }}>Пеший</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <img src="/car-front-fill.svg" width="90px" className={style.icon} />
            <h3 style={{ fontFamily: 'PT Sans', fontSize: '25px' }}>Автомобильный</h3>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModal}
          onClose={() => setIsAuthModal(false)}
          onSuccess={handleAuthSuccess}
          authType="signin"
        />
      </div>
      <HelloCard />
    </>
  );
}
