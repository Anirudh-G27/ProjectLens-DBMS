import pool from "../../../lib/db";

export async function GET() {
  const result = await pool.query(
    "SELECT domain_id, domain_name FROM domain ORDER BY domain_name"
  );
  return Response.json(result.rows);
}