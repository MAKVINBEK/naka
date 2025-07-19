import css from "./Register.module.css"
import image from "../../img/register.png"
import favicon from "../../img/svg/favicon.svg"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";


export const Register = () => {
    const navigate = useNavigate()
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const toggleVisibility = () => {
        setVisible((prev) => !prev);
    };
    return (
        <div className={css.parent}>
            <div className={css.image}>
                <img src={image} alt="img" />
            </div>
            <div className={css.block}>
                <img src={favicon} alt="icon" />
                <div onClick={() => { navigate(-1); scrollToTop() }} className={css.next}><IoIosArrowBack /></div>
                <form className={css.form}>
                    <h2>Регистрация</h2>
                    <div className={css.password_wrapper}>
                        <input
                            type="email"
                            placeholder="Электронная почта"
                            className={css.password_input}
                        />
                        <span className={css.toggle_icon} >
                            <HiOutlineMail />
                        </span>
                    </div>
                    <div className={css.password_wrapper}>
                        <input
                            type={visible1 ? "text" : "password"}
                            placeholder="Пароль"
                            className={css.password_input}
                        />
                        <span className={css.toggle_icon} onClick={() => setVisible1(!visible1)}>
                            {visible1 ? <FiEyeOff /> : <SlEye />}
                        </span>
                    </div>
                    <div className={css.password_wrapper}>
                        <input
                            type={visible2 ? "text" : "password"}
                            placeholder="Пароль"
                            className={css.password_input}
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
                            Нажимая на кнопку Регистрация, я соглашаюсь {" "}
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                с правилами обмена
                            </a>
                        </span>
                    </label>
                    <button className={css.submit}>Далее</button>
                </form>
            </div>
        </div>
    )
}