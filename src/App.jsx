import React, { useMemo, useState } from "react";
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

// ---------- Shared UI ----------
function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="flex w-full items-center justify-between px-6 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500 font-bold text-white shadow-sm">
            와
          </span>
          <div className="leading-tight">
            <div className="text-lg font-bold">와줄래</div>
            <div className="text-xs text-gray-500">생활출동 연결 플랫폼</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/home" className="hover:text-amber-600">홈</Link>
          <Link to="/cases" className="hover:text-amber-600">가능 작업</Link>
          <Link to="/faq" className="hover:text-amber-600">FAQ</Link>
        </nav>
        <a
          href={KAKAO_CHAT_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-600"
        >
          카카오채널 문의
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white text-sm text-gray-500 px-6 py-10 text-center">
      © {new Date().getFullYear()} Wajulle
    </footer>
  );
}

// ---------- Landing ----------
function Landing() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="px-6 py-20 md:px-8 md:py-28">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          생활수리 <span className="text-amber-600">빠른 연결</span>
        </h1>
        <p className="mt-3 text-gray-600">
          변기막힘 · 전기 · 잠금해제 등 동네 기사 연결
        </p>
        <div className="mt-6 flex gap-3">
          <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="rounded-2xl bg-amber-500 px-6 py-3 text-sm text-white font-semibold shadow hover:bg-amber-600">
            카카오 문의
          </a>
          <button onClick={() => navigate("/cases")} className="rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-white">
            가능 작업 보기
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

// ---------- CASES DATA ----------
const CASES = [
  { id:"intercom-replace-01", title:"인터폰 교체", category:"door", summary:"인터폰 교체 사례", content:"", price:"", labor:"", material:"" },
  { id:"k-sink-faucet-01", title:"싱크대 수전 교체", category:"kitchen", summary:"수전 교체 사례", content:"", price:"", labor:"", material:"" },
  { id:"bath-fan-01", title:"욕실 환풍기 교체", category:"bath", summary:"환풍기 교체 사례", content:"", price:"", labor:"", material:"" },
];

// ---------- Case Card ----------
function CaseCard({ item }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm hover:border-amber-300 transition">
      <div className="inline-block rounded-md bg-amber-100 px-2 py-1 text-[11px] text-amber-700">
        {item.category}
      </div>
      <div className="mt-2 font-semibold">{item.title}</div>
      <div className="mt-1 text-sm text-gray-600">{item.summary}</div>

      <Link
        to={`/cases/${item.id}`}
        className="mt-4 inline-block rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600"
      >
        자세히 보기
      </Link>
    </div>
  );
}

// ---------- Cases Page ----------
function CasesPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return CASES.filter(c =>
      c.title.toLowerCase().includes(s) ||
      c.summary.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="px-6 py-10 md:px-8">
        <h1 className="text-2xl font-extrabold">가능 작업</h1>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="검색 (예: 수전, 환풍기)"
          className="mt-4 w-full rounded-full border px-4 py-2 text-sm focus:border-amber-500"
        />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map(item => <CaseCard key={item.id} item={item} />)}
        </div>
      </section>
      <Footer />
    </main>
  );
}

// ---------- Detail ----------
function CaseDetailPage() {
  const { id } = useParams();
  const data = CASES.find(c => c.id === id);

  if (!data) return <div>없음</div>;

  const rows = [
    { label:"시공내역", value:data.content },
    { label:"비용", value:data.price },
    { label:"공임비", value:data.labor },
    { label:"제품비용", value:data.material },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="px-6 py-10 md:px-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-extrabold">{data.title}</h1>
        <div className="mt-6 space-y-3">
          {rows.map((r,i)=>(
            <div key={i} className="rounded-xl border bg-white p-4">
              <div className="text-xs font-semibold text-gray-500">{r.label}</div>
              <div className="mt-1 text-gray-800">{r.value || " "}</div>
            </div>
          ))}
        </div>
        <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600">
          카카오채널 상담
        </a>
      </section>
      <Footer />
    </main>
  );
}

// ---------- FAQ ----------
function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="px-6 py-10">FAQ</section>
      <Footer />
    </main>
  );
}

// ---------- App ----------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/:id" element={<CaseDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}
