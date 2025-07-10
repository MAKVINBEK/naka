import css from "./News.module.css"
import { Link } from "react-router-dom";
import { imageData } from "./News";
import { Header } from "../header/Header";




export const AllNews = () => {
    return (
        <div className={`${css.Allparent}`}>
            <Header/>
            <div className="container">
                <h2 className={css.h2}>Все новости</h2>
            <div className={css.list}>
                {imageData.map((el)=>(
                    <div key={el.id} className={css.block}>
                    <Link to={`/news/${el.id}`} className={css.image}><img src={el.img} alt="photo" /></Link>
                <div className={css.titles}>
                <Link to={`/news/${el.id}`}><h3>Условия по картам Visa в банках Кыргызстана</h3></Link>
                    <p>На портал Banks.kg поступают запросы о картах Visa.
                        Для наших пользователей подготовлена информация о
                        категориях карт Visa, сроках их изготовления, стоимости
                        выпуска и обслуживания, тарифах и привилегиях в банках КР.</p>
                        <div className={css.flex}>
                            <h6>8 марта, 2024</h6>
                            <a href="https://Banks.kg" target="_blank" rel="noopener noreferrer">Banks.kg</a>
                        </div>
                </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
}