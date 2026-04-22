import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) toast.error(t("auth.loginRequired"));
  }, [user, t]);

  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
