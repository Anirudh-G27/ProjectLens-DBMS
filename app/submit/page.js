"use client";
import { useState, useEffect } from "react";

export default function SubmitProject() {
  const [domains, setDomains] = useState([]);
  const [email, setEmail] = useState("");
  const [domainId, setDomainId] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/domains")
      .then((r) => r.json())
      .then((data) => {
        setDomains(data);
        if (data.length > 0) setDomainId(data[0].domain_id);
      });
  }, []);

  async function handleSubmit() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, domain_id: domainId, title, abstract }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessage("Project submitted. Project ID: " + data.project_id);
      setTitle("");
      setAbstract("");
    } catch (e) {
      setMessage("Error: " + e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>ProjectLens: Submit project</h1>

      <input
        placeholder="Your student email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <select
        value={domainId}
        onChange={(e) => setDomainId(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      >
        {domains.map((d) => (
          <option key={d.domain_id} value={d.domain_id}>
            {d.domain_name}
          </option>
        ))}
      </select>
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
      <button onClick={handleSubmit} disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "Submitting..." : "Submit project"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}