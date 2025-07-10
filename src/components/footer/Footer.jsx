import css from "./Footer.module.css"
import logo from '../../img/svg/favicon.svg'
import { Link } from "react-router-dom"
import bitcoin from "../../img/svg/bitcoin.svg"
import network2 from "../../img/svg/socialnetwork2.svg"
import network1 from "../../img/svg/socialnetwork1.svg"
import network3 from "../../img/svg/socialnetwork3.svg"
import network4 from "../../img/svg/socialnetwork4.svg"
import google from "../../img/svg/googleplys.svg"
import apple from "../../img/svg/apple.svg"


const cryptoList = [
    "Buy Bitcoin",
    "Buy Helium",
    "Buy WBTC",
    "Buy Ripple",
    "Buy Dogecoin",
    "Buy Ethereum",
    "Buy BNB",
    "Buy Litecoin",
    "Buy Dai",
    "Buy Bancor",
    "Buy Solana",
    "Buy Tether",
    "Buy Chainlink",
    "Buy Avalanche",
    "Buy Pepe Coin",
    "Buy LEO",
    "Buy Tron",
    "Buy Matic",
    "Buy SHIB",
    "Buy THORChain",
    "Buy EVER",
    "Buy Stellar",
    "Buy Polkadot",
    "Buy EURt",
    "Buy ICP"
];


export const Footer = () => {
    return (
        <div className={css.parent}>
            <div className="container">
                <div className={css.flex+" "+css.fd}>
                    <Link to="/"><img className={css.logo} src={logo} alt="logo" /></Link>
                    <button className={css.click}>Обменять валюту</button>
                </div>
                <div className={css.menu}>
                    <div className={css.block_one}>
                        <p>Это мультивалютный обменный  сервис,
                            где Вы можете безопасно и  выгодно
                            купить или продать нужную Вам валюту</p>
                        <a href="/">NAKA@mail.com</a>
                    </div>
                    <div className={css.block_navigate+" "+css.oo}>
                        <h4>Ресурсы</h4>
                        <Link to='/service'>О сервисе</Link>
                        <Link>Контакты</Link>
                        <Link>Партнерам</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                    <div className={css.block_navigate}>
                        <h4>Документы</h4>
                        <Link>Правила обмена</Link>
                        <Link>Правила использования</Link>
                        <Link>Политика обработки <br /> персональный данных</Link>
                    </div>
                </div>
                <div className={css.crypts}>
                    <h4>Купить криптовалюту</h4>
                    <div className={css.grid}>
                        {cryptoList.map((el, index) => (
                            <div key={index} className={css.block}>
                                <img src={bitcoin} alt="coin" />
                                <p>{el}</p>
                            </div>

                        ))}
                    </div>
                </div>

                <div className={css.flex}>
                    <div className={css.left}>
                        <div><img src={network1} alt="icon" /></div>
                        <div><img src={network2} alt="icon" /></div>
                        <div><img src={network3} alt="icon" /></div>
                        <div><img src={network4} alt="icon" /></div>
                        <div><img src={network2} alt="icon" /></div>
                    </div>
                    <div className={css.store}>
                        <button><img src={apple} alt="icon" /></button>
                        <button><img src={google} alt="icon" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}