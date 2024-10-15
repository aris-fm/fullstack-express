import type { UserLogin } from "@/types";
import type { RefreshTokenResponse } from "@/utils/fetchInterceptor";
import { apiUrl } from "./urls";

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await fetch(apiUrl.token, { credentials: "include" });
  const { accessToken } = await response.json();
  return {
    accessToken,
    status: response.ok,
  };
};

export const loginRequest = async ({ username, email, password }: Partial<UserLogin>) => {
  try {
    const body = {
      ...(username && { username }),
      ...(email && { email }),
      password,
    };
    const response = await fetch(apiUrl.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
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
