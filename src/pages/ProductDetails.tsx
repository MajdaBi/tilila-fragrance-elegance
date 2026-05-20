import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useStock, stockStatus } from "@/context/StockContext";
import StockBadge from "@/components/StockBadge";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import ProductImage from "@/components/ProductImage";

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { add } = useCart();
  const { getStock, decrement } = useStock();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <p className="font-serif text-2xl text-gold mb-4">{t("product.notFound")}</p>
        <Button asChild variant="luxeOutline"><Link to="/collection">{t("nav.collection")}</Link></Button>
      </div>
    );
  }

  const qty = getStock(product.id);
  const status = stockStatus(qty);
  const outOfStock = status === "out";

  const handleAdd = () => {
    if (outOfStock) return;
    const ok = decrement(product.id, 1);
    if (!ok) {
      toast.error(t("stock.unavailable"));
      return;
    }
    add(product.id);
    toast.success(`✦ ${t(product.nameKey)}`, { description: t("cart.addedDesc") });
  };

  const wa = `https://wa.me/212600000000?text=${encodeURIComponent(`Hello Tilila, I'd like to order: ${t(product.nameKey)} (${product.price} DH)`)}`;

  return (
    <section className="container py-12 md:py-20 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="group bg-card border border-border/50 overflow-hidden aspect-[4/5] rounded-md">
          <ProductImage src={product.image} alt={t(product.nameKey)} className="w-full h-full transition-luxe duration-700 group-hover:scale-105" />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-primary tracking-[0.3em] text-xs uppercase">Tilila Fragrance</p>
            <span className="text-[10px] tracking-[0.25em] uppercase border border-primary/40 text-primary px-2.5 py-1">
              {t(`categories.${product.category.toLowerCase()}`)}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-gold">{t(product.nameKey)}</h1>
          <div className="h-px w-24 bg-gold" />
          <StockBadge qty={qty} showQty />
          <p className="text-foreground/80 leading-relaxed text-lg">{t(product.fullDescKey)}</p>

          <div className="bg-card/60 border border-border/50 p-5 space-y-2">
            <p className="font-serif text-gold text-lg mb-3">{t("product.notes")}</p>
            <p className="text-sm"><span className="text-muted-foreground tracking-wider uppercase text-xs mr-2">{t("product.top")}:</span>{product.notes.top}</p>
            <p className="text-sm"><span className="text-muted-foreground tracking-wider uppercase text-xs mr-2">{t("product.middle")}:</span>{product.notes.middle}</p>
            <p className="text-sm"><span className="text-muted-foreground tracking-wider uppercase text-xs mr-2">{t("product.base")}:</span>{product.notes.base}</p>
          </div>

          <p className="font-serif text-4xl text-gold">{product.price} {t("collection.currency")}</p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={handleAdd} disabled={outOfStock} variant="luxe" size="lg" className="flex-1">
              <ShoppingBag className="w-4 h-4" /> {outOfStock ? t("stock.out") : t("product.addToCart")}
            </Button>
            <Button asChild variant="luxeOutline" size="lg" className="flex-1">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" /> {t("product.whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
