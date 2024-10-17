import { DataTypes, type Model } from "sequelize";
import { db } from "@/config/db.ts";
import type { User } from "@/types.ts";

interface UserModel extends Model, User {}

export const users = db.define<UserModel>(
  "users",
  {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    refresh_token: { type: DataTypes.TEXT },
    username: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
  },
);
