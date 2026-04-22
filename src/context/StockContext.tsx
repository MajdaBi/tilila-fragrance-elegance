import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { products } from "@/data/products";

type StockMap = Record<string, number>;

interface StockCtx {
  stock: StockMap;
  getStock: (id: string) => number;
  decrement: (id: string, qty?: number) => boolean;
  reset: () => void;
}

const StockContext = createContext<StockCtx | null>(null);
const KEY = "tilila_stock_v1";

const buildInitial = (): StockMap =>
  products.reduce<StockMap>((acc, p) => {
    acc[p.id] = p.initialStock;
    return acc;
  }, {});

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [stock, setStock] = useState<StockMap>(() => {
    if (typeof window === "undefined") return buildInitial();
    try {
      const saved = localStorage.getItem(KEY);
      const parsed: StockMap = saved ? JSON.parse(saved) : {};
      const initial = buildInitial();
      // Merge: keep saved values for known products, fill new ones with initial
      return { ...initial, ...Object.fromEntries(Object.entries(parsed).filter(([k]) => k in initial)) };
    } catch {
      return buildInitial();
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(stock));
  }, [stock]);

  // Listen for external stock updates (e.g. admin dashboard editing localStorage directly)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      try {
        const saved = localStorage.getItem(KEY);
        if (!saved) return;
        const parsed: StockMap = JSON.parse(saved);
        setStock((prev) => {
          // shallow compare
          const keys = new Set([...Object.keys(prev), ...Object.keys(parsed)]);
          for (const k of keys) if (prev[k] !== parsed[k]) return { ...prev, ...parsed };
          return prev;
        });
      } catch {}
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const getStock = useCallback((id: string) => stock[id] ?? 0, [stock]);

  const decrement = useCallback((id: string, qty = 1) => {
    let ok = false;
    setStock((prev) => {
      const current = prev[id] ?? 0;
      if (current < qty) return prev;
      ok = true;
      return { ...prev, [id]: current - qty };
    });
    return ok;
  }, []);

  const reset = useCallback(() => setStock(buildInitial()), []);

  return (
    <StockContext.Provider value={{ stock, getStock, decrement, reset }}>{children}</StockContext.Provider>
  );
};

export const useStock = () => {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock must be used within StockProvider");
  return ctx;
};

export const stockStatus = (qty: number): "in" | "low" | "out" => {
  if (qty === 0) return "out";
  if (qty <= 5) return "low";
  return "in";
};
