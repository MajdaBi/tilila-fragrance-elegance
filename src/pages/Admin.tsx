import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOrders, ORDER_STATUSES, OrderStatus } from "@/context/OrdersContext";
import { useProducts } from "@/context/ProductsContext";
import { useStock, stockStatus } from "@/context/StockContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { ShoppingBag, Package, AlertTriangle, Users, Trash2, Plus, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import placeholder from "@/assets/perfume-1.jpg";

const USERS_KEY = "tilila_users";

const Admin = () => {
  const { t } = useTranslation();
  const { orders, updateStatus, deleteOrder } = useOrders();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { stock, getStock } = useStock();

  const customers = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as Array<{ name: string; email: string; role?: string }>;
    } catch {
      return [];
    }
  }, [orders]); // refresh when orders change

  const lowStockCount = useMemo(
    () => products.filter((p) => {
      const s = getStock(p.id);
      return s > 0 && s <= 5;
    }).length,
    [products, stock, getStock],
  );

  const totalCustomers = customers.filter((c) => c.role !== "admin").length;

  // Add product dialog state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    full: "",
    price: 0,
    category: "Vanilla" as "Vanilla" | "Musk" | "Floral",
    top: "",
    middle: "",
    base: "",
    initialStock: 10,
    image: "",
  });

  const resetForm = () => setForm({
    name: "", desc: "", full: "", price: 0, category: "Vanilla",
    top: "", middle: "", base: "", initialStock: 10, image: "",
  });

  const handleCreate = () => {
    if (!form.name.trim() || form.price <= 0) {
      toast.error(t("admin.formError"));
      return;
    }
    const id = `custom-${Date.now().toString(36)}`;
    const nameKey = `custom.${id}.name`;
    const descKey = `custom.${id}.desc`;
    const fullKey = `custom.${id}.full`;
    // Inject runtime translations so t() returns the entered name
    import("i18next").then((mod) => {
      const i18n = (mod as any).default;
      ["en", "fr", "ar"].forEach((lng) => {
        i18n.addResource(lng, "translation", nameKey, form.name);
        i18n.addResource(lng, "translation", descKey, form.desc);
        i18n.addResource(lng, "translation", fullKey, form.full || form.desc);
      });
    });
    addProduct({
      nameKey,
      descKey,
      fullDescKey: fullKey,
      price: Number(form.price),
      image: form.image || placeholder,
      category: form.category,
      notes: { top: form.top, middle: form.middle, base: form.base },
      initialStock: Number(form.initialStock),
    });
    toast.success(t("admin.productAdded"));
    setOpen(false);
    resetForm();
  };

  const handleStockChange = (id: string, value: string) => {
    const n = Math.max(0, parseInt(value) || 0);
    // We persist stock via StockContext localStorage; simplest path: write directly
    try {
      const KEY = "tilila_stock_v1";
      const cur = JSON.parse(localStorage.getItem(KEY) || "{}");
      cur[id] = n;
      localStorage.setItem(KEY, JSON.stringify(cur));
      // force reload of stock state
      window.dispatchEvent(new Event("storage"));
      toast.success(t("admin.stockUpdated"));
    } catch {}
  };

  const handleDelete = (id: string) => {
    if (!confirm(t("admin.confirmDelete"))) return;
    deleteProduct(id);
    toast.success(t("admin.productDeleted"));
  };

  return (
    <section className="container py-12 md:py-16 animate-fade-in">
      <div className="text-center mb-10">
        <p className="text-primary tracking-[0.3em] text-xs uppercase mb-3">— Admin —</p>
        <h1 className="font-serif text-4xl md:text-5xl text-gold">{t("admin.title")}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        <StatCard icon={<ShoppingBag className="w-5 h-5" />} label={t("admin.stats.totalOrders")} value={orders.length} />
        <StatCard icon={<Clock className="w-5 h-5" />} label={t("admin.stats.pending")} value={orders.filter(o => o.status === "pending").length} accent={orders.some(o => o.status === "pending")} />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label={t("admin.stats.confirmed")} value={orders.filter(o => o.status === "confirmed").length} />
        <StatCard icon={<Package className="w-5 h-5" />} label={t("admin.stats.totalProducts")} value={products.length} />
        <StatCard icon={<AlertTriangle className="w-5 h-5" />} label={t("admin.stats.lowStock")} value={lowStockCount} accent={lowStockCount > 0} />
        <StatCard icon={<Users className="w-5 h-5" />} label={t("admin.stats.customers")} value={totalCustomers} />
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-card border border-border/50 mb-6">
          <TabsTrigger value="orders">{t("admin.tabs.orders")}</TabsTrigger>
          <TabsTrigger value="products">{t("admin.tabs.products")}</TabsTrigger>
          <TabsTrigger value="customers">{t("admin.tabs.customers")}</TabsTrigger>
        </TabsList>

        {/* Orders */}
        <TabsContent value="orders">
          {orders.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{t("orders.empty")}</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="bg-card border border-border/50 p-4 grid md:grid-cols-[1fr_auto] gap-4 items-start hover:border-primary/40 transition-luxe">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-serif text-gold">{o.id}</p>
                      <OrderStatusBadge status={o.status} />
                    </div>
                    <p className="text-sm text-foreground/80">{o.customerName} · <span className="text-muted-foreground">{o.customerEmail}</span></p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(o.date).toLocaleString()} · {o.items.reduce((s, i) => s + i.quantity, 0)} {t("admin.items")} · {o.total} {t("collection.currency")}
                    </p>
                    <details className="text-xs">
                      <summary className="cursor-pointer text-primary hover:underline">{t("admin.viewDetails")}</summary>
                      <div className="mt-2 space-y-1 text-foreground/80 pl-3 border-l border-border">
                        {o.items.map((i) => (
                          <p key={i.id}>{t(i.nameKey)} × {i.quantity}</p>
                        ))}
                        <p className="text-muted-foreground">{o.address} · {o.phone}</p>
                      </div>
                    </details>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v as OrderStatus)}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>{t(`orders.status.${s}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Products */}
        <TabsContent value="products">
          <div className="flex justify-end mb-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="luxe"><Plus className="w-4 h-4" /> {t("admin.addProduct")}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-serif text-gold">{t("admin.addProduct")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Field label={t("admin.fields.name")}>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </Field>
                  <Field label={t("admin.fields.shortDesc")}>
                    <Input value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
                  </Field>
                  <Field label={t("admin.fields.fullDesc")}>
                    <Input value={form.full} onChange={(e) => setForm({ ...form, full: e.target.value })} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label={t("admin.fields.price")}>
                      <Input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                    </Field>
                    <Field label={t("admin.fields.stock")}>
                      <Input type="number" min={0} value={form.initialStock} onChange={(e) => setForm({ ...form, initialStock: Number(e.target.value) })} />
                    </Field>
                  </div>
                  <Field label={t("admin.fields.category")}>
                    <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vanilla">{t("categories.vanilla")}</SelectItem>
                        <SelectItem value="Musk">{t("categories.musk")}</SelectItem>
                        <SelectItem value="Floral">{t("categories.floral")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label={t("product.top")}>
                      <Input value={form.top} onChange={(e) => setForm({ ...form, top: e.target.value })} />
                    </Field>
                    <Field label={t("product.middle")}>
                      <Input value={form.middle} onChange={(e) => setForm({ ...form, middle: e.target.value })} />
                    </Field>
                    <Field label={t("product.base")}>
                      <Input value={form.base} onChange={(e) => setForm({ ...form, base: e.target.value })} />
                    </Field>
                  </div>
                  <Field label={t("admin.fields.imageUrl")}>
                    <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                  </Field>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>{t("admin.cancel")}</Button>
                  <Button variant="luxe" onClick={handleCreate}>{t("admin.save")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-3">
            {products.map((p) => {
              const s = getStock(p.id);
              const status = stockStatus(s);
              return (
                <div key={p.id} className="bg-card border border-border/50 p-4 flex flex-wrap items-center gap-4 hover:border-primary/40 transition-luxe">
                  <img src={p.image} alt={t(p.nameKey)} className="w-16 h-20 object-cover" />
                  <div className="flex-1 min-w-[180px]">
                    <p className="font-serif">{t(p.nameKey)}</p>
                    <p className="text-xs text-muted-foreground">{t(`categories.${p.category.toLowerCase()}`)} · {p.price} {t("collection.currency")}</p>
                    <p className={`text-xs mt-1 ${status === "out" ? "text-destructive" : status === "low" ? "text-primary" : "text-emerald-400"}`}>
                      {t(`stock.${status}`)} ({s})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">{t("admin.fields.stock")}</Label>
                    <Input
                      type="number"
                      min={0}
                      defaultValue={s}
                      onBlur={(e) => handleStockChange(p.id, e.target.value)}
                      className="w-20"
                    />
                    <Input
                      type="number"
                      min={0}
                      defaultValue={p.price}
                      onBlur={(e) => updateProduct(p.id, { price: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-24"
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} aria-label="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Customers */}
        <TabsContent value="customers">
          <div className="bg-card border border-border/50 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium tracking-wider text-xs uppercase">{t("admin.fields.name")}</th>
                  <th className="px-4 py-3 font-medium tracking-wider text-xs uppercase">{t("auth.email")}</th>
                  <th className="px-4 py-3 font-medium tracking-wider text-xs uppercase">{t("admin.role")}</th>
                  <th className="px-4 py-3 font-medium tracking-wider text-xs uppercase">{t("admin.ordersCount")}</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const count = orders.filter((o) => o.customerEmail.toLowerCase() === c.email.toLowerCase()).length;
                  return (
                    <tr key={c.email} className="border-t border-border/40 hover:bg-secondary/30 transition-luxe">
                      <td className="px-4 py-3">{c.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border ${c.role === "admin" ? "border-primary/60 text-primary" : "border-border text-muted-foreground"}`}>
                          {c.role || "user"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gold">{count}</td>
                    </tr>
                  );
                })}
                {customers.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">{t("admin.noCustomers")}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

const StatCard = ({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent?: boolean }) => (
  <div className={`bg-card border ${accent ? "border-primary/60 shadow-gold" : "border-border/50"} p-5 transition-luxe hover:border-primary/40`}>
    <div className="flex items-center justify-between mb-3 text-primary">{icon}</div>
    <p className="font-serif text-3xl text-gold">{value}</p>
    <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">{label}</p>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-xs tracking-wider uppercase text-muted-foreground">{label}</Label>
    <div className="mt-1.5">{children}</div>
  </div>
);

export default Admin;
