// src/components/loginpersonalprofile/Login.jsx
import css from "./register/Register.module.css"; // у тебя текущий путь
import image from "../../img/register.png";
import favicon from "../../img/svg/favicon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Header } from "../header/Header";
import { post } from "../../api/ApiRoutes";
import { toast } from "react-toastify";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [visible1, setVisible1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Используем твой helper post.login
      const res = await post.login({ email, password });
      // ожидаем res.token
      const token = res?.token ?? res?.data?.token ?? res;
      if (!token) throw new Error("Токен не получен");

      localStorage.setItem("access", token);

      // Если нас вернул Exchenger с intent создать заявку
      const { returnTo, payload } = location.state || {};

      if (returnTo === "create_app" && payload) {
        // сразу создаём заявку от имени пользователя
        try {
          const headers = { Authorization: `Token ${token}` };
          const resp = await axios.post("https://nako.navisdevs.ru/api/v4/applications-history/", payload, { headers });
          // переходим на payment_step с application
          navigate("/payment_step", { state: { application: resp.data }, replace: true });
          return;
        } catch (err) {
          console.error("Ошибка создания заявки после логина:", err);
          toast.error("Не удалось создать заявку после входа. Попробуйте ещё раз.");
          // fallthrough -> дальше нормальная навигация
        }
      }

      // обычный возврат
      if (returnTo) {
        navigate(returnTo, { replace: true });
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
      const msg = err?.errors || err?.message || "Неверный логин или пароль";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.parent}>
      <div className={css.image}>
        <img src={image} alt="img" />
      </div>
      <div className="container">
        <div className={css.block}>
          <div className={css.header}><Header /></div>
          <Link to="/"><img src={favicon} alt="icon" /></Link>

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
                autoComplete="email"
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
                autoComplete="current-password"
                required
              />
              <span
                className={css.toggle_icon}
                onClick={() => setVisible1(!visible1)}
              >
                {visible1 ? <FiEyeOff /> : <SlEye />}
              </span>
            </div>

            <Link to="/forgot_your_password" className={css.forgot_password}>
              Забыли пароль?
            </Link>

            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {error}
              </p>
            )}

            <button type="submit" className={css.submit} disabled={loading}>
              {loading ? <div className='spinner'></div> : "Далее"}
            </button>

            <button
              type="button"
              className={css.moreno_account}
              onClick={() => navigate("/register", { state: location.state })}
            >
              Еще нет аккаунта?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
