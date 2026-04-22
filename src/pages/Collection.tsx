import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Collection = () => {
  const { t } = useTranslation();
  return (
    <section className="container py-16 md:py-24">
      <div className="text-center mb-14 animate-fade-in">
        <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">— Tilila —</p>
        <h1 className="font-serif text-4xl md:text-6xl text-gold mb-4">{t("collection.title")}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{t("collection.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
};

export default Collection;
