import { Link, useLocation } from "react-router-dom";

export default function MobileDock() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-3 left-0 right-0 z-[70] px-4 md:hidden">
      <div className="mx-auto max-w-sm rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200 overflow-hidden">
        <div className="grid grid-cols-4">
          <Link
            to="/"
            className={`py-3 text-sm font-semibold ${
              isActive("/") ? "bg-[var(--primary)] text-white" : "hover:bg-neutral-50"
            }`}
          >
            홈
          </Link>
          <Link
            to="/pricing"
            className={`py-3 text-sm font-semibold border-l border-neutral-200 ${
              isActive("/pricing") ? "bg-[var(--primary)] text-white" : "hover:bg-neutral-50"
            }`}
          >
            표준 견적
          </Link>
          <Link
            to="/faq"
            className={`py-3 text-sm font-semibold border-l border-neutral-200 ${
              isActive("/faq") ? "bg-[var(--primary)] text-white" : "hover:bg-neutral-50"
            }`}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className={`py-3 text-sm font-semibold border-l border-neutral-200 ${
              isActive("/contact") ? "bg-[var(--primary)] text-white" : "hover:bg-neutral-50"
            }`}
          >
            문의
          </Link>
        </div>
      </div>
    </div>
  );
}
