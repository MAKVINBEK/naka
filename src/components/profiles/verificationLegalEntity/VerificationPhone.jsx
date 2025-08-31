import { IoIosArrowBack } from "react-icons/io"
import { Header_Profile } from "../profile/header_profile/Header_Profile"
import css from "./VerificationLegalEntity.module.css"
import { useState } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import photo from "../../../img/svg/photo-acces.svg"
import { IoClose } from "react-icons/io5";

export const VerificationPhone = () => {
    const navigate = useNavigate()

    const handleCopy = () => {
        navigator.clipboard.writeText("https://tabler.io/icons");
        toast.success("Cкопировано")
    };

    return (
        <div className={css.parent}>
            <Header_Profile />
            <div className={`${css.content} container`}>
                <div className={css.header}>
                    <button onClick={()=> navigate(-1)}><IoClose /></button>
                    <div className={css.sidebar}>
                    </div>
                    <div></div>
                </div>
                <div className={`${css.block} ${css.block_phone}`}>
                        <h3 className={css.titles}>Продолжение верификации на телефоне</h3>
                        <p className={css.titlesub}>Отсканируйте QR-код камероймобильного телефона</p>
                        <div className={css.qr}></div>
                        <p className={css.titlesub}>Или попробуйте другой вариант:</p>
                        <p className={`${css.titlesub} ${css.titlesub_phone}`}>Вставьте ссылку в мобильный браузер</p>
                        <div className={css.copy}>
                            <span>https://tabler.io/icons</span>
                            <span className={css.cpy} onClick={handleCopy}>Копировать</span>
                        </div>
                </div>
            </div>
        </div>
    )
}
