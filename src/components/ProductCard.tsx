import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useStock } from "@/context/StockContext";
import StockBadge from "@/components/StockBadge";
import ProductImage from "@/components/ProductImage";

const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const { getStock } = useStock();
  const qty = getStock(product.id);

  return (
    <article className="group bg-card border border-border/50 overflow-hidden transition-luxe hover:border-primary/60 hover:shadow-gold animate-fade-in">
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-secondary aspect-[4/5] relative rounded-md">
        <ProductImage
          src={product.image}
          alt={t(product.nameKey)}
          className="w-full h-full transition-luxe duration-700 group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.25em] uppercase bg-background/80 backdrop-blur border border-primary/40 text-primary px-2.5 py-1">
          {t(`categories.${product.category.toLowerCase()}`)}
        </span>
      </Link>
      <div className="p-6 text-center">
        <h3 className="font-serif text-xl mb-2">{t(product.nameKey)}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">{t(product.descKey)}</p>
        <div className="flex justify-center mb-4">
          <StockBadge qty={qty} />
        </div>
        <p className="text-gold font-serif text-2xl mb-5">{product.price} {t("collection.currency")}</p>
        <Button asChild variant="luxe" className="w-full">
          <Link to={`/product/${product.id}`}>{t("collection.viewDetails")}</Link>
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
