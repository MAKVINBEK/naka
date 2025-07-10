import css from "./News.module.css"
import { IoIosArrowForward } from "react-icons/io";
import image1 from "../../img/image1.jpg"
import image2 from "../../img/image2.jpg"
import image3 from "../../img/image3.jpg"
import image4 from "../../img/image4.jpg"
import image5 from "../../img/image5.jpg"
import image6 from "../../img/image6.jpg"
import { Link } from "react-router-dom";


 export const imageData = [
    {
        img:image1,
        id:1,
    },
    {
        img:image2,
        id:2,
    },
    {
        img:image3,
        id:3,
    },
    {
        img:image4,
        id:4,
    },
    {
        img:image5,
        id:5,
    },
    {
        img:image6,
        id:6,
    },
]


export const News = () => {
    return (
        <div className={css.parent}>
            <div className="container">
                <h2 className={css.h2}>новости</h2>
            <div className={css.list}>
                {imageData.map((el) => (
                    <div key={el.id} className={css.block}>
                        <Link to={`/news/${el.id}`} className={css.image}> <img src={el.img} alt="photo" /></Link>
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