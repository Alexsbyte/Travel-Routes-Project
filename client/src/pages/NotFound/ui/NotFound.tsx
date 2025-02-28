import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound(): React.JSX.Element {
  const [timer, setTimer] = useState(10); // Состояние для таймера
  const [showMessage, setShowMessage] = useState(false); // Для отображения сообщения
  const [showInitialText, setShowInitialText] = useState(true); // Для отображения начального текста
  const [background, setBackground] = useState('linear-gradient(45deg, #ff6a00, #ee0979)'); // Фон по умолчанию

  // Таймер, который отсчитывает 10 секунд
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 700); // Таймер обновляется каждую секунду

      return () => clearInterval(interval); // Очистить интервал при размонтировании компонента
    } else {
      setShowMessage(true); // Показываем сообщение, когда таймер закончится
      setShowInitialText(false); // Скрываем начальный текст после окончания таймера
      setBackground('url(/404notfound.jpg) no-repeat center center fixed'); // Меняем фон
    }
  }, [timer]);

  return (
    <div
      className={styles.notFoundContainer}
      style={{
        background: background, // Применяем фон
        backgroundSize: 'cover', // Обеспечивает покрытие всего экрана
        transition: 'background 1s ease-in-out', // Плавное изменение фона
      }}
    >
      {showInitialText && (
        <>
          <div className={styles.notFoundText}>
            Такой страницы не существует.
          </div>
          <div className={styles.notFoundTimer}>
            {timer > 0 ? `Столкновение через... ${timer} секунд` : ''}
            <p className={styles.notFoundSubText}>
              Вы можете вернуться на главную страницу, чтобы спастись.
            </p>
          </div>
        </>
      )}

      {showMessage && (
        <>
          <p className={styles.notFoundSubText}>А, нет. Показалось.</p>
        </>
      )}

      <Link to="/" className={styles.notFoundLink}>
        Вернуться на главную
      </Link>
    </div>
  );
}
