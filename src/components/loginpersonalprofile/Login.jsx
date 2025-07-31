import css from "./register/Register.module.css";
import image from "../../img/register.png";
import favicon from "../../img/svg/favicon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Header } from "../header/Header";
import { post } from "../../api/ApiRoutes";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [visible1, setVisible1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // включаем лоадинг
  
    try {
      const res = await post.login({ email, password });
      localStorage.setItem("access", res.token);
      console.log(res);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Ошибка входа");
      toast.error("Неверный логин или пароль");
    } finally {
      setLoading(false); // выключаем лоадинг в любом случае
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

            <Link to="/forgot_your_password" className={css.forgot_password}>
              Забыли пароль?
            </Link>

            <button type="submit" className={css.submit}>{loading ? <div className={css.spinner}></div> : "Далее"}</button>

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
