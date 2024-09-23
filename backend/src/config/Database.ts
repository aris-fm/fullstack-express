import { Sequelize } from "sequelize";

export const db = new Sequelize("auth_db", "root", "", {
  port: process.env.DB_PORT,
  dialect: "mysql",
  host: process.env.DB_HOST,
  logging: process.env.DB_LOGGING,
});
