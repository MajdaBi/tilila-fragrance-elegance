import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Checkout = () => {
  const { t } = useTranslation();
  const { items, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", phone: "", address: "" });

  const total = items.reduce((s, i) => {
    const p = products.find((pr) => pr.id === i.id);
    return s + (p ? p.price * i.quantity : 0);
  }, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success(t("checkout.success"));
    clear();
    setTimeout(() => navigate("/"), 1500);
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

        <div className="h-px bg-border my-2" />
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{t("cart.total")}</span>
          <span className="font-serif text-3xl text-gold">{total} {t("collection.currency")}</span>
        </div>

        <Button type="submit" variant="luxe" size="lg" className="w-full">{t("checkout.place")}</Button>
      </form>
    </section>
  );
};

export default Checkout;
