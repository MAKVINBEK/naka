import { IoIosArrowBack } from "react-icons/io"
import { Header_Profile } from "../profile/header_profile/Header_Profile"
import css from "./VerificationLegalEntity.module.css"
import { useState } from "react"
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

export const LegalEntity = () => {
    const [company, setCompany] = useState("")
    const [inn, setInn] = useState("")
    const [adress, setAdress] = useState("")
    const [from, setFrom] = useState("")
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
                        <div className={css.gradient}></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div></div>
                </div>
                <div className={css.block}>
                    <h3 className={css.title}>Верификация: 🏢 Юридическое лицо</h3>
                    <p className={css.subtitle}>
                        Верификация необходима для защиты ваших данных и предотвращения мошенничества.
                        Пожалуйста, заполните форму и загрузите необходимые документы
                    </p>
                    <form className={css.form} onSubmit={handleSubmit}>
                        <label>Название компании</label>
                        <input
                            type="text"
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />

                        <label>ИНН</label>
                        <input
                            type="text"
                            required
                            value={inn}
                            onChange={(e) => setInn(e.target.value)}
                        />

                        <label>Юридический адрес</label>
                        <input
                            type="text"
                            required
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                        />

                        <label>Страна регистрации</label>
                        <input
                            type="text"
                            required
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />

                        <button type="submit" className={css.submit}>Продолжить</button>
                        <Link to="/phone" type="button" className={css.go}>Продолжить на телефоне</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
