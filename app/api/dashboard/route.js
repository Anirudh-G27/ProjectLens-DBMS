import pool from "../../../lib/db";

export async function GET() {
  try {
    const projects = await pool.query("SELECT COUNT(*)::int AS n FROM project");
    const students = await pool.query("SELECT COUNT(*)::int AS n FROM student");
    const pairs = await pool.query("SELECT COUNT(*)::int AS n FROM project_similarity");
    const overlaps = await pool.query(
      "SELECT COUNT(*)::int AS n FROM project_similarity WHERE similarity_score >= 0.5"
    );
    const thisMonth = await pool.query(
      "SELECT COUNT(*)::int AS n FROM project WHERE submission_date >= date_trunc('month', CURRENT_DATE)"
    );
    const recent = await pool.query(
      `SELECT p.project_id, p.title, p.status, s.student_name, d.domain_name,
              to_char(p.submission_date, 'DD Mon YYYY') AS submission_date
       FROM project p
       JOIN student s ON s.student_id = p.student_id
       JOIN domain d ON d.domain_id = p.domain_id
       ORDER BY p.project_id DESC
       LIMIT 5`
    );
    const domains = await pool.query(
      `SELECT d.domain_name, COUNT(p.project_id)::int AS total
       FROM domain d
       LEFT JOIN project p ON p.domain_id = d.domain_id
       GROUP BY d.domain_name
       ORDER BY total DESC
       LIMIT 5`
    );

    return Response.json({
      totals: {
        projects: projects.rows[0].n,
        students: students.rows[0].n,
        pairs: pairs.rows[0].n,
        overlaps: overlaps.rows[0].n,
        thisMonth: thisMonth.rows[0].n,
      },
      recent: recent.rows,
      domains: domains.rows,
    });
  } catch (e) {
    return Response.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}