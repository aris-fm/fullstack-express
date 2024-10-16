import type {
  BaseGetRequest,
  User,
  UserRegister,
  WithPagination,
} from "@/types.ts";
import { interceptedFetch } from "@/utils/fetchInterceptor.ts";
import { apiUrl } from "@/apis/urls.ts";

export const fetchUsers = async (
  { limit = "", offset = "" }: BaseGetRequest = {},
): Promise<WithPagination<User>> => {
  const response = await interceptedFetch(
    `${apiUrl.users}?${new URLSearchParams({ limit, offset }).toString()}`,
  );
  const users: WithPagination<User> = await response.json();
  return users;
};

export const createUsers = async (
  { email, name, confPassword, password, username }: UserRegister,
) => {
  try {
    const response = await fetch(apiUrl.users, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password, confPassword, username }),
    });
    if (!response.ok) throw new Error("An error occured, please try again");
  } catch (error) {
    return error;
  }
};
