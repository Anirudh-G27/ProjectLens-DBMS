import pool from "../../../lib/db";
import { getEmbedding } from "../../../lib/embed";

export async function POST(request) {
  const { title, abstract } = await request.json();

  if (!title || !abstract) {
    return Response.json({ error: "Title and abstract are required" }, { status: 400 });
  }

  // same text format the seed script used
  const embedding = await getEmbedding(`${title}. ${abstract}`);
  const vectorText = "[" + embedding.join(",") + "]";

  const result = await pool.query(
    `SELECT f.proj_id, f.proj_title, f.similarity, p.status
     FROM find_similar_projects($1::vector, 5) f
     JOIN project p ON p.project_id = f.proj_id
     ORDER BY f.similarity DESC`,
    [vectorText]
  );

  return Response.json(result.rows);
}