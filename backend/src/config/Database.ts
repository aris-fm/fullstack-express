import { Sequelize } from "sequelize";

export const db = new Sequelize("auth_db", "root", "", {
  port: 3306,
  dialect: "mysql",
});
