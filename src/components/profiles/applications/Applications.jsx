import { useState } from 'react';
import { Header_Profile } from '../profile/header_profile/Header_Profile';
import css from '../profile/Profile.module.css';
import Sidebar from '../Sidebar';
import cs from "./Applications.module.css"
import bitcoin from "../../../img/svg/bitcoin.svg"
import tinkov from "../../../img/svg/tinkov.svg"
import pending from "../../../img/svg/pending.svg"
import error from "../../../img/svg/error.svg"
import succes from "../../../img/svg/succes.svg"
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";



const tabs = ['Все', 'Одобрены', 'Отклонены', 'Выполняется'];

export const data = [
    { id: '1237138', date: '25.05.2424 12:30', icons1: bitcoin, icons2: tinkov, amount: '0,1 BTC', receive: '57857 RUB', status: 'pending' },
    { id: '1237138', date: '25.05.2424 12:30', icons1: bitcoin, icons2: tinkov, amount: '0,1 BTC', receive: '57857 RUB', status: 'error' },
    { id: '1237138', date: '25.05.2424 12:30', icons1: bitcoin, icons2: tinkov, amount: '0,1 BTC', receive: '57857 RUB', status: 'error' },
    { id: '1237138', date: '25.05.2424 12:30', icons1: bitcoin, icons2: tinkov, amount: '0,1 BTC', receive: '57857 RUB', status: 'success' },
    { id: '1237138', date: '25.05.2424 12:30', icons1: bitcoin, icons2: tinkov, amount: '0,1 BTC', receive: '57857 RUB', status: 'pending' },
    { id: '1237138', date: '25.05.2424 12:30', icons1: bitcoin, icons2: tinkov, amount: '0,1 BTC', receive: '57857 RUB', status: 'success' },
];

const Aplications = () => {
    const [activeTab, setActiveTab] = useState('Все');

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
                    <h2>Мои заявки</h2>
                    <div className={css.profile_wrapper}>
                        <div className={css.tab_nav}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`${css.tab_button} ${activeTab === tab ? css.active : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className={css.solid}></div>

                        <div className={css.tab_content}>
                            {activeTab === 'Все' && (
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

                            )}
                            {activeTab === 'Одобрены' && (
                                <div className={cs.block}>
                                <div className={cs.title}>
                                    <h5>Номер</h5>
                                    <h5>Дата</h5>
                                    <h5>Отдача</h5>
                                    <h5>Получение</h5>
                                    <h5>Статус</h5>
                                </div>
                                {data.filter(el => el.status=== 'success').map((el, index) => (
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
                            )}
                            {activeTab === 'Отклонены' && (
                                <div className={cs.block}>
                                <div className={cs.title}>
                                    <h5>Номер</h5>
                                    <h5>Дата</h5>
                                    <h5>Отдача</h5>
                                    <h5>Получение</h5>
                                    <h5>Статус</h5>
                                </div>
                                {data.filter(el => el.status=== 'error').map((el, index) => (
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
                            )}
                            {activeTab === 'Выполняется' && (
                                <div className={cs.block}>
                                <div className={cs.title}>
                                    <h5>Номер</h5>
                                    <h5>Дата</h5>
                                    <h5>Отдача</h5>
                                    <h5>Получение</h5>
                                    <h5>Статус</h5>
                                </div>
                                {data.filter(el => el.status=== 'pending').map((el, index) => (
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
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Aplications;
