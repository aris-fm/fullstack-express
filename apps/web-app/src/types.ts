export interface BaseUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type UserLogin = Omit<BaseUser, "id" | "name">;
export type User = Omit<BaseUser, "password">;
export type UserRegister = BaseUser & { confPassword: string };
