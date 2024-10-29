import { Sequelize } from "sequelize";
import "jsr:@std/dotenv/load";

export const db = new Sequelize(
  Deno.env.get("DB_NAME")!,
  Deno.env.get("DB_USERNAME")!,
  Deno.env.get("DB_PASSWORD")!,
  {
    port: +Deno.env.get("DB_PORT")!,
    dialect: "mysql",
    host: Deno.env.get("DB_HOST")!,
    logging: JSON.parse(Deno.env.get("DB_LOGGING")!),
    dialectOptions: {
      socketPath: "/var/run/mysqld/mysqld.sock",
    },
    define: {
      paranoid: true,
    },
  },
);
