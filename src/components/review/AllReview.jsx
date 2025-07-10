import css from "./Review.module.css"
import human from "../../img/svg/human.svg"
import { useState } from "react";
import ReviewModal from "./ModalReview";
import { Header } from "../header/Header";
import { IoStar } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const falshData = [
    { name: "Бекболсун", title: "Обмен прошел успешно! Рекомендую", data: "23.05.2024 12:30" },
    { name: "Орозали", title: "Сделка прошла быстро и по хорошему курсуСделка прошла быстро и по хорошему курсуСделка прошла быстро и по хорошему курсу.Радует что миникалка не высокая как в других сервисах.Рекомендую!", data: "23.05.2024 12:30" },
    { name: "Санжарбек", title: "Обменный пункт хороший, оперативный, в поддержке отвечают быстро, советую.", data: "23.05.2024 12:30" },
    { name: "Ихсан", title: "Неоднократно пользуюсь вашим обменником. Всегда работает без нареканий. Все быстро, без проволочек и задержек.", data: "23.05.2024 12:30" },
    { name: "Бекболсун", title: "Обмен прошел успешно! Рекомендую", data: "23.05.2024 12:30" },
    { name: "Орозали", title: "Сделка прошла быстро и по хорошему курсу.Радует что миникалка не высокая как в других сервисах.Рекомендую!", data: "23.05.2024 12:30" },
    { name: "Санжарбек", title: "Обменный пункт хороший, оперативный, в поддержке отвечают быстро, советую.", data: "23.05.2024 12:30" },
    { name: "Ихсан", title: "Неоднократно пользуюсь вашим обменником. Всегда работает без нареканий. Все быстро, без проволочек и задержек.", data: "23.05.2024 12:30" },
    { name: "Бекболсун", title: "Обмен прошел успешно! Рекомендую", data: "23.05.2024 12:30" },
    { name: "Орозали", title: "Сделка прошла быстро и по хорошему курсу.Радует что миникалка не высокая как в других сервисах.Рекомендую!", data: "23.05.2024 12:30" },
    { name: "Санжарбек", title: "Обменный пункт хороший, оперативный, в поддержке отвечают быстро, советую.", data: "23.05.2024 12:30" },
    { name: "Ихсан", title: "Неоднократно пользуюсь вашим обменником. Всегда работает без нареканий. Все быстро, без проволочек и задержек.", data: "23.05.2024 12:30" },
]


export const AllReview = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
    <div className={css.content}>
        <Header />
        <div className={`${css.parents} container`}>
            <div className={css.title}>
                <h2 className={css.h2+" "+css.h22}>Отзывы</h2>
                <div onClick={()=>navigate(-1)}><IoIosArrowForward className={css.arrown}/></div>
                
                <div className={css.arrows} onClick={() => setIsOpen(true)}>Оставить отзыв</div>
                {isOpen && <ReviewModal onClose={() => setIsOpen(false)} />}
            </div>
            <div className={css.list}>
                {falshData.map((el, index) => (
                    <div key={index} className={css.block}>
                        <div className={css.name}>
                            <div className={css.image}><img src={human} alt="" /></div>
                            <div>
                                <h4>{el.name}</h4>
                                <div className={css.star}>
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </div>
                        <p>{el.title}</p>
                        <h6>{el.data}</h6>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}