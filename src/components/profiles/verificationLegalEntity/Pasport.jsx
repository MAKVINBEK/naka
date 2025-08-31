import { IoIosArrowBack } from "react-icons/io"
import { Header_Profile } from "../profile/header_profile/Header_Profile"
import css from "./VerificationLegalEntity.module.css"
import { useState } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { TbCloudDown } from "react-icons/tb";

export const Pasport = () => {
    const navigate = useNavigate()

    const [doc1, setDoc1] = useState(null)
    const [doc2, setDoc2] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!doc1 || !doc2 ) {
            toast.error("Все документы обязательны для загрузки")
            return
        }

        navigate("/data-loading", {
            state: {
                doc1,
                doc2,
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
                <form className={css.block} onSubmit={handleSubmit}>
                    <h3 className={css.titles}>Загрузите паспорт</h3>
                    <h4 className={css.titlesub}>Все данные на фото должны быть видны и легко читаться</h4>

                    <div className={css.vibor}>
                        <input 
                            type="file"  
                            className={css.input} 
                            onChange={(e)=>setDoc1(e.target.files[0])}
                        />
                        <div className={css.peretash}><TbCloudDown /></div>
                        <div className={css.tip_doctype}>
                            <h4>Лицевая сторона</h4>
                            <p><span>Выберите</span> или перетащите</p>
                        </div>
                    </div>
                    <div className={css.format}>JPG, PNG, PDF (максимум 50mb)</div>

                    <div className={css.vibor}>
                        <input 
                            type="file"  
                            className={css.input} 
                            onChange={(e)=>setDoc2(e.target.files[0])}
                        />
                        <div className={css.peretash}><TbCloudDown /></div>
                        <div className={css.tip_doctype}>
                            <h4>Обратная сторона</h4>
                            <p><span>Выберите</span> или перетащите</p>
                        </div>
                    </div>
                    <div className={css.format}>JPG, PNG, PDF (максимум 50mb)</div>

                    <button type="submit" className={css.submit}>Продолжить</button>
                </form>
            </div>
        </div>
    )
}
