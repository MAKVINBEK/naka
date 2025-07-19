import css from "./Exchenger.module.css"
import bitcoin from "../../../img/svg/bitcoin.svg"
import sber from "../../../img/svg/sber.svg"
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import mir from "../../../img/svg//mir.svg"
import mc from "../../../img/svg//mc.svg"
import tinkov from "../../../img/svg/tinkov.svg"
import { Link } from "react-router-dom";

const fakeData = [
    { name: "Сбербанк", image: sber, surname: "RUB", currency: "RUB" },
    { name: "Visa/MC rub", image: mc, surname: "RUB", currency: "RUB" },
    { name: "Мир", image: mir, surname: "RUB", currency: "RUB" },
    { name: "Тинькофф", image: tinkov, surname: "RUB", currency: "RUB" },
    { name: "Bitcoin", image: bitcoin, surname: "BTC", currency: "Крипто" },
    { name: "Bitcoin", image: bitcoin, surname: "BTC", currency: "Крипто" },
    { name: "Visa/MC rub", image: mc, surname: "RUB", currency: "RUB" },
    { name: "Мир", image: mir, surname: "RUB", currency: "RUB" },
    { name: "Тинькофф", image: tinkov, surname: "RUB", currency: "RUB" },
    { name: "Bitcoin", image: bitcoin, surname: "BTC", currency: "Крипто" },
];

const filters = ["Все", "Крипто", "USD", "RUB"];




export const Exchanger_Two = () => {

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

                <div className={css.modal_overlay}>
                    <div className={css.blockOne}>
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

                        <Link to="/" className={css.submit} >Далее</Link>
                    </div>
                </div>

    )
}

