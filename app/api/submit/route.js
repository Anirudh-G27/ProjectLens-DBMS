import pool from "../../../lib/db";
import { getEmbedding } from "../../../lib/embed";

export async function POST(request) {
  const { email, domain_id, title, abstract } = await request.json();

  if (!email || !domain_id || !title || !abstract) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  const student = await pool.query(
    "SELECT student_id FROM student WHERE email = $1",
    [email]
  );
  if (student.rows.length === 0) {
    return Response.json({ error: "No student found with that email" }, { status: 404 });
  }

  const embedding = await getEmbedding(`${title}. ${abstract}`);
  const vectorText = "[" + embedding.join(",") + "]";

  const result = await pool.query(
    `INSERT INTO project (student_id, domain_id, title, abstract, status, embedding)
     VALUES ($1, $2, $3, $4, 'Submitted', $5::vector)
     RETURNING project_id`,
    [student.rows[0].student_id, domain_id, title, abstract, vectorText]
  );

  return Response.json({ project_id: result.rows[0].project_id });
}