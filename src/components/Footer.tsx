import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="container py-10 text-center">
        <h3 className="font-serif text-2xl text-gold mb-2">Tilila Fragrance</h3>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tilila Fragrance — {t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
