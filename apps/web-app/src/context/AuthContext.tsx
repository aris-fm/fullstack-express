import { createContext, useContext, useState, type ReactNode, useEffect, type FC } from "react";
import { loginRequest, logoutRequest, refreshToken } from "@/apis/auth";
import { useLocation } from "react-router-dom";

interface LoginData {
  emailOrUsername: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (loginData: LoginData) => void;
  logout: () => void;
  previousLocationPathname: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { pathname, search } = useLocation();
  const previousLocationPathname = `${pathname}${search}`;

  useEffect(() => {
    const checkAuthStatus = async () => {
      await refreshToken()
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    };

    checkAuthStatus();
  }, []);

  const login = async ({ emailOrUsername, password }: LoginData) => {
    const isEmail = emailOrUsername.includes("@");
    // const body = {}
    const token = await loginRequest({
      ...(isEmail && { email: emailOrUsername }),
      ...(!isEmail && { username: emailOrUsername }),
      password,
    });
    return token ? setIsAuthenticated(true) : setIsAuthenticated(false);
  };
  const logout = async () => {
    await logoutRequest().then(() => setIsAuthenticated(false));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, previousLocationPathname }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
