import css from "./Detail.module.css"
import { IoIosArrowBack } from "react-icons/io";
import image1 from "../../../img/image1.jpg"
import image2 from "../../../img/image2.jpg"
import image3 from "../../../img/image3.jpg"
import image4 from "../../../img/image4.jpg"
import image5 from "../../../img/image5.jpg"
import image6 from "../../../img/image6.jpg"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../header/Header";
import { get } from "../../../api/ApiRoutes";
import { useEffect, useState } from "react";

export const DetailNews = () => {
    const { slug } = useParams();
    const navigate = useNavigate()

const [data,setData]= useState([])
const [article,setArticle]= useState([])

    useEffect(()=>{
        const response = async ()=>{
            try{
                const res = await get.news();
                setData(res)
            }catch(err){
                console.log(err);
            }
        }
        response();
    },[])

    useEffect(()=>{
        const response = async ()=>{
            try{
                const res = await get.news(slug);
                setArticle(res)
            }catch(err){
                console.log(err);
            }
        }
        response();
    },[])
    if (!data.length) return <p></p>;

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    return (
        <div className={`${css.parent} container`}>
            <Header/>
            <div onClick={()=>{navigate(-1);scrollToTop()}} className={css.next}><IoIosArrowBack /></div>
            <div className={css.list}>
                <div className={css.details}>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                     </div>
                <h3 className={css.yeshe}>Еще новости</h3>
                <div className={css.newsList}>
                    {data.map((el)=>(
                        <div key={el.id} className={css.block}>
                        <Link smooth to={`/news/${el.slug}`}><div className={css.image}><img src={el.image} alt="image" /></div></Link>
                        <Link to={`/news/${el.slug}`}><h3>{el.title}</h3></Link>
                        <p>{el.content_q}</p>
                        <div className={css.flex}>
                            <h6>{el.created_at}</h6>
                            <a href={el.url} target="_blank" rel="noopener noreferrer">Перейти..</a>
                        </div>
                    </div>
                    ))}
                    
                </div>
            </div>

        </div>
    )
}