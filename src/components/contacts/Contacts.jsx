import css from "./Contacts.module.css"
import wait1 from "../../img/svg/socialnetwork1.svg"
import wait2 from "../../img/svg/socialnetwork2.svg"
import wait3 from "../../img/svg/socialnetwork3.svg"
import wait4 from "../../img/svg/socialnetwork4.svg"
import { LuMapPin } from "react-icons/lu";
import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import logo from "../../img/svg/favicon.svg"



export const Contacts =()=>{
    return (
            <div className={`${css.content} container`}>
                <div className={css.block1}>
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
                    
                        <div className={css.logos}>
                            <div className={css.divk}><img src={wait1} alt="" /></div>
                            <div className={css.divk}><img src={wait2} alt="" /></div>
                            <div className={css.divk}><img src={wait3} alt="" /></div>
                            <div className={css.divk}><img src={wait4} alt="" /></div>
                        </div>
                </div>

                <div className={css.img}>
                    <img src={logo} alt="" />
                </div>
            </div>


    );
}

