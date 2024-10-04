import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve('../.env')
});

export const db = new Sequelize("auth_db", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  port: +process.env.DB_PORT,
  dialect: "mysql",
  host: process.env.DB_HOST,
  logging: JSON.parse(process.env.DB_LOGGING),
});
