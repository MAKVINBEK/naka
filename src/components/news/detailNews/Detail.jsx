import css from "./Detail.module.css"
import { IoIosArrowBack } from "react-icons/io";
import image1 from "../../../img/image1.jpg"
import image2 from "../../../img/image2.jpg"
import image3 from "../../../img/image3.jpg"
import image4 from "../../../img/image4.jpg"
import image5 from "../../../img/image5.jpg"
import image6 from "../../../img/image6.jpg"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../header/Header";


const image = [
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


export const DetailNews = () => {
    const { id } = useParams();
    const navigate = useNavigate()
const article = image.find(a => a.id === Number(id));

if (!article) return <p>Статья не найдена</p>;

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    return (
        <div className={`${css.parent} container`}>
            <Header/>
            <div onClick={()=>{navigate(-1);scrollToTop()}} className={css.next}><IoIosArrowBack /></div>
            <div className={css.list}>
                <div className={css.details}>
                    <h2>Эль-Сальвадор имеет больше биткойнов, чем общедоступные оценки, с несколькими источниками доходов в BTC, указывает президент Букеле</h2>
                    <h6><span>12:30/12.03.24</span><span>Автор: Марина</span> </h6>
                    <div className={css.img}><img src={article.img} alt="" /></div>
                    <p>Президент Найиб Букеле из Сальвадора указал, что запасы биткойнов его страны могут превышать публичные оценки. Он раскрыл, что Сальвадор получает доходы, связанные с биткойном, из различных источников, в дополнение к капитальным приростам от покупок биткойна с момента его легализации в качестве законного платежного средства в стране.</p>
                    <h3>‘Сальвадор – страна биткойна’</h3>
                    <p>Президент Сальвадора Найиб Букеле указал, что его страна имеет несколько источников дохода от биткойна, в дополнение к прибыли, полученной от резервов биткойна, купленных после того, как страна сделала BTC законным платежным средством наряду с долларом США в сентябре 2021 года.
                        В сообщении на социальной платформе X в понедельник он написал, что Сальвадор получает доходы, связанные с биткойном, от своей программы паспортов, конвертации BTC в USD для местных бизнесов, майнинга и государственных услуг. Президент Сальвадора предоставил эту информацию в ответ на сообщение от Crypto Rover о том, что страна получила прибыль в 83 миллиона долларов от своей стратегии инвестирования в биткойн.</p>
                </div>
                <h3 className={css.yeshe}>Еще новости</h3>
                <div className={css.newsList}>
                    {image.map((el)=>(
                        <div key={el.id} className={css.block}>
                        <Link smooth to={`/news/${el.id}`}><div className={css.image}><img src={el.img} alt="" /></div></Link>
                        <Link to={`/news/${el.id}`}><h3>Условия по картам Visa в банках Кыргызстана</h3></Link>
                        <p>На портал Banks.kg поступают запросы о картах Visa. Для наших пользователей подготовлена информация о категориях карт Visa, сроках их изготовления, стоимости выпуска и обслуживания, тарифах и привилегиях в банках КР.</p>
                        <div className={css.flex}>
                            <h6>8 марта, 2024</h6>
                            <a href="https://Banks.kg" target="_blank" rel="noopener noreferrer">Banks.kg</a>
                        </div>
                    </div>
                    ))}
                    
                </div>
            </div>

        </div>
    )
}