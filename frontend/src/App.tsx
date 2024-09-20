import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import DashboardPage from "./pages/DashboardPage";
import { PublicRoutes } from "./routes/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" Component={DashboardPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
