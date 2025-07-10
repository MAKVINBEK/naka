import React, { useState } from "react";
import css from "./Acardion.module.css";
import { IoIosArrowDown } from "react-icons/io";


const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
       <div className={`${css.accordion}`} onClick={toggleAccordion}>
        <div className={css.title}>
            <p>{title}</p>
            <button className={`${css.click} ${isOpen?css.rotate:""}`}  onClick={toggleAccordion}><IoIosArrowDown size={24}/></button>
        </div>
      
      <div className={`${css.content} ${isOpen ? css.open : ""}`}>
        {content}
      </div>
    </div>
   
  );
};

export default Accordion;