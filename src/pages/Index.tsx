import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import hero from "@/assets/hero-perfume.jpg";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import Reviews from "@/components/Reviews";
import FeaturedBundle from "@/components/FeaturedBundle";

const Index = () => {
  const { t } = useTranslation();
  const { products } = useProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={hero} alt="Luxury perfumes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>
        <div className="relative z-10 container text-center animate-fade-in-slow">
          <p className="text-primary tracking-[0.4em] text-xs md:text-sm mb-6 uppercase">Luxury · Elegance · Femininity</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold mb-6 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-base md:text-xl text-foreground/85 max-w-2xl mx-auto mb-10 font-light italic">
            {t("hero.subtitle")}
          </p>
          <Button asChild variant="luxe" size="lg" className="px-10">
            <Link to="/collection">{t("hero.cta")}</Link>
          </Button>
        </div>
      </section>

      {/* Collection */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">— Collection —</p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">{t("collection.title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("collection.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Reviews */}
      <Reviews />
    </>
  );
};

export default Index;
