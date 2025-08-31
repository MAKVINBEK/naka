import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import css from "./Exchenger.module.css"; // можно вынести в отдельный module если нужно

function useDebounce(value, ms = 220) {
  const [deb, setDeb] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDeb(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return deb;
}

export function CurrencyModal({
  visible,
  onClose,
  list = [],
  onSelect,
  value,
  onChange,
  activeFilter,
  setActiveFilter,
}) {
  const debounced = useDebounce(value, 220);

  const filtered = useMemo(() => {
    const q = (debounced || "").toLowerCase().trim();
    return (list || [])
      .filter((item) => (`${item.name} ${item.surname}`).toLowerCase().includes(q))
      .filter((item) =>
        activeFilter === "Все"
          ? true
          : (item.category || "Крипто").toLowerCase() === (activeFilter === "USD" ? "usd" : "крипто")
      );
  }, [list, debounced, activeFilter]);

  if (typeof document === "undefined" || !visible) return null;

  return ReactDOM.createPortal(
    <div className={css.modal_overlay} role="dialog" aria-modal="true" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.coin}>
          <input
            aria-label="Поиск валют"
            className={css.search}
            placeholder="Выберите валюту"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className={css.menu}>
          {["Все", "Крипто", "USD"].map((f) => (
            <button
              key={f}
              className={`${css.click} ${activeFilter === f ? css.activeClick : ""}`}
              onClick={() => setActiveFilter(f)}
              type="button"
            >
              {f}
            </button>
          ))}
        </div>

        <div className={css.menu_list} role="list">
          {filtered.length === 0 ? (
            <div className={css.empty}>Ничего не найдено</div>
          ) : (
            filtered.map((it, idx) => (
              <div
                key={`${it.uid ?? it.code}-${it.networkCode ?? ""}-${idx}`}
                className={css.block}
                role="listitem"
                onClick={() => onSelect(it)}
              >
                <div className={css.name}>
                  {it.image ? <img src={it.image} alt={`${it.name} icon`} /> : <div className={css.placeholder} />}
                  <h4>{it.name}</h4>
                </div>
                <h5>{it.surname === it.networkCode
                  ? it.surname
                  : `${it.surname} ${it.networkCode}`}</h5>
              </div>
            ))
          )}
        </div>

        <button className={css.submit} onClick={onClose} aria-label="Закрыть" type="button">
          Закрыть
        </button>
      </div>
    </div>,
    document.body
  );
}
