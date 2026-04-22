import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  return (
    <article className="group bg-card border border-border/50 overflow-hidden transition-luxe hover:border-primary/60 hover:shadow-gold animate-fade-in">
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-secondary aspect-[4/5]">
        <img
          src={product.image}
          alt={t(product.nameKey)}
          loading="lazy"
          className="w-full h-full object-cover transition-luxe duration-700 group-hover:scale-110"
        />
      </Link>
      <div className="p-6 text-center">
        <h3 className="font-serif text-xl mb-2">{t(product.nameKey)}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">{t(product.descKey)}</p>
        <p className="text-gold font-serif text-2xl mb-5">{product.price} {t("collection.currency")}</p>
        <Button asChild variant="luxe" className="w-full">
          <Link to={`/product/${product.id}`}>{t("collection.viewDetails")}</Link>
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
