import React, { useEffect, useState } from "react";
import css from "./Payment.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import ellipse from "../../img/ellipse.png";
import question from "../../img/svg/question.svg";
import { TbCopy, TbChecks } from "react-icons/tb";
import QR from "../../assets/Qr";
import Modal from "../../assets/Modal";
import { IoCloseOutline } from "react-icons/io5";

export const Payment_two = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const application = state?.application ?? null;

  const address = state?.address ?? state?.adress ?? "";

  const legacyFromAmount = state?.fromAmount;
  const legacyToAmount = state?.toAmount;
  const legacyFromCurrency = state?.fromCurrency;
  const legacyToCurrency = state?.toCurrency;

  const fromAmount = application?.amount_from ?? (legacyFromAmount ?? "");
  const toAmount = application?.amount_to ?? (legacyToAmount ?? "");
  const fromCurrencyCode = application?.currency_from ?? (legacyFromCurrency?.code ?? legacyFromCurrency ?? "");
  const toCurrencyCode = application?.currency_to ?? (legacyToCurrency?.code ?? legacyToCurrency ?? "");
  const applicationId = application?.application_id ?? application?.id ?? state?.application_id ?? "—";
  const createdAt = application?.created_at ?? new Date().toISOString();

  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState("1"); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const hasMinimal = (fromAmount && toAmount && fromCurrencyCode && toCurrencyCode && (address && address.length > 0));
    if (!application && !hasMinimal) {
      navigate("/payment_step", { replace: true });
    }
  }, [state, application]);

  const addressStr = address || "";

  const addressWithAmount = (() => {
    if (!addressStr) return "";
    if (active === "2") {
      const a = Number(String(toAmount).replace(",", "."));
      if (!Number.isFinite(a)) return addressStr;
      return `${addressStr}?amount=${a}`;
    }
    return addressStr;
  })();

  const handleCopy = async (useWithAmount = false) => {
    try {
      const text = useWithAmount ? addressWithAmount || addressStr : addressStr;
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  const handlePaidClick = () => {
    setShowSuccessModal(true);
  };

  if (!addressStr) {
    return null;
  }

  return (
    <div className="bggradient">
      <Header />
      <img src={ellipse} className="absolutebg" alt="" />
      <div className={`${css.parent} container `}>
        <div className={css.content}>
          <div className={`${css.block_container} ${css.grid}`}>
            <div className={css.block_two}>
              <div className={css.flex}>
                <h3>ЗАЯВКА №{applicationId}</h3>
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
                  <h5>{new Date(createdAt).toLocaleDateString("ru-RU")}</h5>
                </div>
                <div>
                  <p className={css.p}>Обмен по курсу:</p>
                  <h5>
                    1 {fromCurrencyCode} = {application?.rate ?? "—"} {toCurrencyCode}
                  </h5>
                </div>
              </div>

              <div className={css.column}>
                <div className={`${css.last_change} ${css.details}`}>
                  <p className={css.p}>Вы отдаете:</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {state?.fromCurrency?.image && (
                      <img src={state.fromCurrency.image} alt={fromCurrencyCode} style={{ width: 28, height: 28 }} />
                    )}
                    <span>{fromAmount} {fromCurrencyCode}</span>
                  </div>
                </div>

                <div className={`${css.last_change} ${css.details}`}>
                  <p className={css.p}>Вы получаете:</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {state?.toCurrency?.image && (
                      <img src={state.toCurrency.image} alt={toCurrencyCode} style={{ width: 28, height: 28 }} />
                    )}
                    <span>{toAmount} {toCurrencyCode}</span>
                  </div>
                </div>
              </div>

              <div className={css.loader} aria-hidden>
                <svg className="loader" viewBox="0 0 46 46" width="45" height="45">
                  <circle
                    cx="23"
                    cy="23"
                    r="20"
                    stroke="#03A39E"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="90 180"
                  />
                </svg>
              </div>

              <button className={css.submit} onClick={handlePaidClick}>
                Я оплатил
              </button>
            </div>

            <div className={css.block_thre}>
              <p>
                Пожалуйста, отправьте средства для обмена.<br />
                По этому адресу:
              </p>

              <div className={css.coppy}>
                <h4 style={{ wordBreak: "break-all" }}>
                  {addressStr}{" "}
                  <span
                    onClick={() => handleCopy(false)}
                    title="Скопировать адрес"
                    style={{ cursor: "pointer", marginLeft: 8 }}
                    aria-label="Скопировать адрес"
                  >
                    {copied ? <TbChecks color="green" /> : <TbCopy color="#85888e" />}
                  </span>
                </h4>
              </div>

              <div style={{ marginTop: 12, marginBottom: 8 }}>
                <div className={css.qr_contain}>
                  <div className={css.qr}>
                    <QR value={active === "2" ? addressWithAmount : addressStr} className={css.qrs} />
                  </div>

                  <div className={css.button} style={{ display: "flex", gap: 8 }}>
                    <button
                      className={active === "1" ? css.active_button : ""}
                      onClick={() => setActive("1")}
                      type="button"
                    >
                      Адрес
                    </button>
                    <button
                      className={active === "2" ? css.active_button : ""}
                      onClick={() => setActive("2")}
                      type="button"
                      disabled={!Number.isFinite(Number(String(toAmount).replace(",", ".")))}
                    >
                      С суммой
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showSuccessModal && (
            <Modal onClose={() => setShowSuccessModal(false)} style={{ maxWidth: 520 }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setShowSuccessModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <IoCloseOutline size={20} />
                </button>
              </div>
              <h3 style={{ marginTop: 6, marginBottom: 8 }}>Оплата отмечена как выполненная</h3>
              <p style={{ marginBottom: 16 }}>
                Спасибо — как только система увидит платёж, операция будет завершена автоматически.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <Link to="/operations" className={css.close_submit}>Перейти в профиль</Link>
                <button className={css.close_submit} onClick={() => setShowSuccessModal(false)}>Продолжить</button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment_two;
