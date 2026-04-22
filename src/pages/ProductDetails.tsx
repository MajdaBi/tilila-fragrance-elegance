import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { add } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <p className="font-serif text-2xl text-gold mb-4">{t("product.notFound")}</p>
        <Button asChild variant="luxeOutline"><Link to="/collection">{t("nav.collection")}</Link></Button>
      </div>
    );
  }

  const handleAdd = () => {
    add(product.id);
    toast.success(`${t(product.nameKey)} ✦`);
  };

  const wa = `https://wa.me/212600000000?text=${encodeURIComponent(`Hello Tilila, I'd like to order: ${t(product.nameKey)} (${product.price} DH)`)}`;

  return (
    <section className="container py-12 md:py-20 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="bg-card border border-border/50 overflow-hidden aspect-[4/5]">
          <img src={product.image} alt={t(product.nameKey)} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <p className="text-primary tracking-[0.3em] text-xs uppercase">Tilila Fragrance</p>
          <h1 className="font-serif text-4xl md:text-5xl text-gold">{t(product.nameKey)}</h1>
          <div className="h-px w-24 bg-gold" />
          <p className="text-foreground/80 leading-relaxed text-lg">{t(product.descKey)}</p>
          <p className="font-serif text-4xl text-gold">{product.price} {t("collection.currency")}</p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleAdd} variant="luxe" size="lg" className="flex-1">
              <ShoppingBag className="w-4 h-4" /> {t("product.addToCart")}
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
