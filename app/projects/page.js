"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

const STATUSES = ["Submitted", "Under Review", "Approved", "Rejected"];

function statusBadge(status) {
  if (status === "Approved") return "bg-emerald-50 text-emerald-700";
  if (status === "Under Review") return "bg-amber-50 text-amber-700";
  if (status === "Rejected") return "bg-red-50 text-red-700";
  return "bg-blue-50 text-blue-700";
}

export default function ProjectRepository() {
  const [projects, setProjects] = useState([]);
  const [domains, setDomains] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  // domain dropdown
  useEffect(() => {
    fetch("/api/domains")
      .then((r) => r.json())
      .then(setDomains)
      .catch(() => {});
  }, []);

  // load projects whenever the search or a filter changes (search waits 300 ms after typing)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(() => {
      const query = new URLSearchParams({ q: search, status, domain }).toString();
      fetch("/api/projects?" + query)
        .then((res) => {
          if (!res.ok) throw new Error("Request failed");
          return res.json();
        })
        .then((data) => {
          if (!cancelled) {
            setProjects(data);
            setError("");
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError("Could not load projects");
            setLoading(false);
          }
        });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, status, domain]);

  function clearFilters() {
    setSearch("");
    setStatus("");
    setDomain("");
  }

  const hasFilters = search || status || domain;
  const inputClass =
    "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <Sidebar active="/projects" />

      <section className="min-w-0 flex-1 p-5 md:ml-64 md:p-9">
        {/* Header */}
        <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Workspace / Project Repository</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Project Repository</h2>
            <p className="mt-1 text-sm text-slate-500">Browse, search and filter all submitted projects.</p>
          </div>
          <Link
            href="/submit"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            + New Project
          </Link>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              placeholder="Search by title or abstract"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputClass} min-w-[220px] flex-1`}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              <option value="">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select value={domain} onChange={(e) => setDomain(e.target.value)} className={inputClass}>
              <option value="">All domains</option>
              {domains.map((d) => (
                <option key={d.domain_id} value={d.domain_name}>
                  {d.domain_name}
                </option>
              ))}
            </select>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Clear
              </button>
            )}
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {loading ? "Loading..." : `Showing ${projects.length} project${projects.length === 1 ? "" : "s"}`}
          </p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-4 font-medium">Project</th>
                  <th className="pb-4 font-medium">Domain</th>
                  <th className="pb-4 font-medium">Guide</th>
                  <th className="pb-4 font-medium">Technologies</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <ProjectRow
                    key={p.project_id}
                    p={p}
                    open={openId === p.project_id}
                    onToggle={() => setOpenId(openId === p.project_id ? null : p.project_id)}
                  />
                ))}
              </tbody>
            </table>

            {!loading && projects.length === 0 && !error && (
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center text-sm text-slate-400">
                No projects match your search or filters.
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

function ProjectRow({ p, open, onToggle }) {
  const techs = p.technologies ? p.technologies.split(", ") : [];
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
      >
        <td className="py-5 pr-3">
          <p className="font-semibold text-slate-800">{p.title}</p>
          <p className="mt-1 text-xs text-slate-400">{p.student_name}</p>
        </td>
        <td className="py-5 pr-3 text-slate-500">{p.domain_name}</td>
        <td className="py-5 pr-3 text-slate-500">{p.guide_name || "Not assigned"}</td>
        <td className="py-5 pr-3">
          <div className="flex flex-wrap gap-1.5">
            {techs.map((t) => (
              <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                {t}
              </span>
            ))}
            {techs.length === 0 && <span className="text-xs text-slate-300">None</span>}
          </div>
        </td>
        <td className="py-5 pr-3 text-slate-500">{p.submission_date}</td>
        <td className="py-5">
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusBadge(p.status)}`}>
            {p.status}
          </span>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-slate-100 bg-slate-50">
          <td colSpan={6} className="px-4 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Abstract</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{p.abstract}</p>
          </td>
        </tr>
      )}
    </>
  );
}
