import { useTranslation } from "react-i18next";
import { stockStatus } from "@/context/StockContext";
import { cn } from "@/lib/utils";

interface Props {
  qty: number;
  showQty?: boolean;
  className?: string;
}

const StockBadge = ({ qty, showQty = false, className }: Props) => {
  const { t } = useTranslation();
  const status = stockStatus(qty);

  const styles =
    status === "in"
      ? "bg-primary/10 text-primary border-primary/30"
      : status === "low"
      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
      : "bg-destructive/10 text-destructive border-destructive/30";

  const label =
    status === "in" ? t("stock.in") : status === "low" ? t("stock.low") : t("stock.out");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border px-3 py-1 rounded-full transition-luxe",
        styles,
        className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", status === "in" ? "bg-primary" : status === "low" ? "bg-amber-400" : "bg-destructive")} />
      {label}
      {showQty && status !== "out" && (
        <span className="opacity-80 normal-case tracking-normal">· {qty} {t("stock.left")}</span>
      )}
    </span>
  );
};

export default StockBadge;
