import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(form.email, form.password)) {
      toast.success(`${t("auth.welcome")} ✦`, { description: t("auth.welcomeBack") });
      navigate(from, { replace: true });
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <section className="container py-16 md:py-24 max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-gold mb-2">{t("auth.loginTitle")}</h1>
        <p className="text-muted-foreground">{t("auth.loginSubtitle")}</p>
      </div>
      <form onSubmit={submit} className="bg-card border border-border/50 p-8 space-y-5">
        <div>
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2" required />
        </div>
        <div>
          <Label htmlFor="password">{t("auth.password")}</Label>
          <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-2" required minLength={4} />
        </div>
        <Button type="submit" variant="luxe" className="w-full" size="lg">{t("auth.login")}</Button>
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.noAccount")} <Link to="/signup" className="text-primary hover:underline">{t("auth.signup")}</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
