export interface BaseUser {
  id: number;
  name: string;
  email: string;
  password: string;
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
