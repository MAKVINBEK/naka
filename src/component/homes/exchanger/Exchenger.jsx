import css from "./Exchenger.module.css"
import question from "../../../img/svg/question.svg"
import bitcoin from "../../../img/svg/bitcoin.svg"
import sber from "../../../img/svg/sber.svg"
import { IoIosArrowDown } from "react-icons/io";
import promocod from "../../../img/svg/promocod.svg"
import { Link } from "react-router-dom";

export const Exchenger = () => {
    return (
        <div className={`${css.parent} container`}>
            <div className={css.content}>
                <div className={css.flex}>
                    <p>выберите валютную пару</p>
                    <img src={question} alt="" />
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
                                    <Link to="/exchanger002"><IoIosArrowDown size={24} /></Link>
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
                                <div className={css.icon}><img src={sber} alt="" /></div>
                                <div className={css.tip_title}>
                                    <h4>Сбер </h4>
                                    <h6>Bitcoin</h6>
                                </div>
                                <div className={css.tip_coin}>
                                    <Link to='/exchanger002'><IoIosArrowDown size={24} /></Link>
                                    <div>Сбер </div>
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
                        <input type="checkbox" className={css.hidden_checkbox} required/>
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
                    <button className={css.submit}>Далее</button>

                    <div className={css.promo}>
                        <img src={promocod} alt="icon" />
                        <p>У меня есть промокод</p>
                    </div>
            </div>
        </div>
    )
}

