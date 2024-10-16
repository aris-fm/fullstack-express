import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.tsx";

export const PrivateRoutes = () => {
  const { isAuthenticated, previousLocationPathname } = useAuth();
  localStorage.setItem("initialUrl", previousLocationPathname);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};
