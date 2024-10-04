import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { loginRequest, logoutRequest, refreshToken } from "../apis/auth";

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (loginData: LoginData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await refreshToken()
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    };

    checkAuthStatus();
  }, []);

  const login = async ({ email, password }: LoginData) => {
    const token = await loginRequest({ email, password });
    return token ? setIsAuthenticated(true) : setIsAuthenticated(false);
  };
  const logout = async () => {
    await logoutRequest().then(() => setIsAuthenticated(false));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
