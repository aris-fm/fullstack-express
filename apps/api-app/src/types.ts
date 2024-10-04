import { Model } from "sequelize";

export interface User extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
}
