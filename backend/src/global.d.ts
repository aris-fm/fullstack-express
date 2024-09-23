namespace NodeJS {
  interface ProcessEnv {
    ENV: "development" | "production";
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_LOGGING: boolean;
    APP_HOST: URL;
    BACKEND_PORT: number;
    FRONTEND_PORT: number;
  }
}
