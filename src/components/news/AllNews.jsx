import css from "./News.module.css"
import { Link } from "react-router-dom";
import { Header } from "../header/Header";
import { useEffect, useState } from "react";
import { get } from "../../api/ApiRoutes";




export const AllNews = () => {

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
        <div className={`${css.Allparent}`}>
            <Header/>
            <div className="container">
                <h2 className={css.h2}>Все новости</h2>
            <div className={css.list}>
                {data.map((el)=>(
                    <Link to={`/news/${el.slug}`} key={el.id} className={css.block}>
                    <div  className={css.image}><img src={el.image} alt="news" /></div>
                <div className={css.titles}>
                    <h3>{el.title}</h3>
                    <p>{el.content_q}</p>
                        <div className={css.flex}>
                            <h6>{el.created_at}</h6>
                        </div>
                </div>
                </Link>
                ))}
            </div>
            </div>
        </div>
    )
}