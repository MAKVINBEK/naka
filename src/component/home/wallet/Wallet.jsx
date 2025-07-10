import css from "./Wallet.module.css"
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import arrow from "../../../img/svg/arrowrepit.svg"
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import itez from "../../../img/itez.png"
import qr from "../../../img/QR.png"
import google from "../../../img/svg/googleplys.svg"
import apple from "../../../img/svg/apple.svg"


export const Wallet = () => {
    return (
        <div className={css.parent}>
            <div className="container">
                <h2 className={css.h2}>Умный и простой кошелек <br /> Для <span>управления</span>  вашей криптовалюты</h2>
                <div className={css.list}>
                    <div className={css.block}><FiPlus size={24} /> купи</div>
                    <div className={css.block}><FiMinus size={24} />продай</div>
                    <div className={css.block}><img src={arrow} alt="icon" /> Меняй</div>
                    <div className={css.block}><GoArrowUpRight size={24} /> отправляй</div>
                    <div className={css.block}><GoArrowDownRight size={24} /> получай</div>
                </div>
                <div className={css.img}>
                    <div className={css.image}><img src={itez} alt="image" /></div>
                    <div className={css.qr_block}>
                        <div className={css.qr}><img src={qr} alt="qr" /></div>
                        <div className={css.store}>
                            <button><img src={google} alt="icon" /></button>
                            <button><img src={apple} alt="icon" /></button>
                        </div>
                    </div>
                </div>
                <button className={css.click}>Получить кошелек</button>
            </div>
        </div>
    )
}

