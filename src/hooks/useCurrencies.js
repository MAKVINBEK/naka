// hooks/useCurrencies.js
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const API_PAIRS = import.meta.env.VITE_API_PAIRS || "https://nako.navisdevs.ru/api/v4/currencies/";

export async function fetchAllRaw(token, signal) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await axios.get(API_PAIRS, { headers, signal });
  return Array.isArray(res?.data?.currencies) ? res.data.currencies : [];
}

export function flattenCurrencies(list) {
  const out = [];
  for (const c of list) {
    const code = String(c?.code || "").toUpperCase();
    const name = c?.name || c?.code || "";
    const icon = c?.icon || null;
    const decimal = typeof c?.decimal === "number" ? c.decimal : (c?.decimal ? Number(c.decimal) : undefined);
    const networks = Array.isArray(c?.networks) ? c.networks : [];

    if (!networks.length) {
      out.push({
        uid: `${code}`,
        name,
        surname: code,
        code,
        image: icon,
        decimal: typeof decimal === "number" ? decimal : 6, // default fallback
        category: USD_LIKE.has(code) ? "USD" : "Крипто",
        networkCode: null,
        networkName: null,
      });
      continue;
    }

    for (const net of networks) {
      const netCode = String(net?.code || "");
      const netName = net?.name || netCode;
      out.push({
        uid: `${code}:${netCode}`,
        name,
        surname: code,
        code,
        image: icon,
        decimal: typeof decimal === "number" ? decimal : 6,
        category: USD_LIKE.has(code) ? "USD" : "Крипто",
        networkCode: netCode || null,
        networkName: netName || null,
      });
    }
  }
  return out;
}

export function flattenSingleCurrency(c) {
  const code = String(c?.code || "").toUpperCase();
  const name = c?.name || c?.code || "";
  const icon = c?.icon || null;
  const decimal = typeof c?.decimal === "number" ? c.decimal : (c?.decimal ? Number(c.decimal) : undefined);
  const networks = Array.isArray(c?.networks) ? c.networks : [];

  if (!networks.length) {
    return [{
      uid: `${code}`,
      name,
      surname: code,
      code,
      image: icon,
      decimal: typeof decimal === "number" ? decimal : 6,
      category: USD_LIKE.has(code) ? "USD" : "Крипто",
      networkCode: null,
      networkName: null,
    }];
  }

  return networks.map((net) => {
    const netCode = String(net?.code || "");
    const netName = net?.name || netCode;
    return {
      uid: `${code}:${netCode}`,
      name,
      surname: code,
      code,
      image: icon,
      decimal: typeof decimal === "number" ? decimal : 6,
      category: USD_LIKE.has(code) ? "USD" : "Крипто",
      networkCode: netCode || null,
      networkName: netName || null,
    };
  });
}

export function isSameCoin(a, b) {
  if (!a || !b) return false;
  return a.code === b.code && String(a.networkCode || "") === String(b.networkCode || "");
}

export function parseInput(str) {
  if (str === null || str === undefined) return null;
  const cleaned = String(str).trim().replace(",", ".");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  if (isNaN(n)) return null;
  return n;
}

// ВАЖНО: НЕ удаляем нули в конце — возвращаем точно decimals знаков
export function formatNumber(value, decimals = 6) {
  if (value == null || value === "" || !isFinite(value)) return String(value ?? "");
  return Number(value).toFixed(decimals);
}

const USD_LIKE = new Set(["USD", "USDT", "USDC", "USDD", "DAI", "BUSD", "TUSD", "USDP"]);

export function useCurrencies(token) {
  const [flatList, setFlatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const raw = await fetchAllRaw(token, controller.signal);
        const flat = flattenCurrencies(raw);
        if (!mounted.current) return;
        setFlatList(flat);
      } catch (err) {
        if (err?.name === "CanceledError" || err?.name === "AbortError" || err?.code === "ERR_CANCELED") return;
        console.error("useCurrencies.fetchAll:", err);
        setError("Не удалось загрузить список валют");
      } finally {
        if (mounted.current) setLoading(false);
      }
    }

    load();

    return () => {
      mounted.current = false;
      controller.abort();
    };
  }, [token]);

  const fetchByBase = useCallback(async (baseCode) => {
    if (!baseCode) return { targetVariants: [], rates: {} };
    const controller = new AbortController();
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_PAIRS}?base=${encodeURIComponent(baseCode)}`, { headers, signal: controller.signal });

      const targetsRaw = Array.isArray(res?.data?.targets) ? res.data.targets : [];

      const rates = {};
      for (const t of targetsRaw) {
        const quote = t?.target_currency?.code;
        const rate = Number(t?.rate);
        if (quote && !Number.isNaN(rate)) {
          rates[`${String(baseCode).toUpperCase()}_${String(quote).toUpperCase()}`] = rate;
        }
      }

      const targetVariants = targetsRaw
        .map((t) => t?.target_currency)
        .filter(Boolean)
        .flatMap((c) => flattenSingleCurrency(c));

      return { targetVariants, rates };
    } catch (err) {
      if (err?.name === "CanceledError" || err?.name === "AbortError" || err?.code === "ERR_CANCELED") return { targetVariants: [], rates: {} };
      console.error("useCurrencies.fetchByBase:", err);
      throw err;
    } finally {
      controller.abort();
    }
  }, [token]);

  const refreshAll = useCallback(async () => {
    const controller = new AbortController();
    try {
      const raw = await fetchAllRaw(token, controller.signal);
      return flattenCurrencies(raw);
    } catch (err) {
      if (err?.name === "CanceledError" || err?.name === "AbortError" || err?.code === "ERR_CANCELED") return [];
      console.error("useCurrencies.refreshAll:", err);
      throw err;
    } finally {
      controller.abort();
    }
  }, [token]);

  return { flatList, loading, error, fetchByBase, refreshAll };
}
