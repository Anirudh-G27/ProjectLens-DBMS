"use client";
import { useState } from "react";

export default function CheckIdea() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheck() {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch("/api/check-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, abstract }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResults(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  function label(score) {
    if (score >= 0.7) return "High overlap";
    if (score >= 0.5) return "Moderate overlap";
    return "Low overlap";
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>ProjectLens: Check my idea</h1>
      <p>Enter your project idea to see which existing projects are similar.</p>

      <input
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <textarea
        placeholder="Project abstract"
        rows={6}
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleCheck} disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "Checking..." : "Check similarity"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Similar project</th>
              <th align="left">Status</th>
              <th align="left">Score</th>
              <th align="left">Overlap</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.proj_id} style={{ borderTop: "1px solid #ccc" }}>
                <td>{r.proj_title}</td>
                <td>{r.status}</td>
                <td>{Number(r.similarity).toFixed(3)}</td>
                <td>{label(Number(r.similarity))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}