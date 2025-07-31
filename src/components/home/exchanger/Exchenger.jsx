import css from "./Exchenger.module.css"
import question from "../../../img/svg/question.svg"
import bitcoin from "../../../img/svg/bitcoin.svg"
import BNB from "../../../img/svg/Buy BNB.svg"
import Chainlink from "../../../img/svg/Buy Chainlink.svg"
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import promocod from "../../../img/svg/promocod.svg"
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const fakeData = [
    { name: "Bitcoin", image: bitcoin, surname: "BTC", currency: "Крипто" },
    { name: "BNB", image: BNB, surname: "BNB", currency: "Крипто" },
    { name: "Chainlink", image: Chainlink, surname: "Chainlink", currency: "Крипто" },
];

const filters = ["Все", "Крипто", "USD"];

export const Exchenger = () => {
    const [vibor,setVibor]= useState(false)
    const [activeFilter, setActiveFilter] = useState("Все");
    const [value, setValue] = useState("");

    const filteredData =
        activeFilter === "Все"
            ? fakeData
            : fakeData.filter((item) => item.currency === activeFilter);


    const filteredCountries = filteredData.filter((country) =>
        `${country.name} ${country.surname}`.toLowerCase().includes(value.toLowerCase())
    );
    return (
        <div className={`${css.parent} container`}>
            <div className={css.content}>
                <div className={css.flex}>
                    <p>выберите валютную пару</p>
                    <img src={question} alt="icon" />
                </div>
                <div className={css.stages}>
                    <div className={`${css.stage} ${css.active_stage}`}></div>
                    <div className={css.stage}></div>
                    <div className={css.stage}></div>
                    <div className={css.stage}></div>
                </div>
                <div className={css.contain_exchange}>
                    <div className={css.block_exchange}>
                        <div className={css.flexx}>
                            <p className={css.title_exchange}>Отдаете</p>
                            <div className={css.tip_contain}>
                                <div className={css.icon}><img src={bitcoin} alt="" /></div>
                                <div className={css.tip_title}>
                                    <h4>BTC</h4>
                                    <h6>Bitcoin</h6>
                                </div>
                                <div className={css.tip_coin}>
                                <button onClick={() => setVibor(true)}><IoIosArrowDown size={24} /></button>
                                    <div>BTC</div>
                                </div>
                            </div>
                        </div>
                        <h5>0.1</h5>
                    </div>
                    <div className={css.block_exchange}>
                        <div className={css.flexx}>
                            <p className={css.title_exchange}>Отдаете</p>
                            <div className={css.tip_contain}>
                                <div className={css.icon}><img src={BNB} alt="" /></div>
                                <div className={css.tip_title}>
                                    <h4>BNB </h4>
                                    <h6>BNB</h6>
                                </div>
                                <div className={css.tip_coin}>
                                    <button onClick={() => setVibor(true)}><IoIosArrowDown size={24} /></button>
                                    <div>BNB </div>
                                </div>
                            </div>
                        </div>
                        <h5>2356.00</h5>
                    </div>
                </div>
                <div className={css.checkbulian}>
                    <label className={css.switch}>
                        <input type="checkbox" />
                        <span className={css.slider}></span>
                    </label>
                    <p>Фиксированый курс</p>
                </div>
                <label className={css.checkbox_wrapper}>
                    <input type="checkbox" className={css.hidden_checkbox} required />
                    <span className={css.custom_checkbox}>
                        <svg className={css.check_icon} viewBox="0 0 24 24">
                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" fill="none" />
                        </svg>
                    </span>
                    <span className={css.checkbox_text}>
                        Я согласен с{" "}
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Условиями базовой проверки<br />
                            аккаунта AML, KYT
                        </a>
                    </span>
                </label>
                <Link to="/payment_step" className={css.submit}>Далее</Link>

                <div className={css.promo}>
                    <img src={promocod} alt="icon" />
                    <p>У меня есть промокод</p>
                </div>
            </div>
            {vibor && ReactDOM.createPortal(
                    <div className={css.modal_overlay} onClick={() => setVibor(false)}>
                                        <div className={css.blockOne} onClick={(e) => e.stopPropagation()}>
                                            <div className={css.coin}>
                                                <input
                                                    type="text"
                                                    placeholder="Выберите валюту"
                                                    value={value}
                                                    onChange={(event) => setValue(event.target.value)}
                                                />
                                                <IoSearch size={28} />
                                            </div>
                    
                                            <div className={css.menu}>
                                                {filters.map((filter) => (
                                                    <button
                                                        key={filter}
                                                        className={`${css.click} ${activeFilter === filter ? css.activeClick : ""}`}
                                                        onClick={() => setActiveFilter(filter)}
                                                    >
                                                        {filter}
                                                    </button>
                                                ))}
                                            </div>
                    
                                            <div className={css.menuList}>
                                                {filteredCountries.map((el, index) => (
                                                    <div key={index} className={css.block}>
                                                        <div className={css.name}>
                                                            <img src={el.image} alt="logo" />
                                                            <h4>{el.name}</h4>
                                                        </div>
                                                        <h5>{el.surname}</h5>
                                                    </div>
                                                ))}
                                            </div>
                    
                                            <button className={css.submit} onClick={()=> setVibor(false)}>Далее</button>
                                        </div>
                                    </div>,
                    document.body
                  )}
        </div>
    )
}

