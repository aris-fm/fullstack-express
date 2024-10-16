import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import { PrivateRoutes } from "@/routes/PrivateRoutes.tsx";
import DashboardPage from "@/pages/DashboardPage.tsx";
import { PublicRoutes } from "@/routes/PublicRoutes.tsx";
import { AuthProvider } from "@/context/AuthContext.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" Component={DashboardPage} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
