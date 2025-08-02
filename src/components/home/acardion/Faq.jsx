import React, { useEffect, useState } from "react";
import Accordion from "./Acardion";
import css from "./Acardion.module.css";
import { get } from "../../../api/ApiRoutes";

export const AcardionBlock = () => {
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
    <div className={`${css.parent} container`}>
            <h2 className={css.name}>Ответы на часто задаваемые вопросы</h2>
            {data.map((el)=>(
                <Accordion key={el.id} title={el.question} content={el.answer}/>
            ))}
    </div>
  );
};

