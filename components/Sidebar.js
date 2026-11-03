import Link from "next/link";

const workspace = [
  { icon: "▦", label: "Dashboard", href: "/" },
  { icon: "▤", label: "Project Repository", href: "/projects" },
  { icon: "⌕", label: "Similarity Checker", href: "/check" },
  { icon: "＋", label: "Submit Project", href: "/submit" },
];

const administration = ["Students", "Guides", "Manage Projects", "Reports"];

export default function Sidebar({ active }) {
  return (
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
        {workspace.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              item.href === active
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="mb-3 mt-9 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Administration
      </p>

      <nav className="space-y-2">
        {administration.map((item) => (
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
  );
}
