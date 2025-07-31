import css from "./register/Register.module.css";
import image from "../../img/register.png";
import favicon from "../../img/svg/favicon.svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { Header } from "../header/Header";
import axios from "axios";
import { toast } from "react-toastify";

export const New_Password = () => {
    const navigate = useNavigate();
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const scrollToTop = () => window.scrollTo(0, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Пароли не совпадают");
            return;
        }

        setLoading(true);

        try {
            
            const token = searchParams.get("token");
            const uidb64 = searchParams.get("uid");

            await axios.post(
                "https://nako.navisdevs.ru/api/auth/set-password/",
                {
                    uidb64,
                    token,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                }
            );

            toast.success("Пароль успешно изменён");
            navigate("/login"); // или куда нужно после успеха
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error("Ошибка при изменении пароля");
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
                        <h2>Новый пароль</h2>
                        <p className={css.sub_title}>Придумайте новый пароль</p>
                        <div className={css.password_wrapper}>
                            <input
                                type={visible1 ? "text" : "password"}
                                placeholder="Пароль"
                                className={css.password_input}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <span
                                className={css.toggle_icon}
                                onClick={() => setVisible1(!visible1)}
                            >
                                {visible1 ? <FiEyeOff /> : <SlEye />}
                            </span>
                        </div>
                        <div className={css.password_wrapper}>
                            <input
                                type={visible2 ? "text" : "password"}
                                placeholder="Повторите пароль"
                                className={css.password_input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span
                                className={css.toggle_icon}
                                onClick={() => setVisible2(!visible2)}
                            >
                                {visible2 ? <FiEyeOff /> : <SlEye />}
                            </span>
                        </div>
                        <button className={css.submit} disabled={loading}>
                            {loading ? <div className='spinner'></div> : "Далее"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
