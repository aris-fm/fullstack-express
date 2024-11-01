import type { Optional } from "@common/types/helper.ts";
import type { User as CommonUser } from "@common/types/User.ts";

export interface BaseUser extends Optional<CommonUser, "username"> {}

export type UserLogin = Omit<BaseUser, "id" | "name">;
export type User = Omit<BaseUser, "password">;
export type UserRegister = Omit<BaseUser, "id"> & { confPassword: string };
