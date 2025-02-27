import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { HelloCard } from '@/widgets/HelloCard';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { AuthModal } from '@/features/auth/AuthModal';
import { useMediaQuery } from '@mantine/hooks';
import style from './Welcome.module.css';

export function Welcome(): React.JSX.Element {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const isExtraSmallScreen = useMediaQuery('(max-width: 420px)');

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
    setIsAuthModal(false);
    navigate('/createRoute');
  };

  // Динамические классы для текста и кнопок
  const mainTextClass = isExtraSmallScreen
    ? style.mainTextExtraSmall
    : isSmallScreen
    ? style.mainTextSmall
    : isMediumScreen
    ? style.mainTextMedium
    : style.mainTextLarge;

  const buttonContainerClass = isExtraSmallScreen
    ? style.buttonContainerExtraSmall
    : isSmallScreen
    ? style.buttonContainerSmall
    : style.buttonContainerMedium;

  return (
    <>
      <h1 className={style.title}>Добро пожаловать в мир путешествий!</h1>
      <div className={style.container}>
        <img
          className={style.img}
          src="/vecteezy_young-tourist-couple-watching-spectacular-mountain-scenery_10621909.jpg"
          alt="Путешественники"
        />
        <div className={`${style.mainText} ${mainTextClass}`}>
          Создай маршрут путешествия
        </div>

        {/* Кнопки */}
        <div className={`${style.btn} ${buttonContainerClass}`}>
          <Button
            className={`${style.buttonBlue} ${style.customButton}`}
            onClick={redirectToHomePage}
          >
            Начать путешествие
          </Button>
          <Button
            className={`${style.buttonGreen} ${style.customButton}`}
            onClick={redirectToCreateRoute}
          >
            Построить маршрут
          </Button>
        </div>
      </div>

      {/* Контейнер с категориями */}
      <div style={{ marginTop: '40px' }}>
        <h2 className={style.font}>Категории маршрутов</h2>
        <div className={style.svg}>
          <div className={style.iconContainer}>
            <img src="/bicycle.svg" width="100px" className={style.icon} />
            <h3>Велосипедный</h3>
          </div>
          <div className={style.iconContainer}>
            <img src="/person-walking.svg" width="80px" className={style.icon} />
            <h3>Пеший</h3>
          </div>
          <div className={style.iconContainer}>
            <img src="/car-front-fill.svg" width="90px" className={style.icon} />
            <h3>Автомобильный</h3>
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
      {isSmallScreen && (
        <Button
          className={`${style.btnOnSmallScreen} ${style.customButton}`}
          onClick={redirectToHomePage}
        >
          Начать путешествие
        </Button>
      )}
    </>
  );
}
