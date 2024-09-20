import { DataTypes } from "sequelize";
import { db } from "../config/Database.js";
import { User } from "../types.js";

export const Users = db.define<User>(
  "users",
  {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    refresh_token: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
  }
);
