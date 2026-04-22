import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { products as seedProducts, Product, Category } from "@/data/products";

interface ProductsCtx {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  addProduct: (p: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsCtx | null>(null);
const KEY = "tilila_products_v1";

const loadInitial = (): Product[] => {
  if (typeof window === "undefined") return seedProducts;
  try {
    const saved = localStorage.getItem(KEY);
    if (!saved) return seedProducts;
    const parsed: Product[] = JSON.parse(saved);
    // Merge: keep seed products (in case translations rely on them) plus any custom ones
    const seedIds = new Set(seedProducts.map((p) => p.id));
    const custom = parsed.filter((p) => !seedIds.has(p.id));
    // Update seed products with any persisted overrides (price, stock-related fields are in StockContext)
    const merged = seedProducts.map((sp) => {
      const override = parsed.find((pp) => pp.id === sp.id);
      return override ? { ...sp, ...override } : sp;
    });
    return [...merged, ...custom];
  } catch {
    return seedProducts;
  }
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || `p-${Date.now()}`;

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => loadInitial());

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(products));
  }, [products]);

  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products]);

  const addProduct = useCallback((p: Omit<Product, "id"> & { id?: string }) => {
    const id = p.id || `${slugify(p.nameKey || "product")}-${Date.now().toString(36)}`;
    const newP: Product = { ...(p as Product), id };
    setProducts((prev) => [...prev, newP]);
    // Seed stock for the new product so StockContext picks it up
    try {
      const STOCK_KEY = "tilila_stock_v1";
      const cur = JSON.parse(localStorage.getItem(STOCK_KEY) || "{}");
      cur[id] = newP.initialStock;
      localStorage.setItem(STOCK_KEY, JSON.stringify(cur));
      window.dispatchEvent(new Event("storage"));
    } catch {}
    return newP;
  }, []);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, getProduct, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
};

export type { Category };
