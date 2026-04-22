import { useTranslation } from "react-i18next";
import { OrderStatus } from "@/context/OrdersContext";
import { Check, Clock, Package, Truck, Home, X } from "lucide-react";
import { cn } from "@/lib/utils";

const flow: { key: OrderStatus; icon: typeof Check }[] = [
  { key: "pending", icon: Clock },
  { key: "confirmed", icon: Check },
  { key: "preparing", icon: Package },
  { key: "shipped", icon: Truck },
  { key: "delivered", icon: Home },
];

const OrderProgress = ({ status }: { status: OrderStatus }) => {
  const { t } = useTranslation();

  if (status === "cancelled") {
    return (
      <div className="flex items-center justify-center gap-2 text-destructive border border-destructive/40 bg-destructive/5 py-3">
        <X className="w-4 h-4" />
        <span className="text-xs tracking-[0.2em] uppercase">{t("orders.status.cancelled")}</span>
      </div>
    );
  }

  const currentIdx = flow.findIndex((s) => s.key === status);

  return (
    <div className="w-full">
      <div className="flex items-start justify-between relative">
        {/* progress line */}
        <div className="absolute top-4 left-4 right-4 h-px bg-border -z-0" />
        <div
          className="absolute top-4 left-4 h-px bg-gold -z-0 transition-all duration-700"
          style={{
            width: `calc(${(currentIdx / (flow.length - 1)) * 100}% - ${currentIdx === flow.length - 1 ? "0px" : "0px"})`,
            maxWidth: "calc(100% - 2rem)",
          }}
        />
        {flow.map((step, idx) => {
          const Icon = step.icon;
          const reached = idx <= currentIdx;
          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 flex-1 min-w-0">
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-luxe",
                  reached
                    ? "border-primary bg-primary text-primary-foreground shadow-gold"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span
                className={cn(
                  "text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-center px-1",
                  reached ? "text-primary" : "text-muted-foreground",
                )}
              >
                {t(`orders.status.${step.key}`)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgress;
