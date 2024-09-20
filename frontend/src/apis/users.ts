import { User } from "../types";
import { interceptedFetch } from "../utils/fetchInterceptor";
import { apiUrl } from "./urls";

export const fetchData = async (): Promise<User[]> => {
  const response = await interceptedFetch(apiUrl.users);
  const users: User[] = await response.json();
  return users;
};
