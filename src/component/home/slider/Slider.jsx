import css from "./Slider.module.css"
import icons1 from "../../../img/svg/icons1.svg"
import icons2 from "../../../img/svg/icons2.svg"
import icons3 from "../../../img/svg/icons3.svg"
import icons4 from "../../../img/svg/icons4.svg"
import icons5 from "../../../img/svg/icons5.svg"
import icons6 from "../../../img/svg/icons6.svg"


const falshData=[
    {icons:icons1,number:"24 498",title:"Отзывов на Navischange"},
    {icons:icons2,number:"196",title:"Новых клиентов за сутки"},
    {icons:icons3,number:"314",title:"Обменов за сутки"},
    {icons:icons4,number:"121 тыс $",title:"Оборот за сутки"},
    {icons:icons5,number:"2033.9",title:"PM TS"},
    {icons:icons6,number:"1,2 млн $",title:"Резервы"},
]

export const Slider =()=> {
    return(
        <div className={`${css.parent}`}>
                <div className={css.content}>
                    <div className={css.flex}>
                    {falshData.map((el,index)=>(
                        <div key={index} className={css.block}>
                        <img src={el.icons} alt="icon" />
                        <div>
                            <h5>{el.number}</h5>
                        <p>{el.title}</p>
                        </div>
                        
                    </div>
                    ))}
            </div>

            <div className={css.flex+" "+css.dublicate}>
                    {falshData.map((el,index)=>(
                        <div key={index} className={css.block}>
                        <img src={el.icons} alt="icon" />
                        <div>
                            <h5>{el.number}</h5>
                        <p>{el.title}</p>
                        </div>
                    </div>
                    ))}
            </div>
                </div>
                
            </div>
    )
}

