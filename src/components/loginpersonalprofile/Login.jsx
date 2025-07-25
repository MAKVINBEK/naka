import css from "./register/Register.module.css";
import image from "../../img/register.png";
import favicon from "../../img/svg/favicon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Header } from "../header/Header";
import { post } from "../../api/ApiRoutes";

export const Login = () => {
  const navigate = useNavigate();
  const [visible1, setVisible1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await post.login({ email, password });
  
      // 💾 Сохраняем только access token
      localStorage.setItem("access", res.token); // или res.access — в зависимости от API
  
      // ✅ Перенаправляем пользователя
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Ошибка входа");
    }
    console.log(res);
  };

  return (
    <div className={css.parent}>
      <div className={css.image}>
        <img src={image} alt="img" />
      </div>
      <div className="container">
        <div className={css.block}>
          <div className={css.header}><Header /></div>
          <img src={favicon} alt="icon" />
          <div onClick={() => navigate(-1)} className={css.next}>
            <IoIosArrowBack />
          </div>

          <form className={css.form} onSubmit={handleLogin}>
            <h2>Войти</h2>

            <div className={css.password_wrapper}>
              <input
                type="email"
                placeholder="Электронная почта"
                className={css.password_input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className={css.toggle_icon}>
                <HiOutlineMail />
              </span>
            </div>

            <div className={css.password_wrapper}>
              <input
                type={visible1 ? "text" : "password"}
                placeholder="Пароль"
                className={css.password_input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={css.toggle_icon}
                onClick={() => setVisible1(!visible1)}
              >
                {visible1 ? <FiEyeOff /> : <SlEye />}
              </span>
            </div>

            {error && <div className={css.error}>{error}</div>}

            <button type="button" className={css.forgot_password}>
              Забыли пароль?
            </button>

            <button type="submit" className={css.submit}>Далее</button>

            <button
              type="button"
              className={css.moreno_account}
              onClick={() => navigate("/register")}
            >
              Еще нет аккаунта?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
