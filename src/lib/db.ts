import postgres from "postgres";

const sqlDev = postgres({
  host: import.meta.env.DB_HOST,
  port: parseInt(import.meta.env.DB_PORT || "5432"),
  database: import.meta.env.DB_DATABASE,
  username: import.meta.env.DB_USERNAME,
  password: import.meta.env.DB_PASSWORD,
  ssl: "require",
});

const sqlProd = postgres({
  host: import.meta.env.DB_HOST,
  port: parseInt(import.meta.env.DB_PORT || "5432"),
  database: import.meta.env.DB_DATABASE_PROD,
  username: import.meta.env.DB_USERNAME,
  password: import.meta.env.DB_PASSWORD,
  ssl: "require",
});

export const getDb = (env: "dev" | "prod" = "dev") => {
  return env === "prod" ? sqlProd : sqlDev;
};

export default sqlDev;
