import css from "./Register.module.css"
import image from "../../../img/register.png"
import favicon from "../../../img/svg/favicon.svg"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Header } from "../../header/Header";
import { post } from "../../../api/ApiRoutes";

export const Register = () => {
    const navigate = useNavigate();
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = {
                email,
                password,
                confirm_password: confirmPassword
            };

            await post.requester(data); 

            navigate("/login"); 
        } catch (err) {
            setError(err.message || "Произошла ошибка");
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
                    <img src={favicon} alt="icon" />
                    <div onClick={() => navigate(-1)} className={css.next}>
                        <IoIosArrowBack />
                    </div>

                    <form className={css.form} onSubmit={handleSubmit}>
                        <h2>Регистрация</h2>

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
                            <span className={css.toggle_icon} onClick={() => setVisible1(!visible1)}>
                                {visible1 ? <FiEyeOff /> : <SlEye />}
                            </span>
                        </div>

                        <div className={css.password_wrapper}>
                            <input
                                type={visible2 ? "text" : "password"}
                                placeholder="Подтвердите пароль"
                                className={css.password_input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span className={css.toggle_icon} onClick={() => setVisible2(!visible2)}>
                                {visible2 ? <FiEyeOff /> : <SlEye />}
                            </span>
                        </div>

                        <label className={css.checkbox_wrapper}>
                            <input type="checkbox" className={css.hidden_checkbox} required />
                            <span className={css.custom_checkbox}>
                                <svg className={css.check_icon} viewBox="0 0 24 24">
                                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" fill="none" />
                                </svg>
                            </span>
                            <span className={css.checkbox_text}>
                                Нажимая на кнопку Регистрация, я соглашаюсь{" "}
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    с правилами обмена
                                </a>
                            </span>
                        </label>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button className={css.submit} type="submit" disabled={loading}>
                            {loading ? "Загрузка..." : "Далее"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
