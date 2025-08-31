import { IoIosArrowBack } from "react-icons/io"
import { Header_Profile } from "../profile/header_profile/Header_Profile"
import css from "./VerificationLegalEntity.module.css"
import { useState } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import photo from "../../../img/svg/photo-acces.svg"

export const PhotoDostup = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!company || !inn || !adress || !from) {
            toast.error("Все поля обязательны")
            return
        }

        navigate("/data-loading", {
            state: {
                company,
                inn,
                adress,
                from
            }
        })
    }

    return (
        <div className={css.parent}>
            <Header_Profile />
            <div className={`${css.content} container`}>
                <div className={css.header}>
                    <button><IoIosArrowBack /></button>
                    <div className={css.sidebar}>
                        <div className={css.to}></div>
                        <div className={css.gradient}></div>
                        <div></div>
                    </div>
                    <div></div>
                </div>
                <div className={css.block}>
                    <div className={`${css.img} ${css.img_photo}`}><img src={photo} alt="photo" /></div>
                        <div className={css.photo_text}>
                            <h3 className={css.titles}>Разрешите доступ к камере</h3>
                            <h4>Пожалуйста, разрешите доступ к камере, чтобы продолжить работу сайта.</h4>
                            <p className={css.titlesub}>В появившемся окне браузера нажмите «Разрешить». Если окно не появилось, проверьте настройки сайта через значок замка в адресной строке.</p>
                        </div>
                        <button type="submit" className={css.submit}>Продолжить</button>
                </div>
            </div>
        </div>
    )
}
