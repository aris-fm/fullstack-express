import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ emailOrUsername, password });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center bg-slate-200 dark:bg-slate-800 p-16 rounded-lg shadow-md">
        <div className="w-[30rem]">
          <h1 className="text-4xl uppercase font-medium">Login</h1>
          <form onSubmit={handleLogin}>
            <label className="form-control my-3" htmlFor="formEmail">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="name@email.com"
                className="input input-bordered w-full"
                value={emailOrUsername}
                onChange={(event) => setEmailOrUsername(event.target.value)}
                id="formEmail"
              />
            </label>
            <label className="form-control my-3" htmlFor="formPass">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                value={password}
                id="formPass"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <input type="submit" value="Login" className="btn btn-block btn-primary my-3" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
