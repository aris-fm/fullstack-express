export interface BaseUser {
  name: string;
  email: string;
  password: string;
}

export type UserLogin = Omit<BaseUser, "name">;
export type User = Omit<BaseUser, "password">;
