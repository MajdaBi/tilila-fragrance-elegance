import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import OrderProgress from "@/components/OrderProgress";

const MyOrders = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { myOrders } = useOrders();
  const orders = user ? myOrders(user.email) : [];

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString(i18n.language === "ar" ? "ar-MA" : i18n.language === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="container py-16 md:py-20 animate-fade-in">
      <div className="text-center mb-12">
        <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">— Tilila —</p>
        <h1 className="font-serif text-4xl md:text-5xl text-gold">{t("orders.myTitle")}</h1>
        <p className="text-muted-foreground mt-3">{t("orders.mySubtitle")}</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-6">{t("orders.empty")}</p>
          <Button asChild variant="luxe"><Link to="/collection">{t("cart.continue")}</Link></Button>
        </div>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {orders.map((o) => (
            <article key={o.id} className="bg-card border border-border/50 hover:border-primary/40 transition-luxe shadow-luxe">
              <header className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-border/50">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{t("orders.id")}</p>
                  <p className="font-serif text-gold text-lg">{o.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{t("orders.date")}</p>
                  <p className="text-sm">{fmtDate(o.date)}</p>
                </div>
                <OrderStatusBadge status={o.status} />
              </header>

              <div className="p-5">
                <OrderProgress status={o.status} />
              </div>

              <div className="px-5 pb-5 space-y-3">
                {o.items.map((it) => (
                  <div key={it.id} className="flex items-center gap-4 bg-secondary/40 border border-border/30 p-3">
                    <ProductImage src={it.image} alt={t(it.nameKey)} className="w-16 h-20" />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif truncate">{t(it.nameKey)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("cart.quantity")}: {it.quantity} × {it.price} {t("collection.currency")}
                      </p>
                    </div>
                    <p className="text-gold font-medium">{it.price * it.quantity} {t("collection.currency")}</p>
                  </div>
                ))}
              </div>

              <footer className="grid sm:grid-cols-3 gap-4 px-5 pb-5 text-sm">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{t("orders.address")}</p>
                  <p className="text-foreground/80">{o.address}</p>
                  <p className="text-foreground/60 text-xs mt-1">{o.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{t("orders.payment")}</p>
                  <p className="text-foreground/80">{o.paymentMethod}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{t("cart.total")}</p>
                  <p className="font-serif text-2xl text-gold">{o.total} {t("collection.currency")}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
