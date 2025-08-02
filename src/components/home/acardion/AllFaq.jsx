import React, { useEffect, useState } from "react";
import Accordion from "./Acardion";
import css from "./Acardion.module.css";
import { Header } from "../../header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { get } from "../../../api/ApiRoutes";


export const Faq = () => {
  const navigate = useNavigate()
  const [data,setData]= useState([])
    
        useEffect(()=>{
            const response = async ()=>{
                try{
                    const res = await get.faq();
                    setData(res)
                }catch(err){
                    console.log(err);
                }
            }
            response();
        },[])
  return (
    <div>
        <Header/>
    <div className={`${css.parents} container`}>
    <div onClick={()=>{navigate(-1);scrollToTop()}} className={css.next}><IoIosArrowBack /></div>
            <h2 className={css.name}>Часто задаваемые вопросы</h2>
            {data.map((el)=>(
                <Accordion key={el.id} title={el.question} content={el.answer}/>
            ))}
    </div>
    </div>
  );
};

