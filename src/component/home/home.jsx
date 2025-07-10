import ellipse from "../../img/ellipse.png"
import { Exchenger } from "./exchanger/Exchenger"
import { Slider } from "./slider/Slider"
import { Latest_Exchanges } from "./larest_exchanges/Latest_Exchanges"
import { Review } from "../review/Review"
import { Wallet } from "./wallet/Wallet"
import { Header } from "../header/Header"
import { Video } from "./video/videobg"
import { News } from "../news/News"
import { AcardionBlock } from "./acardion/Faq"

export const Home = ()=>{
    return(
        <>
        <div className="bggradient">
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