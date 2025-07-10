import React from "react";
import Accordion from "./Acardion";
import css from "./Acardion.module.css";
import { accordionData } from "./Faq";
import { Header } from "../../header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


export const Faq = () => {
  const navigate = useNavigate()
  return (
    <div>
        <Header/>
    <div className={`${css.parents} container`}>
    <div onClick={()=>{navigate(-1);scrollToTop()}} className={css.next}><IoIosArrowBack /></div>
            <h2 className={css.name}>Часто задаваемые вопросы</h2>
            {accordionData.map((el,index)=>(
                <Accordion key={index} title={el.title} content={el.content}/>
            ))}
    </div>
    </div>
  );
};

