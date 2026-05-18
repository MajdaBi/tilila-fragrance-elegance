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
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Cinematic background image with slow Ken Burns zoom */}
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Luxury perfumes"
            className="w-full h-full object-cover will-change-transform animate-[heroZoom_18s_ease-in-out_infinite_alternate]"
          />
          {/* Cinematic vignette + dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, transparent 45%, hsl(var(--background) / 0.85) 100%)",
            }}
          />
        </div>

        {/* Soft drifting smoke layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -inset-[20%] opacity-[0.18] mix-blend-screen animate-[smokeDrift_22s_ease-in-out_infinite_alternate]"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 30% 60%, hsl(43 70% 55% / 0.35), transparent 60%), radial-gradient(ellipse 50% 35% at 70% 40%, hsl(45 85% 70% / 0.25), transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -inset-[20%] opacity-[0.14] mix-blend-screen animate-[smokeDrift2_28s_ease-in-out_infinite_alternate]"
            style={{
              background:
                "radial-gradient(ellipse 45% 30% at 60% 70%, hsl(40 60% 80% / 0.3), transparent 60%), radial-gradient(ellipse 40% 30% at 20% 30%, hsl(43 70% 55% / 0.2), transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Gold glow halo behind text */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-60 animate-[goldPulse_6s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, hsl(43 70% 55% / 0.25) 0%, hsl(43 70% 55% / 0.08) 35%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Floating golden particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-primary/60"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                left: `${(i * 7.3) % 100}%`,
                bottom: `-10px`,
                boxShadow: "0 0 8px hsl(var(--primary) / 0.8)",
                animation: `particleRise ${12 + (i % 6)}s linear ${i * 0.8}s infinite`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center animate-[heroIn_1.6s_cubic-bezier(0.16,1,0.3,1)_both]">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-primary/70" />
            <p className="text-primary tracking-[0.4em] text-[10px] md:text-sm uppercase">
              Luxury · Elegance · Femininity
            </p>
            <span className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-primary/70" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold mb-6 leading-tight drop-shadow-[0_4px_30px_hsl(43_70%_55%/0.35)] animate-[shimmerText_6s_ease-in-out_infinite]">
            {t("hero.title")}
          </h1>
          <p className="text-base md:text-xl text-foreground/85 max-w-2xl mx-auto mb-10 font-light italic">
            {t("hero.subtitle")}
          </p>
          <Button
            asChild
            variant="luxe"
            size="lg"
            className="px-10 shadow-gold hover:scale-[1.03] transition-luxe"
          >
            <Link to="/collection">{t("hero.cta")}</Link>
          </Button>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 animate-[fadeFloat_3s_ease-in-out_infinite]">
          <span className="text-[10px] tracking-[0.4em] text-primary/80 uppercase">Scroll</span>
          <span className="block w-px h-10 bg-gradient-to-b from-primary/80 to-transparent" />
        </div>

        <style>{`
          @keyframes heroZoom {
            0% { transform: scale(1.05) translate3d(0,0,0); }
            100% { transform: scale(1.15) translate3d(-1%, -1%, 0); }
          }
          @keyframes smokeDrift {
            0% { transform: translate3d(-3%, 2%, 0) rotate(0deg); }
            100% { transform: translate3d(4%, -3%, 0) rotate(6deg); }
          }
          @keyframes smokeDrift2 {
            0% { transform: translate3d(4%, -2%, 0) rotate(0deg); }
            100% { transform: translate3d(-5%, 3%, 0) rotate(-8deg); }
          }
          @keyframes goldPulse {
            0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.75; transform: translate(-50%, -50%) scale(1.08); }
          }
          @keyframes particleRise {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
          }
          @keyframes heroIn {
            0% { opacity: 0; transform: translateY(30px); filter: blur(8px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          @keyframes shimmerText {
            0%, 100% { filter: drop-shadow(0 4px 30px hsl(43 70% 55% / 0.3)); }
            50% { filter: drop-shadow(0 4px 50px hsl(45 85% 70% / 0.55)); }
          }
          @keyframes fadeFloat {
            0%, 100% { transform: translate(-50%, 0); opacity: 0.5; }
            50% { transform: translate(-50%, 6px); opacity: 0.9; }
          }
        `}</style>
      </section>

      {/* Collection */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">— Collection —</p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">{t("collection.title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("collection.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter((p) => p.id !== "discovery-pack").map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Featured Bundle */}
      <FeaturedBundle />

      {/* Reviews */}
      <Reviews />
    </>
  );
};

export default Index;
