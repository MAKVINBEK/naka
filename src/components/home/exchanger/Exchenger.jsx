import css from "./Exchenger.module.css";
import question from "../../../img/svg/question.svg";
import promocod from "../../../img/svg/promocod.svg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const filters = ["Все", "Крипто", "USD"];

// --- REAL API endpoint you gave ---
const API_PAIRS = "https://nako.navisdevs.ru/api/v4/currencies/";

export default function Exchenger() {
  const [vibor, setVibor] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [value, setValue] = useState("");
  const token = localStorage.getItem("access");

  // Data from API (no statics)
  const [coins, setCoins] = useState([]);
  const [pairRates, setPairRates] = useState({}); // { "BTC_USDT": 87000, ... }
  const [pairsRaw, setPairsRaw] = useState([]);

  // UI state
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [fromAmount, setFromAmount] = useState("100");
  const [toAmount, setToAmount] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const source = axios.CancelToken.source();

    const fetchPairs = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(API_PAIRS, { headers, cancelToken: source.token });
        const data = res?.data;

        const pairs = Array.isArray(data?.pairs) ? data.pairs : [];

        // Normalize pairs map
        const rates = {};
        pairs.forEach((p) => {
          if (!p || !p.base_currency || !p.quote_currency) return;
          const base = p.base_currency.code;
          const quote = p.quote_currency.code;
          const key = `${base}_${quote}`;
          const rate = Number(p.rate);
          if (!isNaN(rate)) rates[key] = rate;
        });

        // Build unique coins array from pairs (use only backend-provided data)
        const coinsMap = {};
        pairs.forEach((p) => {
          const b = p.base_currency;
          const q = p.quote_currency;
          if (b && b.code) {
            coinsMap[b.code] = {
              name: b.name || b.code,
              surname: b.code,
              image: b.icon || null,
              currency: normalizeType(b.isFiat ? 'USD' : 'Крипто'),
            };
          }
          if (q && q.code) {
            coinsMap[q.code] = {
              name: q.name || q.code,
              surname: q.code,
              image: q.icon || null,
              currency: normalizeType(q.isFiat ? 'USD' : 'Крипто'),
            };
          }
        });

        const coinsArr = Object.values(coinsMap);

        if (mounted.current) {
          setPairRates(rates);
          setPairsRaw(pairs);
          if (coinsArr.length > 0) {
            setCoins(coinsArr);
            // set defaults: first two coins from backend (if no previous selection)
            setFromCurrency((prev) => prev && coinsArr.find(c => c.surname === prev.surname) ? prev : coinsArr[0]);
            setToCurrency((prev) => {
              if (prev && coinsArr.find(c => c.surname === prev.surname)) return prev;
              return coinsArr[1] || coinsArr[0];
            });
          }
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Ошибка при загрузке пар валют:", err);
          setError("Не удалось загрузить данные с сервера.");
        }
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    fetchPairs();

    return () => {
      mounted.current = false;
      source.cancel("Component unmounted");
    };
  }, []);

  // пересчитываем toAmount при изменении суммы/валют/пар
  useEffect(() => {
    if (!fromAmount || isNaN(fromAmount)) {
      setToAmount("");
      return;
    }

    const rate = getExchangeRate(fromCurrency?.surname, toCurrency?.surname, pairRates);

    if (rate) {
      const result = parseFloat(fromAmount) * rate;
      setToAmount(formatNumber(result, 6));
    } else {
      setToAmount("Курс недоступен");
    }
  }, [fromAmount, fromCurrency, toCurrency, pairRates]);

  // фильтрация по типу
  const filteredData =
    activeFilter === "Все"
      ? coins
      : coins.filter((item) => (item.currency || "Крипто").toLowerCase() ===
          (activeFilter === "USD" ? "usd" : "крипто"));

  const filteredCountries = filteredData
    .filter((country) =>
      `${country.name} ${country.surname}`.toLowerCase().includes(value.toLowerCase())
    )
    .filter((country) => {
      if (selectedField === "from") {
        return country.surname !== toCurrency?.surname;
      } else if (selectedField === "to") {
        return country.surname !== fromCurrency?.surname;
      }
      return true;
    });

  const handleSelect = (el) => {
    if (selectedField === "from") {
      setFromCurrency(el);
    } else if (selectedField === "to") {
      setToCurrency(el);
    }
    setVibor(false);
  };

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
         </div>

        <div className={css.contain_exchange}>
          <div className={css.block_exchange}>
            <div className={css.flexx} onClick={() => { setVibor(true); setSelectedField("from"); }}>
              <p className={css.title_exchange}>Отдаете</p>
              <div className={css.tip_contain}>
                <div className={css.icon}>{fromCurrency?.image ? <img src={fromCurrency.image} alt="" /> : <div className={css.placeholder}></div>}</div>
                <div className={css.tip_title}>
                  <h4>{fromCurrency?.surname || "--"}</h4>
                  <h6>{fromCurrency?.name || ""}</h6>
                </div>
                <div className={css.tip_coin}>
                  <button>
                    <IoIosArrowDown size={24} />
                  </button>
                  <div>{fromCurrency?.surname || ""}</div>
                </div>
              </div>
            </div>
            <input
              className={css.input_sum}
              type="text"
              placeholder="Введите сумму"
              style={{ direction: 'rtl', textAlign: 'right' }}
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
            />

          </div>

          <div className={css.block_exchange}>
            <div className={css.flexx}  onClick={() => { setVibor(true); setSelectedField("to"); }}>
              <p className={css.title_exchange}>Получаете</p>
              <div className={css.tip_contain}>
                <div className={css.icon}>{toCurrency?.image ? <img src={toCurrency.image} alt="" /> : <div className={css.placeholder}></div>}</div>
                <div className={css.tip_title}>
                  <h4>{toCurrency?.surname || "--"}</h4>
                  <h6>{toCurrency?.name || ""}</h6>
                </div>
                <div className={css.tip_coin}>
                  <button>
                    <IoIosArrowDown size={24} />
                  </button>
                  <div>{toCurrency?.surname || ""}</div>
                </div>
              </div>
            </div>
            <input
              className={`${css.input_sum} ${css.int_color}`}
              type="text"
              placeholder="0"
              style={{ direction: 'rtl', textAlign: 'right' }}
              value={toAmount}
              readOnly
            />
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
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              политикой конфиденциальности
            </a>{" "}
            и{" "}
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">
              пользовательским соглашением
            </a>
          </span>
        </label>

        <Link to={token ? "/payment_step" : "/login"} className={css.submit}>Далее</Link>

        <div className={css.promo}>
          <img src={promocod} alt="icon" />
          <p>У меня есть промокод</p>
        </div>

        {/* Лоадер / ошибка (не ломает верстку) */}
        {loading && <div className={css.loading}>Загрузка...</div>}
        {error && <div className={css.error}>{error}</div>}
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
                <div key={index} className={css.block} onClick={() => handleSelect(el)}>
                  <div className={css.name}>
                    {el.image ? <img src={el.image} alt="logo" /> : <div className={css.placeholder}></div>}
                    <h4>{el.name}</h4>
                  </div>
                  <h5>{el.surname}</h5>
                </div>
              ))}
            </div>

            <button className={css.submit} onClick={() => setVibor(false)}>Закрыть</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// format number to N decimals, then trim trailing zeros (keeps up to 6 decimals but removes trailing zeros)
