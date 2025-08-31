import { Link } from "react-router-dom";
import icon from "../img/svg/404.svg"

const NotFound = () => {
    return(
     <div className="not-found container">
        <img src={icon} alt="404" />
        <h3>Ой...   Такой страницы не существует</h3>
        <p>Возможно, вы ввели неправильный адрес или страница была удалена</p>
        <Link to="/">Вернуться на главную</Link>
     </div>
    )
};

export default NotFound;
