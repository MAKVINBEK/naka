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
import BuyDogecoin from "../../img/svg/Buy Dogecoin.svg";
import BuyEthereum from "../../img/svg/Buy Ethereum.svg";
import BuyHelium from "../../img/svg/Buy Helium.svg";
import BuyRipple from "../../img/svg/Buy Ripple.svg";
import BuyWBTC from "../../img/svg/Buy WBTC.svg";
import BuyMatic from "../../img/svg/Buy Matic.svg";
import BuyPepeCoin from "../../img/svg/Buy Pepe Coin.svg";
import BuyAvalanche from "../../img/svg/Buy Avalanche.svg";
import BuyBancor from "../../img/svg/Buy Bancor.svg";
import BuyBNB from "../../img/svg/Buy BNB.svg";
import BuyChainlink from "../../img/svg/Buy Chainlink.svg";
import BuyDai from "../../img/svg/Buy Dai.svg";
import BuyLEO from "../../img/svg/Buy LEO.svg";
import BuyLitecoin from "../../img/svg/Buy Litecoin.svg";
import BuySolana from "../../img/svg/Buy Solana.svg";
import BuyTether from "../../img/svg/Buy Tether.svg";
import BuyTron from "../../img/svg/Buy Tron.svg";
import BuySHIB from "../../img/svg/Buy SHIB.svg";
import BuyTHORChain from "../../img/svg/Buy THORChain.svg";
import BuyEVER from "../../img/svg/Buy EVER.svg";
import BuyStellar from "../../img/svg/Buy Stellar.svg";
import BuyPolkadot from "../../img/svg/Buy Polkadot.svg";
import BuyEURt from "../../img/svg/Buy EURt.svg";
import BuyICP from "../../img/svg/Buy ICP.svg";


const cryptoList = [
    { title: "Buy Bitcoin", image: bitcoin },
    { title: "Buy Helium", image: BuyHelium },
    { title: "Buy WBTC", image: BuyWBTC },
    { title: "Buy Ripple", image: BuyRipple },
    { title: "Buy Dogecoin", image: BuyDogecoin },
    { title: "Buy Ethereum", image: BuyEthereum },
    { title: "Buy BNB", image: BuyBNB },
    { title: "Buy Litecoin", image: BuyLitecoin },
    { title: "Buy Dai", image: BuyDai },
    { title: "Buy Bancor", image: BuyBancor },
    { title: "Buy Solana", image: BuySolana },
    { title: "Buy Tether", image: BuyTether },
    { title: "Buy Chainlink", image: BuyChainlink },
    { title: "Buy Avalanche", image: BuyAvalanche },
    { title: "Buy Pepe Coin", image: BuyPepeCoin },
    { title: "Buy LEO", image: BuyLEO },
    { title: "Buy Tron", image: BuyTron },
    { title: "Buy Matic", image: BuyMatic },
    { title: "Buy SHIB", image: BuySHIB },
    { title: "Buy THORChain", image: BuyTHORChain },
    { title: "Buy EVER", image: BuyEVER },
    { title: "Buy Stellar", image: BuyStellar },
    { title: "Buy Polkadot", image: BuyPolkadot },
    { title: "Buy EURt", image: BuyEURt },
    { title: "Buy ICP", image: BuyICP }
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
                        <a href="https://naka.kz/">www.naka.kz</a>
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
                        <Link to="/privacy-policy" target="_blank">Политика конфиденциальности</Link>
                        <Link to="/terms-of-service" target="_blank">Пользовательское соглашение</Link>
                    </div>
                </div>
                <div className={css.crypts}>
                    <h4>Купить криптовалюту</h4>
                    <div className={css.grid}>
                        {cryptoList.map((el, index) => (
                            <div key={index} className={css.block}>
                                <img src={el.image} alt="coin" />
                                <p>{el.title}</p>
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