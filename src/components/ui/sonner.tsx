import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card/95 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-primary/40 group-[.toaster]:shadow-gold group-[.toaster]:rounded-none group-[.toaster]:font-serif group-[.toaster]:tracking-wide",
          title: "group-[.toast]:text-gold group-[.toast]:font-serif",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:font-sans group-[.toast]:text-xs group-[.toast]:tracking-wider",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-primary/60 group-[.toaster]:[&_svg]:text-primary",
          error: "group-[.toaster]:border-destructive/60 group-[.toaster]:[&_svg]:text-destructive",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
