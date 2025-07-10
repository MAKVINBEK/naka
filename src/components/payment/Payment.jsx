import React, { useState, useEffect } from "react";
import css from "./Payment.module.css";
import { PiWarningBold } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LuCheck } from "react-icons/lu";
import bitcoin from "../../img/svg/Bitcoin.svg"
import sber from "../../img/svg/sber.svg"
import { Link } from "react-router-dom";
import Modal from "../../assets/Modal";
import { Header } from "../header/Header";
import ellipse from "../../img/ellipse.png"



export const PaymentStep = () => {
    const [unableToPay, setUnableToPay] = useState(false);
    const [successfully, setSuccessfully] = useState(false);
    const TOTAL_TIME = 20 * 60;
    const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        if (isTimeUp) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsTimeUp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimeUp]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = (secondsLeft / TOTAL_TIME) * 100;

    return (
        <div className="bggradient">
            <Header/>
            <img src={ellipse} className="absolutebg"/>
        <div className={`${css.parent} container `}>
            <div className={css.content}>
                <div className={css.block_container}>
                    <div className={css.block_one}>
                        <div className={css.warning}>
                            <span><PiWarningBold size={24} /></span>
                            <p>Если обмен будет выполнен другим плательщиком, обмен не будет завершен. Возврат средств будет возможен только после обращения в поддержку сервиса.</p>
                        </div>
                        <h6>Сделайте перевод одним платежом в точности до копеек</h6>
                        <p>Если вы отправите другую сумму, мы не сможем завершить обмен. Возврат средств будет затруднен.</p>
                        <h6>После того, как Вы выполните перевод обязательно нажмите “Я оплатил”</h6>
                        <p>Других действий от Вас не потребуется. Обмен будет завершен автоматически, как только мы увидим платеж.</p>
                    </div>
                    <div className={css.block_two}>
                        <h3>Заявка №5398053</h3>
                        
                        <div className={css.data}>
                            <div>
                                <p>Дата:</p>
                                <h5>20.06.2024</h5>
                            </div>
                            <div>
                                <p>Обмен по курсу:</p>
                                <h5>1 BTC = 5785785.6841 руб </h5>
                            </div>
                            <div>
                                <p>Номер карты:</p>
                                <h5>1111222233334444</h5>
                            </div>
                            <div>
                                <p>ФИО:</p>
                                <h5>Иван Петров</h5>
                            </div>
                        </div>
                        <div className={css.last_change}>
                            <div className={css.details}>
                                <div className={css.contain_many}>
                                    <h5>5000 ₿</h5>
                                    <div className={css.many}>
                                        <div><img src={bitcoin} alt="" /></div>
                                        Биткоин ₿
                                    </div>
                                </div>
                                <div className={css.arrow}><IoIosArrowRoundForward size={34} /></div>
                                <div className={css.contain_many}>
                                    <h5> 398.12 ₮</h5>
                                    <div className={css.many}>
                                        <div><img src={sber} alt="" /></div>
                                        Сбербанк ₽
                                    </div>
                                </div>
                            </div>
                            
                            <div className={css.commission}>
                                <p>Ожидаемая комиссия</p>
                                <span>12</span>
                            </div>
                        </div>
                        <div className={css.timer_block}>
                                <span className={css.count}>{formatTime(secondsLeft)}</span>
                            <p>Оплатите заявку до окончания этого времени</p>
                        </div>
                        <button className={css.submit} onClick={()=> setSuccessfully(true)}>Я оплатил</button>
                        <button className={css.cant} onClick={()=> setUnableToPay(true)}>Не получается оплатить</button>
                    </div>

                </div>
            </div>
            {isTimeUp && (
                <Modal onClose={() => setIsTimeUp(false)}>
                    <div className={css.close}><IoCloseOutline /></div>
                    <h3 className={css.close_number}>Перевод №5398053 <br />отменен</h3>
                    <p className={css.close_text}>Если оплата была произведена после
                        отмены операции, или наш сервис не видит
                        оплату по другим причинам, не переживайте,
                        мы найдем ваш платеж в ручном режиме</p>
                    <Link to="/payment_step" className={css.close_submit} onClick={TOTAL_TIME}>Попробовать еще раз</Link>
                </Modal>
            )}
            {unableToPay && (
                <Modal onClose={() => setUnableToPay(false)}>
                    <h3 className={css.close_number}>Не получается оплатить</h3>
                    <p className={css.close_text}>Иногда по независящим от
                        нас причинам, мы не можем принять платеж. Это может
                        быть связано как с отклонением операции со стороны
                        банка, так и с внешними техническими ошибками. <br /><br />
                        Вы можете повторить операцию через некоторое время, использовать другую карту или выбрать другое направление для обмена.</p>
                    <button className={css.close_submit} onClick={() => setUnableToPay(false)}>Понятно</button>
                </Modal>
            )}
            {successfully && (
                <Modal onClose={() => setSuccessfully(false)}>
                    <div className={`${css.close} ${css.succes}`}><LuCheck /></div>
                    <h3 className={css.close_number}>Перевод №5398053 <br /> успешно выполнен!</h3>
                    <p className={css.close_text}>Я пока не знаю какой текст тут будет</p>
                    <Link to="/personal_account" className={css.close_submit} >Перейти в профиль</Link>
                </Modal>
            )}

        </div>
        </div>
    )
}
