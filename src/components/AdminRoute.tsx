import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) toast.error(t("auth.loginRequired"));
    else if (!isAdmin) toast.error(t("admin.notAuthorized"));
  }, [user, isAdmin, t]);

  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default AdminRoute;
