import { IoIosArrowBack } from "react-icons/io"
import { Header_Profile } from "../profile/header_profile/Header_Profile"
import css from "./VerificationLegalEntity.module.css"
import { useState } from "react"
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import photo from "../../../img/photo.png"

export const DataLoading = () => {
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
                    <h3 className={css.title}>Приготовьтесь загрузить документы</h3>
                    <div className={css.img}><img src={photo} alt="photo" /></div>
                    <p className={css.text}>Советы <br />
                    ✅ Сканируйте документ в хорошом освещеннном помещении <br />✅ На документе не должно быть отражений <br />❌ Не редактируйте изображения документа</p>
                    <button className={css.go}>Показать рекомендации</button>
                    <form className={`${css.form} ${css.mo}`} onSubmit={handleSubmit}>
                        <button type="submit" className={css.submit}>Загрузить документы</button>
                        <Link to="/photo-access" type="button" className={css.go}>Сделать фото </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
