import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { useStock } from "@/context/StockContext";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, Truck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import ProductImage from "@/components/ProductImage";

const FREE_DELIVERY_THRESHOLD = 300;
const DELIVERY_FEE = 30;

const Cart = () => {
  const { t } = useTranslation();
  const { items, remove, updateQty, clear, count } = useCart();
  const { getStock, decrement } = useStock();
  const { products } = useProducts();
  const navigate = useNavigate();

  const lines = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id)! }))
    .filter((l) => l.product);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
  const deliveryFree = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
  const delivery = deliveryFree ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const currency = t("collection.currency");

  const handleInc = (id: string, current: number) => {
    if (getStock(id) <= 0) {
      toast.error(t("stock.unavailable"));
      return;
    }
    decrement(id, 1);
    updateQty(id, current + 1);
  };

  const handleDec = (id: string, current: number) => {
    updateQty(id, current - 1);
  };

  const handleRemove = (id: string) => {
    remove(id);
    toast.success(t("cart.removed"));
  };

  const handleClear = () => {
    clear();
    toast.success(t("cart.removed"));
  };

  return (
    <section className="container py-16 md:py-20 animate-fade-in">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-gold tracking-wide">{t("cart.title")}</h1>
        <div className="w-16 h-px bg-gold/60 mx-auto mt-5" />
        <p className="text-muted-foreground mt-5 text-sm md:text-base">{t("cart.subtitle")}</p>
      </div>

      {lines.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 md:py-20 px-6 border border-border/50 bg-card/50 rounded-sm animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-gold/40 flex items-center justify-center bg-background/50">
            <ShoppingBag className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-2xl text-foreground mb-3">{t("cart.empty")}</h2>
          <p className="text-muted-foreground text-sm mb-8">{t("cart.emptyHint")}</p>
          <Button asChild variant="luxe" size="lg" className="group">
            <Link to="/collection">
              {t("cart.continue")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground pb-3 border-b border-border/50">
              <span>{count} {count === 1 ? t("cart.item") : t("cart.items")}</span>
              <button
                onClick={handleClear}
                className="hover:text-destructive transition-luxe flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t("cart.clear")}
              </button>
            </div>

            {lines.map((l) => {
              const lineTotal = l.product.price * l.quantity;
              return (
                <div
                  key={l.id}
                  className="group flex gap-4 sm:gap-5 bg-card border border-border/50 p-4 sm:p-5 rounded-sm transition-luxe hover:border-gold/50 hover:shadow-[0_4px_30px_-12px_hsl(var(--primary)/0.3)]"
                >
                  <Link
                    to={`/product/${l.id}`}
                    className="shrink-0 overflow-hidden rounded-md bg-background"
                  >
                    <ProductImage
                      src={l.product.image}
                      alt={t(l.product.nameKey)}
                      className="w-24 h-28 sm:w-28 sm:h-32 object-cover transition-luxe duration-700 group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link to={`/product/${l.id}`}>
                          <h3 className="font-serif text-base sm:text-lg truncate hover:text-gold transition-luxe">
                            {t(l.product.nameKey)}
                          </h3>
                        </Link>
                        <p className="text-gold text-sm mt-1">
                          {l.product.price} {currency}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(l.id)}
                        aria-label={t("cart.remove")}
                        className="text-muted-foreground hover:text-destructive transition-luxe p-1 -mr-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-auto pt-3 flex items-end justify-between gap-3">
                      <div className="flex items-center border border-border/70 rounded-sm overflow-hidden">
                        <button
                          onClick={() => handleDec(l.id, l.quantity)}
                          aria-label="decrease"
                          className="w-8 h-8 hover:bg-gold/10 hover:text-gold transition-luxe flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 text-center text-sm font-medium">{l.quantity}</span>
                        <button
                          onClick={() => handleInc(l.id, l.quantity)}
                          disabled={getStock(l.id) <= 0}
                          aria-label="increase"
                          className="w-8 h-8 hover:bg-gold/10 hover:text-gold transition-luxe flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {t("cart.subtotal")}
                        </p>
                        <p className="font-serif text-lg text-foreground">
                          {lineTotal} {currency}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="bg-card border border-border/50 rounded-sm p-6 sm:p-7 space-y-5 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <h2 className="font-serif text-2xl text-gold">{t("cart.summary")}</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-foreground/90">
                  <span>{t("cart.subtotal")}</span>
                  <span>{subtotal} {currency}</span>
                </div>
                <div className="flex justify-between text-foreground/90">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gold/80" />
                    {t("cart.delivery")}
                  </span>
                  <span className={deliveryFree ? "text-gold uppercase tracking-wider text-xs" : ""}>
                    {deliveryFree ? t("cart.free") : `${delivery} ${currency}`}
                  </span>
                </div>

                {!deliveryFree && (
                  <p className="text-[11px] text-muted-foreground italic pt-1">
                    {t("cart.freeOver", { amount: FREE_DELIVERY_THRESHOLD })}
                  </p>
                )}
              </div>

              <div className="h-px bg-border" />

              <div className="flex justify-between items-end">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t("cart.total")}
                </span>
                <span className="font-serif text-3xl text-gold">
                  {total} {currency}
                </span>
              </div>

              <Button
                onClick={() => navigate("/checkout")}
                variant="luxe"
                className="w-full group"
                size="lg"
              >
                {t("cart.checkout")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-border/70 hover:border-gold/60 hover:text-gold"
              >
                <Link to="/collection">{t("cart.continue")}</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
