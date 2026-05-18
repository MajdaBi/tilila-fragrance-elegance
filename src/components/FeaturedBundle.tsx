import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sparkles, Gift, Truck, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/context/ProductsContext";

const FeaturedBundle = () => {
  const { t } = useTranslation();
  const { getProduct } = useProducts();
  const pack = getProduct("discovery-pack");
  if (!pack) return null;

  const features = [
    { icon: Package, label: t("bundle.feat1") },
    { icon: Truck, label: t("bundle.feat2") },
    { icon: Gift, label: t("bundle.feat3") },
    { icon: Check, label: t("bundle.feat4") },
  ];

  return (
    <section className="container py-20 md:py-28">
      <div className="text-center mb-12 animate-fade-in">
        <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">{t("bundle.eyebrow")}</p>
        <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">{t("bundle.title")}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto italic">{t("bundle.tagline")}</p>
      </div>

      <article className="group relative max-w-6xl mx-auto bg-card border border-primary/40 overflow-hidden shadow-gold transition-luxe hover:border-primary hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/0.5)] animate-fade-in">
        {/* Decorative gold corners */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-primary/60" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-primary/60" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-primary/60" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-primary/60" />
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <Link
            to={`/product/${pack.id}`}
            className="relative block overflow-hidden bg-secondary aspect-[4/5] md:aspect-auto md:min-h-[520px] rounded-none"
          >
            <img
              src={pack.image}
              alt={t(pack.nameKey)}
              loading="lazy"
              className="w-full h-full object-cover transition-luxe duration-700 group-hover:scale-110"
            />
            {/* Badges */}
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-gradient-to-r from-gold to-primary text-primary-foreground text-[10px] tracking-[0.25em] uppercase font-medium px-3 py-1.5 shadow-gold">
              <Sparkles className="w-3 h-3" /> {t("bundle.badge")}
            </span>
            <span className="absolute top-4 right-4 text-[10px] tracking-[0.25em] uppercase bg-background/80 backdrop-blur border border-primary/60 text-primary px-2.5 py-1">
              {t("bundle.limited")}
            </span>
          </Link>

          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div>
              <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">Tilila Exclusive</p>
              <h3 className="font-serif text-3xl md:text-4xl text-gold mb-3">{t(pack.nameKey)}</h3>
              <div className="h-px w-20 bg-gold mb-4" />
              <p className="text-foreground/80 leading-relaxed">{t(pack.descKey)}</p>
            </div>

            <ul className="space-y-3">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center justify-center w-8 h-8 border border-primary/40 text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-foreground/90">{label}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-end justify-between pt-2 border-t border-border/50">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  {t("bundle.feat2")}
                </p>
                <p className="font-serif text-4xl md:text-5xl text-gold">
                  {pack.price} {t("collection.currency")}
                </p>
              </div>
            </div>

            <Button asChild variant="luxe" size="lg" className="w-full">
              <Link to={`/product/${pack.id}`}>{t("bundle.cta")}</Link>
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default FeaturedBundle;
