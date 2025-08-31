// src/components/loginpersonalprofile/register/Register.jsx
import css from "./Register.module.css";
import image from "../../../img/register.png";
import favicon from "../../../img/svg/favicon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import ReactDOM from "react-dom";
import { useState, useRef, useEffect } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { post } from "../../../api/ApiRoutes";
import { Header } from "../../header/Header";
import axios from "axios";

export const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const CODE_LENGTH = 6;
    const [values, setValues] = useState(Array(CODE_LENGTH).fill(""));
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmError, setConfirmError] = useState("");
    const inputsRef = useRef([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        setLoading(true);
        try {
            const response = await post.requester({
                email,
                password,
                confirm_password: confirmPassword
            });
            setShowModal(true);
        } catch (err) {
            setError(err.error || "Что-то пошло не так. Попробуйте позже");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const codeStr = values.join("");
        if (codeStr.length === CODE_LENGTH && !values.includes("")) {
            confirmCode(codeStr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    const confirmCode = async (code) => {
        setConfirmLoading(true);
        setConfirmError("");
        try {
            const res = await post.confirmCode({ email, code });
            // получаем токен
            const token = res?.token ?? res?.data?.token ?? res;
            if (!token) throw new Error("Токен не получен");

            localStorage.setItem("access", token);

            // Если при регистрации был intent создать заявку
            const { returnTo, payload } = location.state || {};
            if (returnTo === "create_app" && payload) {
                try {
                    const headers = { Authorization: `Token ${token}` };
                    const resp = await axios.post("https://nako.navisdevs.ru/api/v4/applications-history/", payload, { headers });
                    navigate("/payment_step", { state: { application: resp.data }, replace: true });
                    return;
                } catch (err) {
                    console.error("Ошибка создания заявки после регистрации:", err);
                    // если не удалось — просто переходим в профиль, пользователь всё равно залогинен
                }
            }

            // обычное поведение
            if (returnTo) {
                navigate(returnTo, { replace: true });
            } else {
                navigate('/profile');
            }
        } catch (err) {
            setConfirmError('Неверный код');
            setValues(Array(CODE_LENGTH).fill(""));
            inputsRef.current[0]?.focus();
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await post.requester({ email, password, confirm_password: confirmPassword });
            setConfirmError('');
            setValues(Array(CODE_LENGTH).fill(''));
            inputsRef.current[0]?.focus();
        } catch (err) {
            setConfirmError('Ошибка при повторной отправке кода');
        }
    };

    const handleChange = (index, e) => {
        const val = e.target.value;
        if (!/^[0-9a-zA-Z]$/.test(val)) return;
        const newValues = [...values];
        newValues[index] = val;
        setValues(newValues);
        if (index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            const newValues = [...values];
            if (newValues[index] === '') {
                if (index > 0) {
                    inputsRef.current[index - 1]?.focus();
                }
            } else {
                newValues[index] = '';
                setValues(newValues);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').slice(0, CODE_LENGTH).split('');
        const newValues = Array(CODE_LENGTH).fill('');
        pasted.forEach((char, i) => {
            if (/^[0-9a-zA-Z]$/.test(char)) newValues[i] = char;
        });
        setValues(newValues);
        inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
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

                    <form className={css.form} onSubmit={handleSubmit} autoComplete="on">
                        <h2>Регистрация</h2>

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
                            <span className={css.toggle_icon}><HiOutlineMail /></span>
                        </div>

                        <div className={css.password_wrapper}>
                            <input
                                minLength="8"
                                type={visible1 ? "text" : "password"}
                                placeholder="Пароль"
                                className={css.password_input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            <span className={css.toggle_icon} onClick={() => setVisible1(!visible1)}>
                                {visible1 ? <FiEyeOff /> : <SlEye />}
                            </span>
                        </div>

                        <div className={css.password_wrapper}>
                            <input
                                minLength="8"
                                type={visible2 ? "text" : "password"}
                                placeholder="Подтвердите пароль"
                                className={css.password_input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
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
                                Я согласен с <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a> и <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">пользовательским соглашением</a>
                            </span>
                        </label>

                        {error && <p style={{ color: "red", marginTop: "10px", }}>{error}</p>}

                        <button className={css.submit} type="submit" disabled={loading}>
                            {loading ? <div className='spinner'></div> : "Регистрация"}
                        </button>
                    </form>

                </div>
            </div>

            {showModal && ReactDOM.createPortal(
                <div className={css.overlay} >
                    <div className={css.modal} >
                        <h2>Подтверждение кода</h2>
                        <p>Введите код подтверждения, который мы отправили на ваш email.</p>
                        <div className={css.code_input_wrapper}>
                            {values.map((value, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputsRef.current[i] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(i, e)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    className={css.input}
                                    disabled={confirmLoading}
                                />
                            ))}
                        </div>
                        {confirmError && <p style={{ color: 'red', marginBottom: '0px', }}>{confirmError}</p>}
                        {confirmLoading && <p>Проверка кода...</p>}
                        <div className={css.eshe}>
                            <button className={css.eshe_submit} onClick={handleResend} disabled={confirmLoading}>
                                Отправить еще раз
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
