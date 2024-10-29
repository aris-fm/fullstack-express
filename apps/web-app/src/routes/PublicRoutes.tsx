import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.tsx";

export const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();
  const initialUrl = localStorage.getItem("initialUrl");
  if (isAuthenticated) return <Navigate to={initialUrl || "/"} replace />;
  return <Outlet />;
};
