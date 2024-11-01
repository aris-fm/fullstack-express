import type { BaseGetRequest, WithPagination } from "@/types/Fetch.ts";
import { interceptedFetch } from "@/utils/fetchInterceptor.ts";
import { apiUrl } from "@/apis/urls.ts";
import type { User, UserRegister } from "@/types/User.ts";

export const fetchUsers = async (
  { limit = "", offset = "" }: BaseGetRequest = {},
): Promise<WithPagination<User>> => {
  const response = await interceptedFetch(
    `${apiUrl.users}?${
      new URLSearchParams({ limit, offset, sort: "DESC" }).toString()
    }`,
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
