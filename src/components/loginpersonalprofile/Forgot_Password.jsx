import css from "./register/Register.module.css"
import image from "../../img/register.png"
import favicon from "../../img/svg/favicon.svg"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Header } from "../header/Header";


export const Forgot_Password = () => {
    const navigate = useNavigate()

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
                        <h2>Забыли пароль?</h2>
                        <p className={css.sub_title}>Мы отправим ссылку на вашу электронную почту</p>
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
                        <button className={css.submit}>Получить код</button>
                    </form>
                </div>
            </div>
        </div>
    )
}