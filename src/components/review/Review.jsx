import css from "./Review.module.css"
import { IoIosArrowForward } from "react-icons/io";
import human from "../../img/svg/human.svg"
import { Link } from "react-router-dom";
import ReviewModal from "./ModalReview";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { get } from "../../api/ApiRoutes";

export const Review = () => {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

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
        <div className={css.parent}>
            <div className="container">
                <h2 className={css.h2}>Отзывы</h2>
                <Link to="/All_Review" className={css.allNews}>
                    посмотреть все отзывы<IoIosArrowForward className={css.arrow} />
                </Link>
                <div className={css.list}>
                    {data.slice(0, 4).map((el) => (
                        <div key={el.id} className={css.block}>
                            <div className={css.name}>
                                <div className={css.image}><img src={human} alt="photo" /></div>
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
                <button className={css.review} onClick={() => setIsOpen(true)}>Оставить отзыв</button>
                {isOpen && <ReviewModal onClose={() => setIsOpen(false)} />}
            </div>
        </div>
    )
}