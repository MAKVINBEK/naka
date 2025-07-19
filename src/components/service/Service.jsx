import { Header } from "../header/Header"
import css from "./Service.module.css"
import image1 from "../../img/svg/about1.svg"
import image2 from "../../img/svg/about2.svg"
import image3 from "../../img/svg/about3.svg"
import image4 from "../../img/svg/about4.svg"

export const Service = () => {
    return (
        <div className={css.parent}>
            <Header />
            <div className="container">
                <div className={css.flex}>
                    <div className={css.text}>
                        <h2>О сервисе SafelyChange</h2>
                        <p className={css.title}>SafelyChange - электронный
                            обменный сервис. Любая обменная операция на сайте проводится в полностью автоматическом режиме, что гарантирует клиенту моментальное получение средств на электронный кошелек или карту</p>
                    </div>
                    <img className={css.none} src={image1} alt="image" />
                </div>

                <div className={css.top}>
                    <div className={css.top_block}>
                        <h4>24 498</h4>
                        <p className={css.title}>Отзывов на SafelyChange</p>
                    </div>
                    <div className={css.top_block}>
                        <h4>290</h4>
                        <p className={css.title}>Новых клиентов за сутки</p>
                    </div>
                    <div className={css.top_block}>
                        <h4>356</h4>
                        <p className={css.title}>Обменов за сутку</p>
                    </div>
                    <div className={css.top_block}>
                        <h4>123 ТЫС$</h4>
                        <p className={css.title}>Оборотов за сутку</p>
                    </div>
                </div>

                <div className={css.top_two}>
                    <h2 className={css.h2}>Почему выбирают нас</h2>
                    <div className={css.list}>
                        <div className={css.list_block}>
                            <h4>Продажа криптовалют</h4>
                            <p className={css.title}>Продавайте свои активы по выгодному курсу с мгновенным расчётом.GGG</p>
                        </div>
                        <div className={css.list_block}>
                            <h4>Продажа криптовалют</h4>
                            <p className={css.title}>Продавайте свои активы по выгодному курсу с мгновенным расчётом.GGG</p>
                        </div>
                        <div className={css.list_block}>
                            <h4>Продажа криптовалют</h4>
                            <p className={css.title}>Продавайте свои активы по выгодному курсу с мгновенным расчётом.GGG</p>
                        </div>
                        <div className={css.list_block}>
                            <h4>Продажа криптовалют</h4>
                            <p className={css.title}>Продавайте свои активы по выгодному курсу с мгновенным расчётом.GGG</p>
                        </div>
                    </div>
                </div>

                <div className={css.top_three}>
                    <h2 className={css.h2}>преимущества</h2>

                    <div className={css.flex}>
                        <img className={css.none} src={image2} alt="image" />
                        <div className={css.text}>
                            <div className={css.flexx}>
                            <img className={css.block} src={image2} alt="icon" />
                            <h4>Мгновенный вывод средств</h4>
                            </div>
                            <p className={css.title+" "+css.ttl}>SafelyChange обеспечивает быстрый вывод электронных валют на карты Visa и MasterCard. Операции выполняются автоматически, а клиенты получают СМС-уведомления о зачислении средств почти мгновенно. У нас собственный сертифицированный процессинг, соответствующий стандарту PCI DSS.</p>
                        </div>
                    </div>
                    <div className={css.flex}>
                        <div className={css.text}>
                            <div className={css.flexx}>
                            <img className={css.block} src={image3} alt="icon" />
                                <h4>Круглосуточная надежность</h4>
                            </div>
                            <p className={css.title+" "+css.ttl}>SafelyChange — стабильная и круглосуточная работа сервиса. Мы обрабатываем большой объём обменов без перебоев благодаря мощной инфраструктуре и облачным решениям Microsoft. Это позволяет нам обеспечивать надёжную работу 24/7.</p>
                        </div>
                        <img className={css.none} src={image3} alt="image" />
                    </div>
                    <div className={css.flex}>
                        <img className={css.none} src={image4} alt="image" />
                        <div className={css.text}>
                            <div className={css.flexx}>
                                <img className={css.block} src={image4} alt="icon" />
                                 <h4>Автоматизация и Выгода </h4> 
                            </div>
                            <p className={css.title+" "+css.ttl}>Лучшие курсы благодаря автоматизации. Наш торговый робот Niagara анализирует курсы конкурентов каждую секунду и автоматически предлагает клиентам самые выгодные условия. Это серьёзное преимущество SafelyChange перед ручными обменниками.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}