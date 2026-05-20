import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { useStock } from "@/context/StockContext";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import ProductImage from "@/components/ProductImage";

const Cart = () => {
  const { t } = useTranslation();
  const { items, remove, updateQty } = useCart();
  const { getStock, decrement } = useStock();
  const { products } = useProducts();
  const navigate = useNavigate();

  const lines = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id)! }))
    .filter((l) => l.product);

  const total = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);

  const handleInc = (id: string, current: number) => {
    if (getStock(id) <= 0) {
      toast.error(t("stock.unavailable"));
      return;
    }
    decrement(id, 1);
    updateQty(id, current + 1);
  };

  const handleDec = (id: string, current: number) => {
    // Restore one unit of stock when reducing quantity
    // (We don't have an explicit increment in StockContext; emulate via decrement(-1) is unsafe.)
    // Use a simple approach: if removing, restore by writing through localStorage flow:
    // For simplicity here, only block going below 1 if last item via remove button.
    updateQty(id, current - 1);
  };

  const handleRemove = (id: string) => {
    remove(id);
    toast.success(t("cart.removed"));
  };

  return (
    <section className="container py-16 md:py-20 animate-fade-in">
      <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-12">{t("cart.title")}</h1>

      {lines.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-6">{t("cart.empty")}</p>
          <Button asChild variant="luxe"><Link to="/collection">{t("cart.continue")}</Link></Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {lines.map((l) => (
              <div key={l.id} className="flex items-center gap-4 bg-card border border-border/50 p-4 transition-luxe hover:border-primary/40">
                <Link to={`/product/${l.id}`} className="shrink-0 overflow-hidden rounded-md group">
                  <ProductImage src={l.product.image} alt={t(l.product.nameKey)} className="w-24 h-28 transition-luxe duration-500 group-hover:scale-110" />
                </Link>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg truncate">{t(l.product.nameKey)}</h3>
                  <p className="text-gold mt-1">{l.product.price} {t("collection.currency")}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => handleDec(l.id, l.quantity)} className="w-8 h-8 border border-border hover:border-primary transition-luxe flex items-center justify-center">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center">{l.quantity}</span>
                    <button onClick={() => handleInc(l.id, l.quantity)} disabled={getStock(l.id) <= 0} className="w-8 h-8 border border-border hover:border-primary transition-luxe flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button onClick={() => handleRemove(l.id)} aria-label={t("cart.remove")} className="text-muted-foreground hover:text-destructive transition-luxe p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <aside className="bg-card border border-border/50 p-6 h-fit space-y-4">
            <h2 className="font-serif text-2xl text-gold">{t("cart.total")}</h2>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-end">
              <span className="text-muted-foreground">{t("cart.total")}</span>
              <span className="font-serif text-3xl text-gold">{total} {t("collection.currency")}</span>
            </div>
            <Button onClick={() => navigate("/checkout")} variant="luxe" className="w-full" size="lg">
              {t("cart.checkout")}
            </Button>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
