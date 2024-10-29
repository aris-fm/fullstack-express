import type { User as CommonUser } from "@common/types/User.ts";

export interface BaseUser extends Omit<CommonUser, "username"> {
  username?: string;
}

export type UserLogin = Omit<BaseUser, "id" | "name">;
export type User = Omit<BaseUser, "password">;
export type UserRegister = Omit<BaseUser, "id"> & { confPassword: string };

export interface BaseGetRequest {
  offset?: string;
  limit?: string;
}

export interface WithPagination<T> {
  count: number;
  rows: T[];
}
