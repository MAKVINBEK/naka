import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import css from "./register/Register.module.css";
import image from "../../img/register.png";
import favicon from "../../img/svg/favicon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { Header } from "../header/Header";
import { post } from "../../api/ApiRoutes";

const COOLDOWN_SECONDS = 900; // 15 минут

export const Forgot_Password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [canSend, setCanSend] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const lastSent = localStorage.getItem("forgotPasswordLastSent");
        if (lastSent) {
            const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000);
            if (elapsed < COOLDOWN_SECONDS) {
                setCanSend(false);
                setSecondsLeft(COOLDOWN_SECONDS - elapsed);
            }
        }
    }, []);

    useEffect(() => {
        let timer;
        if (!canSend && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        setCanSend(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [canSend, secondsLeft]);

    const scrollToTop = () => window.scrollTo(0, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSend) {
            toast.error(`Получить новый пароль можно через ${secondsLeft} секунд`);
            return;
        }

        setLoading(true);

        try {
            await post.forgot_password ({ email });
            toast.success("Ссылка для сброса пароля отправлена на почту.");
            localStorage.setItem("forgotPasswordLastSent", Date.now().toString());
            setCanSend(false);
            setSecondsLeft(COOLDOWN_SECONDS);
        } catch (error) {
            console.error(error.response?.data || error.message);
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
                    <div className={css.header}>
                        <Header />
                    </div>
                    <img src={favicon} alt="icon" />
                    <div
                        onClick={() => {
                            navigate(-1);
                            scrollToTop();
                        }}
                        className={css.next}
                    >
                        <IoIosArrowBack />
                    </div>
                    <form className={css.form} onSubmit={handleSubmit}>
                        <h2>Забыли пароль?</h2>
                        <p className={css.sub_title}>
                            Мы отправим ссылку на вашу электронную почту
                        </p>
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
                        <button className={css.submit} disabled={loading}>
                            {loading ? <div className="spinner"></div> : "Получить код"}
                        </button>
                    </form>       
                </div>
            </div>
        </div>
    );
};
