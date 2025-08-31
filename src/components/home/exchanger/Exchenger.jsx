// Exchenger.jsx
import React, { useEffect, useRef, useState } from "react";
import css from "./Exchenger.module.css";
import question from "../../../img/svg/question.svg";
import promocod from "../../../img/svg/promocod.svg";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useCurrencies,
  isSameCoin,
  parseInput,
  formatNumber,
} from "../../../hooks/useCurrencies";
import { CurrencyModal } from "./CurrencyModal";
import { toast } from "react-toastify";

export default function Exchenger() {
  const navigate = useNavigate();
  const token = React.useMemo(() => {
    try {
      return localStorage.getItem("access");
    } catch {
      return null;
    }
  }, []);

  const { flatList, loading, error, fetchByBase, refreshAll } =
    useCurrencies(token);

  const [vibor, setVibor] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Все");
  const [value, setValue] = useState("");

  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [pairRates, setPairRates] = useState({});

  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);

  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("0");

  const lastEditedRef = useRef("from");
  const autoComputeEnabledRef = useRef(false);
  const initializedRef = useRef(false);
  const mountedRef = useRef(true);

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  // ---------- Initialization ----------
  useEffect(() => {
    if (initializedRef.current) return;
    if (!flatList || flatList.length === 0) return;

    (async () => {
      try {
        const fresh = flatList.slice();
        setFromOptions(fresh);
        setToOptions(fresh);

        const initFrom = fresh[0] || null;
        setFromCurrency(initFrom);

        setFromAmount("1");
        setToAmount("0");

        if (initFrom?.code) {
          const { targetVariants = [], rates = {} } = await fetchByBase(initFrom.code);

          if (!mountedRef.current) return;

          setPairRates((prev) => ({ ...prev, ...(rates || {}) }));

          if (Array.isArray(targetVariants) && targetVariants.length) {
            setToOptions(targetVariants);
            const initialTo = targetVariants[0];
            setToCurrency(initialTo);

            // берем decimal у target (сколько знаков показывать при получении)
            const decimals = typeof initialTo?.decimal === "number" ? initialTo.decimal : 6;
            const rateKey = `${String(initFrom.code).toUpperCase()}_${String(initialTo.code).toUpperCase()}`;
            const r = rates && rates[rateKey] != null ? Number(rates[rateKey]) : null;
            if (r != null && !isNaN(r)) {
              setToAmount(formatNumber((parseInput("1") || 0) * r, decimals));
              autoComputeEnabledRef.current = true;
              lastEditedRef.current = "from";
            } else {
              setToAmount("Курс недоступен");
              autoComputeEnabledRef.current = false;
            }
          } else {
            // fallback
            setToOptions(fresh);
            const fallbackTo = fresh.find((c) => c.code !== initFrom.code) || fresh[1] || fresh[0] || null;
            setToCurrency(fallbackTo);
            setToAmount("Курс недоступен");
            autoComputeEnabledRef.current = false;
          }
        }

        initializedRef.current = true;
      } catch (err) {
        console.error("Exchenger init error:", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatList]);

  // ---------- helpers ----------
  const mergeRates = (newRates) => {
    setPairRates((prev) => ({ ...prev, ...(newRates || {}) }));
  };

  const getRate = (baseCode, quoteCode) => {
    if (!baseCode || !quoteCode) return null;
    const key = `${String(baseCode).toUpperCase()}_${String(quoteCode).toUpperCase()}`;
    if (pairRates && pairRates[key] != null) return Number(pairRates[key]);
    const invKey = `${String(quoteCode).toUpperCase()}_${String(baseCode).toUpperCase()}`;
    if (pairRates && pairRates[invKey] != null && Number(pairRates[invKey]) !== 0) {
      return 1 / Number(pairRates[invKey]);
    }
    return null;
  };

  const computeToFromFrom = (amountStr, baseCoin, quoteCoin) => {
    const amount = parseInput(amountStr);
    if (amount === null) return "";
    const rate = getRate(baseCoin?.code, quoteCoin?.code);
    if (rate == null) return "Курс недоступен";
    const decimals = typeof quoteCoin?.decimal === "number" ? quoteCoin.decimal : 6;
    return formatNumber(amount * rate, decimals);
  };

  const computeFromFromTo = (amountStr, baseCoin, quoteCoin) => {
    const amount = parseInput(amountStr);
    if (amount === null) return "";
    const rate = getRate(baseCoin?.code, quoteCoin?.code);
    if (rate == null || rate === 0) return "Курс недоступен";
    const decimals = typeof baseCoin?.decimal === "number" ? baseCoin.decimal : 6;
    return formatNumber(amount / rate, decimals);
  };

  // ---------- input handlers ----------
  const handleFromAmountChange = (val) => {
    lastEditedRef.current = "from";
    autoComputeEnabledRef.current = true;
    setFromAmount(val);
    setToAmount(computeToFromFrom(val, fromCurrency, toCurrency));
  };

  const handleToAmountChange = (val) => {
    lastEditedRef.current = "to";
    autoComputeEnabledRef.current = true;
    setToAmount(val);
    setFromAmount(computeFromFromTo(val, fromCurrency, toCurrency));
  };

  // ---------- selection handler ----------
  const handleSelect = async (el) => {
    try {
      if (selectedField === "from") {
        setFromCurrency(el);

        const { targetVariants = [], rates = {} } = await fetchByBase(el.code);
        mergeRates(rates);

        if (Array.isArray(targetVariants) && targetVariants.length) {
          setToOptions(targetVariants);
          const chosenTo = targetVariants[0];
          setToCurrency((prev) => {
            const exists = prev && targetVariants.some((t) => isSameCoin(t, prev));
            return exists ? prev : chosenTo;
          });

          const decimals = typeof (toCurrency || chosenTo)?.decimal === "number"
            ? (toCurrency || chosenTo).decimal
            : (chosenTo?.decimal ?? 6);

          const rateKey = `${String(el.code).toUpperCase()}_${String(chosenTo.code).toUpperCase()}`;
          const r = rates && rates[rateKey] != null ? Number(rates[rateKey]) : null;

          if (autoComputeEnabledRef.current) {
            if (lastEditedRef.current === "from") {
              setToAmount(computeToFromFrom(fromAmount, el, toCurrency || chosenTo));
            } else {
              setFromAmount(computeFromFromTo(toAmount, el, toCurrency || chosenTo));
            }
          } else if (r != null && !isNaN(r)) {
            setToAmount(formatNumber((parseInput(fromAmount) || 0) * r, decimals));
            autoComputeEnabledRef.current = true;
            lastEditedRef.current = "from";
          } else {
            setToAmount("Курс недоступен");
          }
        } else {
          setToOptions(fromOptions.length ? fromOptions : flatList);
          const fallbackTo = (fromOptions.length ? fromOptions : flatList).find((c) => c.code !== el.code) || null;
          setToCurrency(fallbackTo);
          setToAmount("Курс недоступен");
        }
      } else if (selectedField === "to") {
        setToCurrency(el);
        if (autoComputeEnabledRef.current) {
          if (lastEditedRef.current === "from") {
            setToAmount(computeToFromFrom(fromAmount, fromCurrency, el));
          } else {
            setFromAmount(computeFromFromTo(toAmount, fromCurrency, el));
          }
        } else {
          const r = getRate(fromCurrency?.code, el?.code);
          const decimals = typeof el?.decimal === "number" ? el.decimal : 6;
          if (r != null) {
            setToAmount(formatNumber((parseInput(fromAmount) || 0) * r, decimals));
            autoComputeEnabledRef.current = true;
            lastEditedRef.current = "from";
          } else {
            setToAmount("Курс недоступен");
          }
        }
      }
    } catch (err) {
      console.error("handleSelect:", err);
    } finally {
      setVibor(false);
    }
  };

  // fetch rates for caching when fromCurrency changes (non-blocking)
  useEffect(() => {
    if (!fromCurrency?.code) return;
    let active = true;
    (async () => {
      try {
        const { rates = {} } = await fetchByBase(fromCurrency.code);
        if (!active || !mountedRef.current) return;
        mergeRates(rates);
      } catch (err) {
        // ignore
      }
    })();
    return () => {
      active = false;
    };
  }, [fromCurrency?.code, fetchByBase]);

  // auto-recalc when rates or currencies change
  useEffect(() => {
    if (!autoComputeEnabledRef.current) return;
    if (lastEditedRef.current === "from") {
      if (parseInput(fromAmount) != null) {
        setToAmount(computeToFromFrom(fromAmount, fromCurrency, toCurrency));
      }
    } else {
      if (parseInput(toAmount) != null) {
        setFromAmount(computeFromFromTo(toAmount, fromCurrency, toCurrency));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairRates, fromCurrency?.code, toCurrency?.code]);

  const modalList = selectedField === "from" ? fromOptions : toOptions;

  // ---------- create application & navigate ----------
  const handleCreateApplicationAndNext = async () => {
    if (!fromCurrency || !toCurrency) {
      toast.error("Не выбраны валюты.");
      return;
    }
    const amtFrom = parseInput(fromAmount);
    const amtTo = parseInput(toAmount);
    const currentRate = getRate(fromCurrency?.code, toCurrency?.code);

    if (amtFrom == null || amtTo == null || !isFinite(amtFrom) || !isFinite(amtTo)) {
      toast.error("Неверная сумма.");
      return;
    }

    const payload = {
      type_of_change:"2",
      currency_from: String(fromCurrency.code),
      currency_to: String(toCurrency.code),
      amount_from: String(amtFrom),
      amount_to: String(amtTo),
      rate: String(currentRate ?? ""),
    };

    if (!token) {
      navigate("/login", { state: { returnTo: "create_app", payload } });
      return;
    }

    setBusy(true);
    try {
      const headers = token ? { Authorization: `Token ${token}` } : {};
      const res = await axios.post("https://nako.navisdevs.ru/api/v4/main-applications/", payload, { headers });
      navigate("/payment_step", { state: { application: res.data } });
    } catch (err) {
      console.error("create application error:", err);
      toast.error("Ошибка создания заявки. Попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
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
                <div className={css.icon}>
                  {fromCurrency?.image ? <img src={fromCurrency.image} alt={`${fromCurrency.surname} icon`} /> : <div className={css.placeholder}></div>}
                </div>
                <div className={css.tip_title}>
                  <h4>{fromCurrency?.surname || "--"}</h4>
                  <h6>{fromCurrency?.name || ""}</h6>
                </div>
                <div className={css.tip_coin}>
                  <button aria-label="Выбрать валюту"><IoIosArrowDown size={24} /></button>
                  <div>{fromCurrency?.networkCode || ""}</div>
                </div>
              </div>
            </div>
            <input
              className={css.input_sum}
              type="text"
              placeholder="Введите сумму"
              style={{ direction: "rtl", textAlign: "right" }}
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              aria-label="Сумма отдаете"
              required
            />
          </div>

          <div className={css.block_exchange}>
            <div className={css.flexx} onClick={() => { setVibor(true); setSelectedField("to"); }}>
              <p className={css.title_exchange}>Получаете</p>
              <div className={css.tip_contain}>
                <div className={css.icon}>
                  {toCurrency?.image ? <img src={toCurrency.image} alt={`${toCurrency.surname} icon`} /> : <div className={css.placeholder}></div>}
                </div>
                <div className={css.tip_title}>
                  <h4>{toCurrency?.surname || "--"}</h4>
                  <h6>{toCurrency?.name || ""}</h6>
                </div>
                <div className={css.tip_coin}>
                  <button aria-label="Выбрать валюту"><IoIosArrowDown size={24} /></button>
                  <div>{toCurrency?.networkCode || ""}</div>
                </div>
              </div>
            </div>
            <input
              className={`${css.input_sum} ${css.int_color}`}
              type="text"
              placeholder="0"
              style={{ direction: "rtl", textAlign: "right" }}
              value={toAmount}
              onChange={(e) => handleToAmountChange(e.target.value)}
              aria-label="Сумма получаете"
            />
          </div>
        </div>

        <label className={css.checkbox_wrapper}>
          <input type="checkbox" className={css.hidden_checkbox} required />
          <span className={css.custom_checkbox}>
            <svg className={css.check_icon} viewBox="0 0 24 24">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </span>
          <span className={css.checkbox_text}>
            Я согласен с <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a> и <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">пользовательским соглашением</a>
          </span>
        </label>

        <button
          onClick={handleCreateApplicationAndNext}
          className={css.submit}
          disabled={busy}
          aria-disabled={busy}
        >
          {busy ? <div className="spinner"></div> : "Далее"}
        </button>

        <div className={css.promo}>
          <img src={promocod} alt="icon" />
          <p>У меня есть промокод</p>
        </div>

      </div>

      <CurrencyModal
        visible={vibor}
        onClose={() => setVibor(false)}
        list={modalList}
        onSelect={handleSelect}
        value={value}
        onChange={setValue}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
}
