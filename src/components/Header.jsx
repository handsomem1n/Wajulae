import { Link, NavLink } from "react-router-dom";

const NAV = [
  { id: "home",    label: "서비스 소개", path: "/" },
  { id: "pricing", label: "표준 견적",   path: "/pricing" },
  { id: "faq",     label: "FAQ",        path: "/faq" },
  { id: "contact", label: "문의",        path: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-1 font-semibold text-lg leading-none"
          aria-label="홈"
        >
          <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-[var(--primary)] text-white font-bold">W</span>
          <span>와줄래</span>
          <span className="text-sm font-normal text-neutral-500">생활수리 플랫폼</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1" aria-label="주요 섹션">
          {NAV.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-[var(--primary)] text-white shadow"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export { NAV };
