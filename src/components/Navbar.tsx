import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, isAdmin, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const langs = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ar", label: "AR" },
  ];

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `transition-luxe text-sm tracking-wider uppercase hover:text-primary ${isActive ? "text-primary" : "text-foreground/80"}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="font-serif text-2xl md:text-3xl text-gold tracking-wide">
          Tilila <span className="font-light">Fragrance</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkCls} end>{t("nav.home")}</NavLink>
          <NavLink to="/collection" className={linkCls}>{t("nav.collection")}</NavLink>
          <NavLink to="/cart" className={linkCls}>
            <span className="inline-flex items-center gap-2">
              {t("nav.cart")}
              {count > 0 && <span className="bg-gold text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">{count}</span>}
            </span>
          </NavLink>
          {user ? (
            <>
              <NavLink to="/orders" className={linkCls}>{t("nav.orders")}</NavLink>
              {isAdmin && <NavLink to="/admin" className={linkCls}>{t("nav.admin")}</NavLink>}
              <span className="text-sm text-primary font-medium">{t("auth.welcome")}, {user.name.split(" ")[0]}</span>
              <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }} className="border-primary/40 hover:bg-primary hover:text-primary-foreground">
                {t("nav.logout")}
              </Button>
            </>
          ) : (
            <NavLink to="/login" className={linkCls}>{t("nav.login")}</NavLink>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm uppercase tracking-wider text-foreground/80 hover:text-primary transition-luxe">
              <Globe className="w-4 h-4" />
              {i18n.language.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              {langs.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)} className="cursor-pointer">
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-primary" />
            {count > 0 && <span className="absolute -top-2 -right-2 bg-gold text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">{count}</span>}
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <nav className="container flex flex-col py-6 gap-4">
            <NavLink to="/" onClick={() => setOpen(false)} className={linkCls} end>{t("nav.home")}</NavLink>
            <NavLink to="/collection" onClick={() => setOpen(false)} className={linkCls}>{t("nav.collection")}</NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)} className={linkCls}>{t("nav.cart")} {count > 0 && `(${count})`}</NavLink>
            {user ? (
              <>
                <NavLink to="/orders" onClick={() => setOpen(false)} className={linkCls}>{t("nav.orders")}</NavLink>
                {isAdmin && <NavLink to="/admin" onClick={() => setOpen(false)} className={linkCls}>{t("nav.admin")}</NavLink>}
                <span className="text-sm text-primary">{t("auth.welcome")}, {user.name}</span>
                <button onClick={() => { logout(); setOpen(false); navigate("/"); }} className="text-left text-sm uppercase tracking-wider text-foreground/80">{t("nav.logout")}</button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)} className={linkCls}>{t("nav.login")}</NavLink>
            )}
            <div className="flex gap-3 pt-2 border-t border-border">
              {langs.map((l) => (
                <button key={l.code} onClick={() => i18n.changeLanguage(l.code)} className={`text-sm tracking-wider ${i18n.language === l.code ? "text-primary" : "text-foreground/60"}`}>
                  {l.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
