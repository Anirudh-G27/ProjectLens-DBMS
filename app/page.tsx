
const stats = [
  { label: "Total Projects", value: "248", change: "+12 this month", icon: "▤", color: "blue" },
  { label: "Registered Students", value: "186", change: "+8 this month", icon: "♙", color: "violet" },
  { label: "Similarity Checks", value: "524", change: "+18% this month", icon: "⌕", color: "emerald" },
  { label: "Potential Overlaps", value: "17", change: "Requires review", icon: "⚠", color: "amber" },
];

const projects = [
  { title: "AI-Based Medical Diagnosis", student: "Rahul Sharma", domain: "Machine Learning", date: "Today", status: "Approved", color: "green" },
  { title: "Smart Campus Management", student: "Priya Kumar", domain: "Web Development", date: "Yesterday", status: "Under Review", color: "amber" },
  { title: "Blockchain Voting System", student: "Arjun Rao", domain: "Blockchain", date: "Oct 29, 2026", status: "Approved", color: "green" },
  { title: "Fake News Detection", student: "Sneha Patel", domain: "Artificial Intelligence", date: "Oct 28, 2026", status: "Pending", color: "blue" },
];

const domains = [
  { name: "Artificial Intelligence", count: 72, width: "90%", color: "bg-indigo-500" },
  { name: "Web Development", count: 58, width: "72%", color: "bg-blue-500" },
  { name: "Machine Learning", count: 46, width: "58%", color: "bg-violet-500" },
  { name: "Data Science", count: 34, width: "43%", color: "bg-emerald-500" },
  { name: "Blockchain", count: 21, width: "27%", color: "bg-amber-500" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 md:flex">

      {/* Sidebar */}
      <aside className="w-full bg-slate-950 px-5 py-7 text-white md:fixed md:inset-y-0 md:w-64">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 text-2xl font-bold">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">ProjectLens</h1>
            <p className="text-xs text-slate-400">Academic Intelligence</p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="space-y-2">
          {[
            ["▦", "Dashboard"],
            ["▤", "Project Repository"],
            ["⌕", "Similarity Checker"],
            ["＋", "Submit Project"],
          ].map(([icon, label], index) => (
            <a
              key={label}
              href={index === 0 ? "/" : "#"}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                index === 0
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{icon}</span>
              {label}
            </a>
          ))}
        </nav>

        <p className="mb-3 mt-9 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Administration
        </p>

        <nav className="space-y-2">
          {["Students", "Guides", "Manage Projects", "Reports"].map((item) => (
            <a
              key={item}
              href="#"
              className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-12 rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm font-semibold">ProjectLens AI</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Discover connections between academic projects using semantic intelligence.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-slate-800 pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold">Administrator</p>
            <p className="text-xs text-slate-400">Admin Account</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="min-w-0 flex-1 p-5 md:ml-64 md:p-9">

        {/* Header */}
        <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Workspace / Overview</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Monitor projects and discover academic similarities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 sm:block">
              November 2026
            </div>
            <a
              href="#quick-actions"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              + New Project
            </a>
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-600 p-7 text-white shadow-lg">
          <div className="relative z-10 max-w-xl">
            <p className="text-sm font-medium text-indigo-200">
              YOUR ACADEMIC PROJECT HUB
            </p>
            <h3 className="mt-3 text-2xl font-bold md:text-3xl">
              Discover. Compare. Innovate.
            </h3>
            <p className="mt-3 text-sm leading-6 text-indigo-100">
              Manage academic projects and identify potential overlaps
              with AI-powered semantic similarity analysis.
            </p>
            <a
              href="#quick-actions"
              className="mt-5 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Explore Workspace →
            </a>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-white/10" />
        </div>

        {/* Statistics */}
        <div className="mb-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                  stat.color === "blue" ? "bg-blue-50 text-blue-600" :
                  stat.color === "violet" ? "bg-violet-50 text-violet-600" :
                  stat.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                  "bg-amber-50 text-amber-600"
                }`}>
                  {stat.icon}
                </span>
              </div>
              <h3 className="mt-5 text-3xl font-bold">{stat.value}</h3>
              <p className="mt-2 text-xs text-slate-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Recent Projects */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Recent Projects</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Latest submissions to the repository
                </p>
              </div>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                View all →
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-4 font-medium">Project</th>
                    <th className="pb-4 font-medium">Domain</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.title} className="border-b border-slate-100 last:border-0">
                      <td className="py-5 pr-3">
                        <p className="font-semibold text-slate-800">{project.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{project.student}</p>
                      </td>
                      <td className="py-5 pr-3 text-slate-500">{project.domain}</td>
                      <td className="py-5 pr-3 text-slate-500">{project.date}</td>
                      <td className="py-5">
                        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          project.color === "green" ? "bg-emerald-50 text-emerald-700" :
                          project.color === "amber" ? "bg-amber-50 text-amber-700" :
                          "bg-blue-50 text-blue-700"
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Domain Distribution */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Project Domains</h3>
            <p className="mt-1 text-sm text-slate-500">Distribution by category</p>

            <div className="mt-7 space-y-6">
              {domains.map((domain) => (
                <div key={domain.name}>
                  <div className="mb-2 flex justify-between gap-2 text-sm">
                    <span className="font-medium text-slate-700">{domain.name}</span>
                    <span className="text-slate-500">{domain.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${domain.color}`}
                      style={{ width: domain.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div id="quick-actions" className="mt-8">
          <h3 className="mb-4 text-lg font-bold">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: "＋",
                title: "Submit New Project",
                description: "Register a new academic project.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: "⌕",
                title: "Check Similarity",
                description: "Find semantically related projects.",
                color: "bg-violet-50 text-violet-600",
              },
              {
                icon: "▤",
                title: "Explore Repository",
                description: "Browse existing academic projects.",
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((action) => (
              <a
                href="#"
                key={action.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${action.color}`}>
                  {action.icon}
                </span>
                <div>
                  <h4 className="font-semibold">{action.title}</h4>
                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    {action.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-12 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          ProjectLens © 2026 · Semantic Project Similarity Detection System
        </footer>
      </section>
    </main>
  );
}
