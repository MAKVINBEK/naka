import css from "./Contacts.module.css"
import { FaInstagram } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";
import { LuMapPin } from "react-icons/lu";
import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { Header } from "../header/Header"
import contacticon from "../../img/svg/contacts.svg"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const Contacts = () => {
    function MapUpdater({ center, zoom }) {
        const map = useMap();
        useEffect(() => {
          map.setView(center, zoom);
        }, [center, zoom, map]);
        return null;
      }
      

    const cities = [
        { name: 'Bishkek', position: [42.8746, 74.5698] },
    ];

    return (
        <div>
            <Header />
            <div className="container">
                <div className={css.parent}>
                    <h2>Контакты</h2>
                    <p>Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь!</p>
                    <div className={css.flex}>
                        <div className={css.block}>
                            <h4><img src={contacticon} alt="icon" /> Контактная информация</h4>
                            <p>Наши координаты и способы связи</p>
                            <div className={css.mini_block}>
                                <div className={css.icons}><LuMapPin /></div>
                                <div>
                                    <h5>Гонконг, ул. Лянь-Сянь, д. 18, офис 301</h5>
                                    <p>Метро Пушкинская, Лянь-Сянь</p>
                                </div>
                            </div>
                            <div className={css.mini_block}>
                                <div className={css.icons}><MdOutlinePhone /></div>
                                <div>
                                    <h5 >+996 (700) 126 - 285</h5>
                                    <p>Основная линия</p>
                                </div>
                            </div>
                            <div className={css.mini_block}>
                                <div className={css.icons}><CgMail /></div>
                                <div>
                                    <h5>info@currenweweuey.kg</h5>
                                    <p>Общие вопросы</p>
                                </div>
                            </div>
                            <div className={css.mini_block}>
                                <div className={css.icons}><FaRegClock /></div>
                                <div>
                                    <h5>Пн-Пт: 9:00 - 21:00 <br />
                                        Сб-Вс: 10:00 - 18:00</h5>
                                    <p>Бишкекское время</p>
                                </div>
                            </div>
                            <div className={css.solid}></div>
                            <h5>Социальные сети</h5>
                            <div className={css.logos}>
                                <div className={css.div}><RiTelegram2Line /></div>
                                <div className={css.div}><FaInstagram /></div>
                            </div>

                        </div>

                        <div className={css.block}>
                            <h4>Отправить сообщение</h4>
                            <p>Заполните форму — ответим в течение 24 часов</p>
                            <form className={css.form}>
                                <label>Имя</label>
                                <input type="text" placeholder="Ваше имя" required />
                                <label>Email</label>
                                <input type="email" placeholder="your@email.com" required />
                                <label>Тема сообщения</label>
                                <input type="text" placeholder="Укажите тему" required />
                                <label>Сообщение</label>
                                <textarea type="" placeholder="Расскажите, чем мы можем помочь..." required />
                                <button type="submit">Отправить сообщение</button>
                            </form>
                        </div>
                    </div>

                    <div className={css.block}>
                        <h5>Как нас найти?</h5>
                        <div className={css.map_container}>
                            <MapContainer center={[42.8746, 74.5698]} zoom={13} className={css.map}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                {cities.map((city,index) => (
                                    <Marker key={index} position={city.position}>
                                        <Popup>{city.name}</Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

