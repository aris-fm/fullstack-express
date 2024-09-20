import { UserLogin } from "../types";
import { RefreshTokenResponse } from "../utils/fetchInterceptor";
import { apiUrl } from "./urls";

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await fetch(apiUrl.token, { credentials: "include" });
  const { accessToken } = await response.json();
  return {
    accessToken,
    status: response.ok,
  };
};

export const loginRequest = async ({ email, password }: UserLogin) => {
  try {
    const response = await fetch(apiUrl.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const logoutRequest = async () => {
  await fetch(apiUrl.logout, {
    method: "DELETE",
    credentials: "include",
  });
};
