import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

export default new Pool({
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: +`${process.env.POSTGRES_PORT}` || 5432,
});
