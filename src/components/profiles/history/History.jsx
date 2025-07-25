import { Header_Profile } from '../profile/header_profile/Header_Profile';
import css from '../profile/Profile.module.css';
import Sidebar from '../Sidebar';
import cs from "../applications/Applications.module.css"
import pending from "../../../img/svg/pending.svg"
import error from "../../../img/svg/error.svg"
import succes from "../../../img/svg/succes.svg"
import { IoIosArrowRoundForward } from "react-icons/io";
import { data } from '../applications/Applications';
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';

const History = () => {

    const renderStatus = (status) => {
        if (status === 'success') return succes;
        if (status === 'error') return error;
        return pending;
    };
    const [close,setClose]= useState(false)

    return (
        <div className={css.parent}>
            <Header_Profile />
            <div className={css.flex}>
                <Sidebar close={close} setClose={setClose}/>
                <div className={css.profile}>
                    <button className={css.menu_profile} onClick={()=>setClose(true)}><IoIosArrowBack /></button>
                    <h2 className={cs.mb}>История операций</h2>
                    <div className={cs.block}>
                        <div className={cs.title}>
                            <h5>Номер</h5>
                            <h5>Дата</h5>
                            <h5>Отдача</h5>
                            <h5>Получение</h5>
                            <h5>Статус</h5>
                        </div>
                        {data.map((el, index) => (
                            <div key={index} className={cs.row}>
                                <div className={cs.between}><h5>Номер</h5><p>{el.id}</p></div>
                                <div className={cs.between}><h5>Дата</h5> <p>{el.date}</p></div>

                                <span><IoIosArrowRoundForward /></span>
                                <div className={cs.between}>
                                    <h5>Отдача</h5>
                                    <div className={cs.tip}>
                                        <img src={el.icons1} alt="icon" />
                                        <span>{el.amount}</span>
                                    </div>
                                </div>
                                <div className={cs.between}>
                                    <h5>Получение</h5>
                                    <div className={cs.tip}>
                                        <img src={el.icons2} alt="icon" />
                                        <span>{el.receive}</span>
                                    </div>
                                </div>
                                <div className={cs.between}>
                                    <h5>Статус</h5>
                                    <img src={renderStatus(el.status)} alt="status" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
