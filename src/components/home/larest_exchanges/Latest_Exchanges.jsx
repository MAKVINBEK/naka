import css from "./Latest_Exchanges.module.css"
import bitcoin from "../../../img/svg/bitcoin.svg"
import Tether from "../../../img/svg/Buy Tether.svg"
import { IoMdArrowForward } from "react-icons/io";
import many from "../../../img/svg/many.svg"


const fakeData = [
    { date: "2025.06.30", timeAgo: "5 минут назад", from: "BTC", to: "USDT", amount: "0.5123" },
    { date: "2025.06.29", timeAgo: "1 час назад", from: "ETH", to: "USDT", amount: "2.0130" },
    { date: "2025.06.28", timeAgo: "12 минут назад", from: "TRX", to: "USDT", amount: "101.4020" },
    { date: "2025.06.27", timeAgo: "25 минут назад", from: "BTC", to: "USDT", amount: "0.0978" },
    { date: "2025.06.26", timeAgo: "2 часа назад", from: "LTC", to: "USDT", amount: "3.0044" },
    { date: "2025.06.25", timeAgo: "17 минут назад", from: "BTC", to: "USDT", amount: "12.5491" },
];


export const Latest_Exchanges = () => {
    return (
        <div className={css.parent}>
            <div className={css.icons}>
                <img src={many} alt="icons" />
                <img className={css.icons_top} src={many} alt="icons" />
                <img src={many} alt="icons" />
                <img className={css.icons_top} src={many} alt="icons" />
            </div>
        <div className={`container`}>
            <h2>Последние обмены</h2>
            <div className={css.contain_block}>
                {fakeData.map((el, index) => (
                    <div key={index} className={css.block}>
                        <div className={css.mini_block}>
                            <div>
                                <h5>{el.date}</h5>
                                <p className={css.p}>{el.timeAgo}</p>
                            </div>
                            <div className={css.coin}>
                                <img src={bitcoin} alt="" />
                            </div>
                            <div>
                                <h6>{el.from}</h6>
                                <p className={css.p}>{el.from}</p>
                            </div>
                        </div>
                        <div className={css.arrow}><IoMdArrowForward /></div>
                        <div className={css.mini_block}>
                            <div>
                                <h6>{el.to}</h6>
                                <p className={css.p}>{el.to}</p>
                            </div>
                            <div className={css.coin}>
                                <img src={Tether} alt="" />
                            </div>
                            <div>
                                <div className={css.gap}><h5>{el.amount}</h5> <h5>{el.to}</h5></div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
        </div>
    )
}