import css from "./Review.module.css"
import { IoIosArrowForward } from "react-icons/io";
import human from "../../img/svg/human.svg"
import { Link } from "react-router-dom";
import { falshData } from "./AllReview";
import ReviewModal from "./ModalReview";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

export const Review = () => {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [isOpen]);
    
    return (
        <div className={css.parent}>
            <div className="container">
                <h2 className={css.h2}>Отзывы</h2>
                <Link to="/All_Review" className={css.allNews}>
                посмотреть все отзывы<IoIosArrowForward className={css.arrow}/>
                </Link>
            <div className={css.list}>
                {falshData.slice(0,4).map((el,index)=>(
                    <div key={index} className={css.block}>
                    <div className={css.name}>
                        <div className={css.image}><img src={human} alt="photo" /></div>
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
            <button className={css.review} onClick={() => setIsOpen(true)}>Оставить отзыв</button>
            {isOpen && <ReviewModal onClose={() => setIsOpen(false)} />}
        </div>
        </div>
    )
}