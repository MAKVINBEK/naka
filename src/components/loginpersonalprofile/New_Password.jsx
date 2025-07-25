import css from "./register/Register.module.css"
import image from "../../img/register.png"
import favicon from "../../img/svg/favicon.svg"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { Header } from "../header/Header";


export const New_Password = () => {
    const navigate = useNavigate()
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    return (
        <div className={css.parent}>
            <div className={css.image}>
                <img src={image} alt="img" />
            </div>
            <div className="container">
                <div className={css.block}>
                    <div className={css.header}><Header /></div>
                    <img src={favicon} alt="icon" />
                    <div onClick={() => { navigate(-1); scrollToTop() }} className={css.next}><IoIosArrowBack /></div>
                    <form className={css.form}>
                        <h2>Новый пароль</h2>
                        <p className={css.sub_title}>Придумайте новый пароль</p>
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
                        <button className={css.submit}>Далее</button>
                    </form>
                </div>
            </div>
        </div>
    )
}