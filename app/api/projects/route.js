import pool from "../../../lib/db";

export async function GET(request) {
  try {
    const params = new URL(request.url).searchParams;
    const q = (params.get("q") || "").trim();
    const status = params.get("status") || "";
    const domain = params.get("domain") || "";

    const result = await pool.query(
      `SELECT p.project_id, p.title, p.abstract, p.status,
              s.student_name, g.guide_name, d.domain_name,
              to_char(p.submission_date, 'DD Mon YYYY') AS submission_date,
              COALESCE(STRING_AGG(t.technology_name, ', ' ORDER BY t.technology_name), '') AS technologies
       FROM project p
       JOIN student s ON s.student_id = p.student_id
       LEFT JOIN guide g ON g.guide_id = p.guide_id
       JOIN domain d ON d.domain_id = p.domain_id
       LEFT JOIN project_technology pt ON pt.project_id = p.project_id
       LEFT JOIN technology t ON t.technology_id = pt.technology_id
       WHERE ($1::text = '' OR p.title ILIKE '%' || $1::text || '%' OR p.abstract ILIKE '%' || $1::text || '%')
         AND ($2::text = '' OR p.status = $2::text)
         AND ($3::text = '' OR d.domain_name = $3::text)
       GROUP BY p.project_id, s.student_name, g.guide_name, d.domain_name
       ORDER BY p.project_id DESC`,
      [q, status, domain]
    );

    return Response.json(result.rows);
  } catch (e) {
    return Response.json({ error: "Failed to load projects" }, { status: 500 });
  }
}
