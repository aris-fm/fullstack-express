import { DataTypes, type Model } from "sequelize"
import { db } from "../config/db"
import type { User } from "@/types"

interface UserModel extends Model, User {}

export const users = db.define<UserModel>(
  "users",
  {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    refresh_token: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
  },
)
