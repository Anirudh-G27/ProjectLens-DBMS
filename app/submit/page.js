"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

function overlapInfo(score) {
  if (score >= 0.7) return { text: "High overlap", badge: "bg-red-50 text-red-700", bar: "bg-red-500" };
  if (score >= 0.5) return { text: "Moderate overlap", badge: "bg-amber-50 text-amber-700", bar: "bg-amber-500" };
  return { text: "Low overlap", badge: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" };
}

export default function SubmitProject() {
  const [domains, setDomains] = useState([]);
  const [email, setEmail] = useState("");
  const [domainId, setDomainId] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }
  const [results, setResults] = useState(null); // null = not checked yet

  useEffect(() => {
    fetch("/api/domains")
      .then((r) => r.json())
      .then((data) => {
        setDomains(data);
        if (data.length > 0) setDomainId(String(data[0].domain_id));
      })
      .catch(() => setMessage({ type: "error", text: "Could not load domains" }));
  }, []);

  async function handleCheck() {
    if (!title.trim() || !abstract.trim()) {
      setMessage({ type: "error", text: "Enter a title and abstract to check similarity." });
      return;
    }
    setChecking(true);
    setMessage(null);
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
      setMessage({ type: "error", text: e.message });
    }
    setChecking(false);
  }

  async function handleSubmit() {
    if (!email.trim() || !domainId || !title.trim() || !abstract.trim()) {
      setMessage({ type: "error", text: "Please fill in every field." });
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, domain_id: domainId, title, abstract }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessage({ type: "success", text: "Project submitted successfully. Project ID: " + data.project_id });
      setTitle("");
      setAbstract("");
      setResults(null);
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    }
    setSubmitting(false);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <Sidebar active="/submit" />

      <section className="min-w-0 flex-1 p-5 md:ml-64 md:p-9">
        {/* Header */}
        <header className="mb-9">
          <p className="text-sm text-slate-500">Workspace / Submit Project</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Submit Project</h2>
          <p className="mt-1 text-sm text-slate-500">
            Register a new project. Check similarity first to see if your idea overlaps with existing work.
          </p>
        </header>

        {message && (
          <div
            className={`mb-6 rounded-xl border px-5 py-4 text-sm font-medium ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Form card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <h3 className="text-lg font-bold">Project Details</h3>
            <p className="mt-1 text-sm text-slate-500">All fields are required</p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Student email</label>
                <input
                  type="email"
                  placeholder="name@pes.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Domain</label>
                <select
                  value={domainId}
                  onChange={(e) => setDomainId(e.target.value)}
                  className={inputClass}
                >
                  {domains.map((d) => (
                    <option key={d.domain_id} value={d.domain_id}>
                      {d.domain_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">Project title</label>
              <input
                placeholder="e.g. Smart Traffic Signal Control using Computer Vision"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Abstract</label>
                <span className="text-xs text-slate-400">{abstract.length} characters</span>
              </div>
              <textarea
                rows={7}
                placeholder="Describe what your project does and how it works"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleCheck}
                disabled={checking || submitting}
                className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
              >
                {checking ? "Checking..." : "⌕  Check similarity"}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || checking}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit project"}
              </button>
            </div>
          </div>

          {/* Similarity panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Similar Projects</h3>
            <p className="mt-1 text-sm text-slate-500">Closest matches in the repository</p>

            {results === null && (
              <p className="mt-8 text-sm leading-6 text-slate-400">
                Click <span className="font-semibold text-slate-500">Check similarity</span> to compare your title and
                abstract with existing projects before you submit.
              </p>
            )}

            {results !== null && results.length === 0 && (
              <p className="mt-8 text-sm text-slate-500">No similar projects found.</p>
            )}

            {results !== null && results.length > 0 && (
              <div className="mt-6 space-y-5">
                {results.map((r) => {
                  const score = Number(r.similarity);
                  const info = overlapInfo(score);
                  return (
                    <div key={r.proj_id}>
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800">{r.proj_title}</p>
                        <span className="shrink-0 text-sm text-slate-500">{score.toFixed(3)}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${info.bar}`}
                          style={{ width: `${Math.max(0, Math.min(100, Math.round(score * 100)))}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${info.badge}`}>
                          {info.text}
                        </span>
                        <span className="text-xs text-slate-400">{r.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          ProjectLens © 2026 · Semantic Project Similarity Detection System
        </footer>
      </section>
    </main>
  );
}
