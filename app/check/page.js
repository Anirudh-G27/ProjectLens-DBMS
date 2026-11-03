"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

function overlapInfo(score) {
  if (score >= 0.7) return { text: "High overlap", badge: "bg-red-50 text-red-700", bar: "bg-red-500" };
  if (score >= 0.5) return { text: "Moderate overlap", badge: "bg-amber-50 text-amber-700", bar: "bg-amber-500" };
  return { text: "Low overlap", badge: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" };
}

function statusBadge(status) {
  if (status === "Approved") return "bg-emerald-50 text-emerald-700";
  if (status === "Under Review") return "bg-amber-50 text-amber-700";
  if (status === "Rejected") return "bg-red-50 text-red-700";
  return "bg-blue-50 text-blue-700";
}

function verdict(topScore) {
  if (topScore >= 0.7) {
    return {
      title: "High overlap found",
      text: "Your idea is very close to an existing project. Consider refining the scope or adding a distinct feature.",
      box: "border-red-200 bg-red-50 text-red-800",
    };
  }
  if (topScore >= 0.5) {
    return {
      title: "Moderate overlap found",
      text: "Some existing projects cover similar ground. Review them and highlight what makes your idea different.",
      box: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }
  return {
    title: "Your idea looks original",
    text: "No closely related projects were found in the repository.",
    box: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };
}

const EXAMPLE = {
  title: "Classroom attendance with face detection",
  abstract:
    "A camera in the classroom recognises students' faces and marks their attendance automatically.",
};

export default function CheckSimilarity() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [results, setResults] = useState(null); // null = not checked yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheck() {
    if (!title.trim() || !abstract.trim()) {
      setError("Enter a title and an abstract to run the check.");
      return;
    }
    setLoading(true);
    setError("");
    setResults(null);
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

  function useExample() {
    setTitle(EXAMPLE.title);
    setAbstract(EXAMPLE.abstract);
    setResults(null);
    setError("");
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  const topScore = results && results.length > 0 ? Number(results[0].similarity) : 0;
  const summary = results && results.length > 0 ? verdict(topScore) : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <Sidebar active="/check" />

      <section className="min-w-0 flex-1 p-5 md:ml-64 md:p-9">
        {/* Header */}
        <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Workspace / Similarity Checker</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Similarity Checker</h2>
            <p className="mt-1 text-sm text-slate-500">
              Compare a project idea with the repository using semantic search.
            </p>
          </div>
          <button
            onClick={useExample}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-700"
          >
            Try an example
          </button>
        </header>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          {/* Input card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <h3 className="text-lg font-bold">Your Idea</h3>
            <p className="mt-1 text-sm text-slate-500">Describe the project you are planning</p>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">Project title</label>
              <input
                placeholder="e.g. Adaptive traffic lights using cameras"
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
                rows={8}
                placeholder="What does it do and how does it work?"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              onClick={handleCheck}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Analysing..." : "⌕  Check similarity"}
            </button>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              The first check can take longer while the embedding model loads.
            </p>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-3">
            <h3 className="text-lg font-bold">Results</h3>
            <p className="mt-1 text-sm text-slate-500">Most similar projects, ranked by cosine similarity</p>

            {loading && <p className="mt-10 text-sm text-slate-500">Comparing your idea with the repository...</p>}

            {!loading && results === null && (
              <div className="mt-10 rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center text-sm text-slate-400">
                Enter your idea and click <span className="font-semibold text-slate-500">Check similarity</span> to see
                related projects here.
              </div>
            )}

            {!loading && results !== null && results.length === 0 && (
              <p className="mt-10 text-sm text-slate-500">No projects found in the repository.</p>
            )}

            {!loading && summary && (
              <div className={`mt-6 rounded-xl border px-5 py-4 ${summary.box}`}>
                <p className="text-sm font-bold">{summary.title}</p>
                <p className="mt-1 text-sm">{summary.text}</p>
              </div>
            )}

            {!loading && results !== null && results.length > 0 && (
              <div className="mt-6 space-y-4">
                {results.map((r, index) => {
                  const score = Number(r.similarity);
                  const info = overlapInfo(score);
                  const percent = Math.max(0, Math.min(100, Math.round(score * 100)));
                  return (
                    <div
                      key={r.proj_id}
                      className="rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-slate-800">{r.proj_title}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${info.badge}`}>
                                {info.text}
                              </span>
                              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(r.status)}`}>
                                {r.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-2xl font-bold text-slate-800">{percent}%</p>
                          <p className="text-xs text-slate-400">score {score.toFixed(3)}</p>
                        </div>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${info.bar}`} style={{ width: `${percent}%` }} />
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
