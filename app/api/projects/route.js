import pool from "../../../lib/db";

export async function GET() {
  const result = await pool.query(
    `SELECT p.project_id, p.title, p.status, s.student_name, d.domain_name
     FROM project p
     JOIN student s ON s.student_id = p.student_id
     JOIN domain d ON d.domain_id = p.domain_id
     ORDER BY p.project_id`
  );
  return Response.json(result.rows);
}