function formatNumber(value, decimals = 6) {
  if (value == null || value === '' || !isFinite(value)) return String(value);
  const s = Number(value).toFixed(decimals);
  // remove trailing zeros and optional dot
  return s.replace(/\.?0+$/, '');
}


// ----------------- helper functions -----------------

function getExchangeRate(from, to, rates) {
  if (!from || !to) return null;
  if (from === to) return 1;
  const direct = rates?.[`${from}_${to}`];
  if (direct) return Number(direct);
  const inverse = rates?.[`${to}_${from}`];
  if (inverse) {
    const num = Number(inverse);
    if (!isNaN(num) && num !== 0) return 1 / num;
  }

  // try via USDT as bridge (USDT ~= USD)
  const fromToUSDT = getDirectOrInverse(rates, from, 'USDT');
  const toToUSDT = getDirectOrInverse(rates, to, 'USDT');
  if (fromToUSDT && toToUSDT) return fromToUSDT / toToUSDT;

  return null;
}

function getDirectOrInverse(rates, a, b) {
  const d = rates?.[`${a}_${b}`];
  if (d) return Number(d);
  const inv = rates?.[`${b}_${a}`];
  if (inv) {
    const n = Number(inv);
    if (!isNaN(n) && n !== 0) return 1 / n;
  }
  return null;
}

function normalizeType(type) {
  if (!type) return 'Крипто';
  const t = String(type).toLowerCase();
  if (t.includes('usd') || t.includes('fiat')) return 'USD';
  if (t.includes('crypto') || t.includes('крипто')) return 'Крипто';
  return type;
}
