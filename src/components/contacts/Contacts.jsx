import css from "./Contacts.module.css"
import wait2 from "../../img/svg/socialnetwork2.svg"
import wait3 from "../../img/svg/socialnetwork3.svg"
import { LuMapPin } from "react-icons/lu";
import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import logo from "../../img/svg/favicon.svg"
import { Header } from "../header/Header"
import google from "../../img/svg/googleplys.svg"
import apple from "../../img/svg/apple.svg"


export const Contacts = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <h2 className={css.h2}>Контакты</h2>
                <h3 className={css.h3}>Круглосуточный Контакт - центр:</h3>
                <div className={css.parent}>
                    <div className={css.content}>
                        <div className={css.phone_number}>
                            <div className={css.addres + ' ' + css.am}>
                                <span><LuMapPin /></span>
                                <p>Кыргызская республика, г.Бишкек, Проспект Манаса 64/1</p>
                            </div>
                            <div className={css.addres}>
                                <span><CgMail /></span>
                                <div className={css.tel}>
                                    <a href="">+996 (502)-800-202</a>
                                    <a href="">+996 (502)-800-202</a>
                                </div>
                            </div>
                            <div className={css.addres}>
                                <span><MdOutlinePhone /></span>
                                <p>navisasset@mail.com</p>
                            </div>
                        </div>
                        <div className={css.img}>
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className={css.bottom}>
                        <div className={css.logos}>
                            <div className={css.divk}><img src={wait2} alt="" /></div>
                            <div className={css.divk}><img src={wait3} alt="" /></div>
                        </div>
                        <div className={css.store}>
                            <button><img src={apple} alt="icon" /></button>
                            <button><img src={google} alt="icon" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

