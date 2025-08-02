import css from "./Review.module.css"
import human from "../../img/svg/human.svg"
import { useEffect, useState } from "react";
import ReviewModal from "./ModalReview";
import { Header } from "../header/Header";
import { IoStar } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { get } from "../../api/ApiRoutes";


export const AllReview = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
        const response = async () => {
            try {
                const res = await get.feedback();
                setData(res)
            } catch (err) {
                console.log(err);
            }
        }
        response();
    }, [])

    return (
        <div className={css.content}>
            <Header />
            <div className={`${css.parents} container`}>
                <div className={css.title}>
                    <h2 className={css.h2 + " " + css.h22}>Отзывы</h2>
                    <div onClick={() => navigate(-1)}><IoIosArrowForward className={css.arrown} /></div>

                    <div className={css.arrows} onClick={() => setIsOpen(true)}>Оставить отзыв</div>
                    {isOpen && <ReviewModal onClose={() => setIsOpen(false)} />}
                </div>
                <div className={css.list}>
                    {data.map((el) => (
                        <div key={el.id} className={css.block}>
                            <div className={css.name}>
                                <div className={css.image}><img src={human} alt="" /></div>
                                <div>
                                    <h4>{el.name}</h4>
                                    <div className={css.star}>
                                        {[...Array(el.star)].map((_, i) => (
                                            <IoStar key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p>{el.text}</p>
                            <h6>{el.created_at}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}