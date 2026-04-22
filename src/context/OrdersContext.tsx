import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
];

export interface OrderItem {
  id: string;
  nameKey: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string; // ISO
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

interface OrdersCtx {
  orders: Order[];
  myOrders: (email: string) => Order[];
  createOrder: (data: Omit<Order, "id" | "date" | "status">) => Order;
  updateStatus: (id: string, status: OrderStatus) => void;
}

const OrdersContext = createContext<OrdersCtx | null>(null);
const KEY = "tilila_orders_v1";

const generateId = () => {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TLA-${stamp}-${rand}`;
};

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback((data: Omit<Order, "id" | "date" | "status">) => {
    const order: Order = {
      ...data,
      id: generateId(),
      date: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const myOrders = useCallback(
    (email: string) => orders.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase()),
    [orders],
  );

  return (
    <OrdersContext.Provider value={{ orders, myOrders, createOrder, updateStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};
