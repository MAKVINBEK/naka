import ellipse from "../../img/ellipse.png"
import { Slider } from "./slider/Slider"
import { Latest_Exchanges } from "./larest_exchanges/Latest_Exchanges"
import { Review } from "../review/Review"
import { Wallet } from "./wallet/Wallet"
import { Header } from "../header/Header"
import { Video } from "./video/videobg"
import { News } from "../news/News"
import { AcardionBlock } from "./acardion/Faq"

import icon1 from "./cdn-icons/ApeCoin_3D.svg"
import icon2 from "./cdn-icons/Avalanche_3D.svg"
import icon3 from "./cdn-icons/Bitcoin_3D.svg"
import icon4 from "./cdn-icons/EOS_3D.svg"
import icon5 from "./cdn-icons/Ethereum_3D.svg"
import icon6 from "./cdn-icons/Polygon_3D.svg"
import icon7 from "./cdn-icons/Shiba Inu_3D 1.svg"
import icon8 from "./cdn-icons/Solana_3D.svg"
import icon9 from "./cdn-icons/USD Coin_3D.svg"
import Exchenger from "./exchanger/Exchenger"

const iconss =[icon7,icon2,icon3,icon4,icon5,icon6,icon1,icon8,icon9]

export const Home = ()=>{

    return(
        <>
        <div className="bggradient">
            <div className="icons_absolute">
            <div className='icons_home'>
                {iconss.map((el,index)=>(
                    <img className="icon_icon" key={index} src={el} alt="" />
                ))}
            </div>
            </div>
            <Header/>
            <img src={ellipse} className="absolutebg"/>
            <Exchenger/>
            <Slider/>
        </div>
        <Latest_Exchanges/>
        <Review/>
        <Wallet/>
        <Video/>
        <News/>
        <AcardionBlock/>
        </>
    )
}