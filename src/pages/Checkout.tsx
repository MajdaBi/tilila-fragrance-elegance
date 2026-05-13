import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Checkout = () => {
  const { t } = useTranslation();
  const { items, clear } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", phone: "", address: "" });
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const lines = items
    .map((i) => ({ ...i, product: products.find((pr) => pr.id === i.id)! }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === "TILILA10") {
      setPromoApplied(true);
      toast.success(t("checkout.promoApplied"));
    } else {
      setPromoApplied(false);
      toast.error(t("checkout.promoInvalid"));
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    if (!user) { navigate("/login"); return; }
    if (lines.length === 0) { toast.error(t("cart.empty")); return; }

    const order = createOrder({
      customerName: form.name,
      customerEmail: user.email,
      phone: form.phone,
      address: form.address,
      paymentMethod: t("checkout.cod"),
      items: lines.map((l) => ({
        id: l.product.id,
        nameKey: l.product.nameKey,
        price: l.product.price,
        quantity: l.quantity,
        image: l.product.image,
      })),
      total,
    });
    toast.success(`${t("checkout.success")} · ${order.id}`);
    clear();
    setTimeout(() => navigate("/orders"), 1200);
  };

  return (
    <section className="container py-16 md:py-20 animate-fade-in max-w-2xl">
      <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-10">{t("checkout.title")}</h1>

      <form onSubmit={submit} className="bg-card border border-border/50 p-8 space-y-5">
        <div>
          <Label htmlFor="name">{t("checkout.fullName")}</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2" required maxLength={100} />
        </div>
        <div>
          <Label htmlFor="phone">{t("checkout.phone")}</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2" required maxLength={20} />
        </div>
        <div>
          <Label htmlFor="address">{t("checkout.address")}</Label>
          <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-2" required maxLength={200} />
        </div>
        <div>
          <Label>{t("checkout.payment")}</Label>
          <div className="mt-2 p-4 border border-primary/40 bg-secondary/40 text-primary">{t("checkout.cod")}</div>
        </div>

        <div>
          <Label htmlFor="promo">{t("checkout.promo")}</Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="promo"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder={t("checkout.promoPlaceholder")}
              maxLength={20}
            />
            <Button type="button" variant="luxeOutline" onClick={applyPromo}>{t("checkout.apply")}</Button>
          </div>
          {promoApplied && (
            <p className="text-xs text-primary mt-2 tracking-wider uppercase animate-fade-in">✓ TILILA10 — {t("checkout.promoApplied")}</p>
          )}
        </div>

        <div className="h-px bg-border my-2" />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("checkout.subtotal")}</span>
            <span className="text-foreground/90">{subtotal} {t("collection.currency")}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-sm animate-fade-in">
              <span className="text-muted-foreground">{t("checkout.discount")} (10%)</span>
              <span className="text-primary">− {discount} {t("collection.currency")}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-border/50">
            <span className="text-muted-foreground tracking-wider uppercase text-xs">{t("checkout.finalTotal")}</span>
            <span className="font-serif text-3xl text-gold">{total} {t("collection.currency")}</span>
          </div>
        </div>

        <Button type="submit" variant="luxe" size="lg" className="w-full">{t("checkout.place")}</Button>
      </form>
    </section>
  );
};

export default Checkout;
