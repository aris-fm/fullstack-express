import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const PrivateRoutes = () => {
  const { isAuthenticated, previousLocationPathname } = useAuth();
  localStorage.setItem("initialUrl", previousLocationPathname);
  console.log(previousLocationPathname);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};
