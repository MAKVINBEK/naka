import React, { useEffect, useMemo, useState } from "react";
import css from "./Payment.module.css";
import { PiWarningFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LuCheck } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../assets/Modal";
import { Header } from "../header/Header";
import ellipse from "../../img/ellipse.png";
import question from "../../img/svg/question.svg";
import axios from "axios";

export const PaymentStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const applicationFromState = state.application ?? null;

  const fallbackAppFromState = (state && (state.fromAmount || state.toAmount || state.fromCurrency || state.toCurrency))
    ? {
        id: state.id ?? null,
        user: state.user ?? null,
        currency_from: (state.fromCurrency && (state.fromCurrency.code || state.fromCurrency)) || state.currency_from || null,
        currency_to: (state.toCurrency && (state.toCurrency.code || state.toCurrency)) || state.currency_to || null,
        application_id: state.application_id ?? state.appId ?? null,
        amount_from: state.fromAmount != null ? String(state.fromAmount) : (state.amount_from ?? null),
        amount_to: state.toAmount != null ? String(state.toAmount) : (state.amount_to ?? null),
        rate: state.rate != null ? String(state.rate) : (state.rate ?? null),
        fee: state.fee ?? null,
        created_at: state.createdAt ?? state.created_at ?? null,
      }
    : null;

  const application = applicationFromState || fallbackAppFromState;

  useEffect(() => {
    if (!application) {
      navigate("/", { replace: true });
    }
  }, [application]);

  if (!application) return null; 

  const fromCurrencyObj = state.fromCurrency || (application.currency_from ? { code: application.currency_from, name: application.currency_from, image: (state.fromCurrency && state.fromCurrency.image) || null } : null);
  const toCurrencyObj = state.toCurrency || (application.currency_to ? { code: application.currency_to, name: application.currency_to, image: (state.toCurrency && state.toCurrency.image) || null, networkCode: state.toCurrency?.networkCode ?? state.networkCode ?? null } : null);

  const fromAmount = application.amount_from ? application.amount_from : (state.fromAmount ?? "");
  const toAmount = application.amount_to ? application.amount_to : (state.toAmount ?? "");
  const rate = application.rate ? application.rate : (state.rate ?? "");

  const createdAt = application.created_at ?? new Date().toISOString();
  const dateStr = useMemo(() => {
    const d = new Date(createdAt);
    return d.toLocaleDateString("ru-RU");
  }, [createdAt]);

  const [wallet, setWallet] = useState("");
  const [walletError, setWalletError] = useState("");
  const [loading, setLoading] = useState(false);

  const walletRegex = useMemo(() => {
    const code = (toCurrencyObj?.code || "").toUpperCase();
    const net = (toCurrencyObj?.networkCode || "").toUpperCase();

    const RX = {
      BTC: /^(bc1[0-9a-z]{25,39}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/,
      ETH: /^0x[a-fA-F0-9]{40}$/,
      TRX: /^T[1-9A-HJ-NP-Za-km-z]{33}$/,
      SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
      LTC: /^(ltc1|[LM3])[a-zA-HJ-NP-Z0-9]{26,39}$/,
      TON: /^(UQ|EQ)[A-Za-z0-9_-]{48}$/,
    };

    if (["USDT","USDC","DAI","BUSD","TUSD","USDP"].includes(code)) {
      if (net.includes("TRC")) return RX.TRX;
      if (net.includes("SOL")) return RX.SOL;
      return RX.ETH; 
    }

    if (code === "BTC") return RX.BTC;
    if (code === "ETH") return RX.ETH;
    if (code === "TRX") return RX.TRX;
    if (code === "SOL") return RX.SOL;
    if (code === "LTC") return RX.LTC;
    if (code === "TON") return RX.TON;

    return /^.{10,}$/; 
  }, [toCurrencyObj]);

  const checkLocalFormat = (address) => {
    if (!address) {
      setWalletError("");
      return true;
    }
    try {
      const ok = walletRegex.test(address.trim());
      if (!ok) {
        setWalletError("Адрес не соответствует формату сети");
        return false;
      }
      setWalletError("");
      return true;
    } catch (e) {
      setWalletError("");
      return true;
    }
  };

  const validateWalletApi = async () => {
    if (!wallet || wallet.trim() === "") {
      setWalletError("Введите адрес кошелька");
      return;
    }
    if (!checkLocalFormat(wallet)) {
      return;
    }

    setLoading(true);
    setWalletError("");
    try {
      const res = await axios.post("https://nako.navisdevs.ru/api/v4/get-address/", {
        ticker: toCurrencyObj?.code ?? application.currency_to,
        network: toCurrencyObj?.networkCode ?? state.networkCode ?? null,
        send_address: wallet.trim(),
      });

      if (res?.data?.valid === false) {
        setWalletError("Адрес кошелька некорректен");
        return;
      }

      const accountAddress = res?.data?.account?.address ?? wallet.trim();

      navigate("/payment_step_two", {
        state: {
          application,
          address: accountAddress,
        },
      });
    } catch (err) {
      console.error("validateWalletApi error:", err);
      setWalletError("Ошибка проверки адреса. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

//   const TOTAL_TIME = 20 * 60;
//   const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
//   const [isTimeUp, setIsTimeUp] = useState(false);

//   useEffect(() => {
//     if (isTimeUp) return;
//     const interval = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setIsTimeUp(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [isTimeUp]);

//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

  const [unableToPay, setUnableToPay] = useState(false);
  const [successfully, setSuccessfully] = useState(false);

  return (
    <div className="bggradient">
      <Header />
      <img src={ellipse} className="absolutebg" />
      <div className={`${css.parent} container `}>
        <div className={css.content}>
          <div className={css.block_container}>
            <div className={css.block_one}>
              <div className={css.df}>
                <span>
                  <PiWarningFill size={26} color="#F7931A" />
                </span>
                <div>
                  <span>
                    Если обмен будет выполнен другим плательщиком, обмен не будет завершен.
                  </span>
                  <p>
                    Возврат средств будет возможен только после обращения в поддержку
                    сервиса.
                  </p>
                </div>
              </div>

              <div className={css.df}>
                <span>
                  <FaCircleCheck size={25} color="#03a39e" />
                </span>
                <div>
                  <span>Сделайте перевод одним платежом в точности до копеек</span>
                  <p>
                    Если вы отправите другую сумму, мы не сможем завершить обмен. Возврат
                    средств будет затруднен.
                  </p>
                </div>
              </div>

              <div className={css.df}>
                <span>
                  <FaCircleCheck size={25} color="#03a39e" />
                </span>
                <div>
                  <span>
                    После того, как Вы выполните перевод обязательно нажмите “Я оплатил”
                  </span>
                  <p>
                    Других действий от Вас не потребуется. Обмен будет завершен
                    автоматически, как только мы увидим платеж.
                  </p>
                </div>
              </div>
            </div>

            <div className={css.block_two}>
              <div className={css.flex}>
                <h3>ЗАЯВКА №{application.application_id ?? application.id ?? "-"}</h3>
                <img src={question} alt="icon" />
              </div>

              <div className={css.stages}>
                <div className={css.stage}></div>
                <div className={`${css.stage} ${css.active_stage}`}></div>
                <div className={css.stage}></div>
              </div>

              <div className={css.data}>
                <div>
                  <p className={css.p}>Дата:</p>
                  <h5>{dateStr}</h5>
                </div>
                <div>
                  <p className={css.p}>Обмен по курсу:</p>
                  <h5>
                    1 {fromCurrencyObj?.code ?? application.currency_from} = {rate}{" "}
                    {toCurrencyObj?.code ?? application.currency_to}
                  </h5>
                </div>
              </div>

              <div className={css.last_change}>
                <div className={css.details}>
                  <div className={css.contain_many}>
                    <h5>
                      {fromAmount} {fromCurrencyObj?.code ?? application.currency_from}
                    </h5>
                    <div className={css.many}>
                      <div>
                        {fromCurrencyObj?.image && (
                          <img src={fromCurrencyObj.image} alt={fromCurrencyObj?.code} />
                        )}
                      </div>
                      {fromCurrencyObj?.name ?? application.currency_from}
                    </div>
                  </div>

                  <div className={css.arrow}>
                    <IoIosArrowRoundForward size={34} />
                  </div>

                  <div className={css.contain_many}>
                    <h5>
                      {toAmount} {toCurrencyObj?.code ?? application.currency_to}
                    </h5>
                    <div className={css.many}>
                      <div>
                        {toCurrencyObj?.image && (
                          <img src={toCurrencyObj.image} alt={toCurrencyObj?.code} />
                        )}
                      </div>
                      {toCurrencyObj?.name ?? application.currency_to}
                    </div>
                  </div>
                </div>

                <div className={css.commission}>
                  <p>Ожидаемая комиссия</p>
                  <span>{application.fee != null ? application.fee : "-"}</span>
                </div>
              </div>

              <div className={css.vvod_adres}>
                <label>
                  Адрес кошелька ({toCurrencyObj?.code ?? application.currency_to}
                  {toCurrencyObj?.networkCode ? ` · ${toCurrencyObj.networkCode}` : ""})
                </label>
                <input
                  type="text"
                  placeholder="Введите адрес кошелька"
                  value={wallet}
                  onChange={(e) => {
                    const val = e.target.value;
                    setWallet(val);
                    checkLocalFormat(val);
                  }}
                  required
                />
                {loading && <div className={css.loading}>Проверка...</div>}
                {walletError && (
                  <div className={css.error} style={{ color: "red" }}>
                    {walletError}
                  </div>
                )}
              </div>

              {/* <div className={css.timer_block} style={{ marginTop: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src={ellipse} alt="clock" style={{ width: 28, height: 28 }} />
                  <div>
                    <p>
                      <span>Оплатите заявку</span>
                      <br />
                      до окончания этого времени
                    </p>
                  </div>
                </div>
                <span className={css.count}>{formatTime(secondsLeft)}</span>
              </div> */}

              <button
                className={css.submit}
                onClick={validateWalletApi}
                disabled={!wallet || !!walletError || loading}
              >
                Далее
              </button>
              <button className={css.cant} onClick={() => setUnableToPay(true)}>
                Не получается оплатить
              </button>
            </div>
          </div>
        </div>

        {/* {isTimeUp && (
          <Modal onClose={() => setIsTimeUp(false)} style={{ maxWidth: "500px" }}>
            <div className={css.close}>
              <IoCloseOutline />
            </div>
            <h3 className={css.close_number}>
              Перевод №{application.application_id ?? application.id} <br />
              отменен
            </h3>
            <p className={css.close_text}>
              Если оплата была произведена после отмены операции, или наш сервис не видит
              оплату по другим причинам, не переживайте, мы найдём ваш платёж вручную.
            </p>
            <Link to="/payment_step" className={css.close_submit} onClick={() => window.location.reload()}>
              Попробовать еще раз
            </Link>
          </Modal>
        )} */}

        {unableToPay && (
          <Modal onClose={() => setUnableToPay(false)} style={{ maxWidth: "500px" }}>
            <h3 className={css.close_number}>Не получается оплатить</h3>
            <p className={css.close_text}>
              Иногда по независящим от нас причинам мы не можем принять платеж. Это может быть связано с отклонением операции со стороны банка или внешними техническими ошибками.
              <br />
              <br />
              Вы можете повторить операцию через некоторое время, использовать другую карту или выбрать другое направление для обмена.
            </p>
            <button className={css.close_submit} onClick={() => setUnableToPay(false)}>
              Понятно
            </button>
          </Modal>
        )}

        {successfully && (
          <Modal onClose={() => setSuccessfully(false)} style={{ maxWidth: "500px" }}>
            <div className={`${css.close} ${css.succes}`}>
              <LuCheck />
            </div>
            <h3 className={css.close_number}>
              Перевод №{application.application_id ?? application.id} <br /> успешно выполнен!
            </h3>
            <p className={css.close_text}>Спасибо — перевод зафиксирован.</p>
            <Link to="/operations" className={css.close_submit}>
              Перейти в профиль
            </Link>
          </Modal>
        )}
      </div>
    </div>
  );
};
