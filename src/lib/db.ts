import postgres from "postgres";

const sql = postgres({
  host: import.meta.env.DB_HOST,
  port: parseInt(import.meta.env.DB_PORT || "5432"),
  database: import.meta.env.DB_DATABASE,
  username: import.meta.env.DB_USERNAME,
  password: import.meta.env.DB_PASSWORD,
  ssl: "require",
});

export default sql;
