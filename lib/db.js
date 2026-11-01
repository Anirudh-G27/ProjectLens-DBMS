import { Pool } from "pg";

const pool = global.pgPool || new Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") global.pgPool = pool;

export default pool;