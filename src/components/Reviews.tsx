import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <section className="container py-20 md:py-28">
      <div className="text-center mb-14 animate-fade-in">
        <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">— {t("reviews.eyebrow")} —</p>
        <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">{t("reviews.title")}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{t("reviews.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <article
            key={r.id}
            className="group bg-card border border-border/50 p-6 transition-luxe hover:border-primary/60 hover:shadow-gold hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-1 mb-4 text-gold">
              {Array.from({ length: r.rating }).map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-foreground/85 leading-relaxed italic mb-6">“{r.text}”</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center font-serif text-gold">
                {r.name.charAt(0)}
              </div>
              <div>
                <p className="font-serif text-base">{r.name}</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">{r.city}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
