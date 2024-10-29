import { DataTypes, type Model, type Optional } from "sequelize";
import { db } from "@/config/db.ts";
import type { User as UserBaseInstance } from "@common/types/User.ts";

interface UserInstance extends Optional<UserBaseInstance, "id"> {
  refresh_token?: string | null;
}

interface UserModel extends Model<UserInstance>, UserInstance {}

export const User = db.define<UserModel>(
  "User",
  {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    refresh_token: { type: DataTypes.TEXT },
    username: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: "users",
  },
);
