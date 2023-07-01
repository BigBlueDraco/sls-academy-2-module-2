import dotenv from "dotenv";
import pool from "./db";
dotenv.config();

const createUUIDExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

const createUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );`;

const createTokenTableQuery = `
  CREATE TABLE IF NOT EXISTS tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    refreshtoken VARCHAR(512) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`;

export async function createTables() {
  try {
    await pool.query(createUUIDExtension);
    await pool.query(createUserTableQuery);
    await pool.query(createTokenTableQuery);
    console.log("DB created.");
  } catch (error) {
    console.error("DB Error:", error);
  }
}
