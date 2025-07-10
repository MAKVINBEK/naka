import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Отслеживает текущий путь

  useEffect(() => {
    window.location.hash = ''; // Убирает якорь из URL
    window.scrollTo(0, 0); // Прокручивает страницу наверх
  }, [pathname]); // Выполняется при изменении пути

  return null; // Ничего не рендерит
};

export default ScrollToTop;
