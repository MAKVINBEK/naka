import css from "./News.module.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../../api/ApiRoutes";


export const News = () => {
    const [data,setData]= useState([])

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


    return (
        <div className={css.parent}>
            <div className="container">
                <h2 className={css.h2}>новости</h2>
            <div className={css.list}>
                {data.map((el,index) => (
                    <div key={index} className={css.block}>
                        <Link to={`/news/${el.slug}`} className={css.image}> <img src={el.image} alt="photo" /></Link>
                        <div className={css.titles}>
                            <Link to={`/news/${el.slug}`}><h3>{el.title}</h3></Link>
                            <p>{el.content_q}</p>
                            <div className={css.flex}>
                                <h6>{el.created_at}</h6>
                                <a href={el.url} target="_blank" rel="noopener noreferrer">Перейти..</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}