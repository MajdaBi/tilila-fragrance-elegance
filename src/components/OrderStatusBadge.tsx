import { useTranslation } from "react-i18next";
import { OrderStatus } from "@/context/OrdersContext";
import { cn } from "@/lib/utils";

const styles: Record<OrderStatus, string> = {
  pending: "bg-muted text-muted-foreground border-border",
  confirmed: "bg-primary/10 text-primary border-primary/40",
  preparing: "bg-primary/15 text-primary border-primary/50",
  shipped: "bg-primary/20 text-primary border-primary/60",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/40",
  cancelled: "bg-destructive/10 text-destructive border-destructive/40",
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const { t } = useTranslation();
  return (
    <span
      className={cn(
        "inline-block text-[10px] tracking-[0.2em] uppercase px-3 py-1 border",
        styles[status],
      )}
    >
      {t(`orders.status.${status}`)}
    </span>
  );
};

export default OrderStatusBadge;
