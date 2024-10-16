declare namespace NodeJS {
  interface ProcessEnv {
    ENV: "development" | "production";
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    DB_PORT: string;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_LOGGING: string;
    APP_HOST: URL;
    API_PORT: string;
    APP_PORT: string;
  }
}
