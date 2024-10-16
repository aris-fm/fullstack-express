import React, { useReducer, useState } from "react";
import type { UserRegister } from "@/types.ts";
import { createUsers } from "@/apis/users.ts";
import { useNavigate } from "react-router";

enum UserRegisterType {
  EDIT_NAME = "EDIT_NAME",
  EDIT_EMAIL = "EDIT_EMAIL",
  EDIT_PASSWORD = "EDIT_PASSWORD",
  EDIT_PASSWORD_CONFIRMATION = "EDIT_PASSWORD_CONFIRMATION",
  EDIT_USERNAME = "EDIT_USERNAME",
}

interface UserRegisterAction {
  type: UserRegisterType;
  payload: string;
}

const userData: UserRegister = {
  name: "",
  email: "",
  password: "",
  confPassword: "",
  username: "",
};

const reducer = (
  state: UserRegister,
  action: UserRegisterAction,
): UserRegister => {
  switch (action.type) {
    case UserRegisterType.EDIT_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UserRegisterType.EDIT_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case UserRegisterType.EDIT_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case UserRegisterType.EDIT_PASSWORD_CONFIRMATION:
      return {
        ...state,
        confPassword: action.payload,
      };
    case UserRegisterType.EDIT_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

const RegisterPage = () => {
  const [state, dispatch] = useReducer(reducer, userData);
  const [loading, setLoading] = useState(false);
  const { name, email, password, confPassword, username } = state;
  const navigate = useNavigate();

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUsers(state).then(() => {
        setLoading(false);
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center bg-slate-200 dark:bg-slate-800 p-16 rounded-lg shadow-md">
        <div className="w-[30rem]">
          <h1 className="text-4xl uppercase font-medium">Register</h1>

          <form onSubmit={registerUser}>
            <label className="form-control my-3" htmlFor="formName">
              <div className="label">
                <span className="label-text">Full Name</span>
              </div>
              <input
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(event) =>
                  dispatch({
                    type: UserRegisterType.EDIT_NAME,
                    payload: event.target.value,
                  })}
                id="formName"
              />
            </label>

            <label className="form-control my-3" htmlFor="formUserName">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full"
                value={username}
                onChange={(event) =>
                  dispatch({
                    type: UserRegisterType.EDIT_USERNAME,
                    payload: event.target.value,
                  })}
                id="formUserName"
              />
            </label>

            <label className="form-control my-3" htmlFor="formEmail">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="name@email.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(event) =>
                  dispatch({
                    type: UserRegisterType.EDIT_EMAIL,
                    payload: event.target.value,
                  })}
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
                onChange={(event) =>
                  dispatch({
                    type: UserRegisterType.EDIT_PASSWORD,
                    payload: event.target.value,
                  })}
              />
            </label>
            <label className="form-control my-3" htmlFor="formConfirmPass">
              <div className="label">
                <span className="label-text">Confirm Password</span>
              </div>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered w-full"
                value={confPassword}
                id="formConfirmPass"
                onChange={(event) =>
                  dispatch({
                    type: UserRegisterType.EDIT_PASSWORD_CONFIRMATION,
                    payload: event.target.value,
                  })}
              />
            </label>
            <input
              type="submit"
              disabled={loading}
              value="Register"
              className="btn btn-block btn-primary my-3"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
