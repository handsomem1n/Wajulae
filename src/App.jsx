import React, { useMemo, useState } from "react";
import {
  BrowserRouter,   // ✅ 진짜 BrowserRouter 사용
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

// 카테고리 라벨 매핑
const CATEGORY_LABELS: Record<string, string> = {
  door: "도어/현관",
  bath: "욕실",
  electric: "전기/전등",
  kitchen: "주방",
  space: "공간",
};

// ---------- Shared UI ----------
function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 md:px-8">
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
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8">
        <div className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Wajulle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ---------- Landing ----------
function Landing() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />

      <section className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              생활수리 <span className="text-amber-600">빠른 연결</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">
              변기막힘 · 누수 · 보일러 · 전기 · 잠금해제 · 문 개방 등 <b>가까운 동네 기사</b>를 빠르게 연결해드립니다.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={KAKAO_CHAT_LINK}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-amber-600"
              >
                카카오채널로 문의하기
              </a>
              <button
                onClick={() => navigate("/cases")}
                className="rounded-2xl border border-amber-300 bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-700 transition hover:bg-white"
              >
                가능 작업 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function HomeInfoPage() {
  return <Landing />;
}

// ---------- CASES DATA (area/time 제거) ----------
const CASES = [
  { id:"intercom-replace-01", title:"인터폰 교체", category:"door", summary:"인터폰 교체 사례", content:"", price:"", labor:"", material:"" },
  { id:"k-sink-faucet-01", title:"싱크대 수전 교체", category:"kitchen", summary:"수전 교체 사례", content:"", price:"", labor:"", material:"" },
  { id:"bath-fan-01", title:"욕실 환풍기 교체", category:"bath", summary:"환풍기 교체 사례", content:"", price:"", labor:"", material:"" },
];

// ---------- Card ----------
function CaseCard({ item }: { item: any }) {
  const categoryLabel = CATEGORY_LABELS[item.category] || item.category;
  const hasPrice = !!(item.price && String(item.price).trim());
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
          {categoryLabel}
        </span>
        <span className={"inline-flex items-center rounded-full px-3 py-1 text-xs ring-1 " + (hasPrice ? "bg-amber-100 text-amber-800 ring-amber-200" : "bg-gray-50 text-gray-500 ring-gray-200")}>
          {hasPrice ? `비용 ${item.price}` : "비용 입력 전"}
        </span>
      </div>
      <div className="mt-2 text-base font-semibold">{item.title}</div>
      <div className="mt-1 text-sm text-gray-600">{item.summary}</div>
      <Link
        to={`/cases/${item.id}`}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        자세히 보기
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

// ---------- Cases Page ----------
function CasesPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | keyof typeof CATEGORY_LABELS | string>("all");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    let list = CASES;
    if (tab !== "all") list = list.filter((c) => c.category === tab);
    if (s) {
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(s) ||
          c.summary.toLowerCase().includes(s)
      );
    }
    return list;
  }, [q, tab]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />

      <section className="border-b bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">가능 작업</h1>
          <p className="mt-2 text-sm text-gray-600">
            사례 기준의 시공 내역입니다. 표기 금액은 참고용이며, 사진/주소/증상 확인 후 정확 범위를 안내드립니다.
          </p>

          {/* Tabs */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {[
              { key: "all", label: "전체" },
              { key: "door", label: "도어/현관" },
              { key: "bath", label: "욕실" },
              { key: "electric", label: "전기/전등" },
              { key: "kitchen", label: "주방" },
              { key: "space", label: "공간" },
            ].map((c) => (
              <button
                key={c.key}
                onClick={() => setTab(c.key)}
                className={
                  "rounded-full border px-4 py-2 text-sm " +
                  (tab === c.key
                    ? "border-amber-500 bg-amber-500 text-white shadow"
                    : "border-amber-200 bg-white text-amber-800 hover:bg-amber-50")
                }
              >
                {c.label}
              </button>
            ))}

            <div className="ml-auto w-full md:w-72">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="검색 (예: 수전, 환풍기, 도어)"
                className="w-full rounded-full border border-amber-200 px-4 py-2 text-sm outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ---------- Detail ----------
function CaseDetailPage() {
  const { id } = useParams();
  const data = CASES.find((c) => c.id === id);

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <TopBar />
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
          <div className="text-2xl font-bold">항목을 찾을 수 없습니다.</div>
          <p className="mt-2 text-sm text-gray-600">뒤로 가기 또는 다른 작업을 선택해 주세요.</p>
          <div className="mt-6 flex items-center gap-3">
            <Link to="/cases" className="rounded-xl border px-4 py-2 text-sm">
              목록으로
            </Link>
            <a
              href={KAKAO_CHAT_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white"
            >
              카카오채널 문의
            </a>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const detailRows = [
    { label: "시공내역", value: data.content || "" },
    { label: "비용", value: data.price || "" },
    { label: "공임비", value: data.labor || "" },
    { label: "제품비용", value: data.material || "" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="border-b bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold md:text-3xl">{data.title}</h1>
              <p className="mt-1 text-sm text-gray-600">사례 상세 안내</p>
            </div>
            <Link to="/cases" className="rounded-full border px-4 py-2 text-sm">
              목록으로
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8">
        <div className="mx-auto grid max-w-3xl gap-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <dl className="grid gap-3 md:grid-cols-2">
              {detailRows.map((r, i) => (
                <div key={i} className="rounded-xl border bg-amber-50/40 p-3 ring-1 ring-amber-100">
                  <dt className="text-xs font-semibold text-amber-700">{r.label}</dt>
                  <dd className="mt-1 text-gray-900">{r.value || " "}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm">
              <div className="mb-2 font-semibold">설명</div>
              <div className="leading-6 text-gray-700">{data.summary}</div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-4 text-xs text-amber-900 ring-1 ring-amber-200">
            * 표기 금액과 내역은 사례 기준이며, 현장 상태(배관/전원/구조)에 따라 변동될 수 있습니다.
          </div>

          <div className="flex items-center gap-3">
            <a
              href={KAKAO_CHAT_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600"
            >
              카카오채널로 상담하기
            </a>
            <Link to="/cases" className="text-sm text-gray-600 underline">
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ---------- FAQ ----------
function FAQPage() {
  const items = [
    { q: "결제는 어디에 하나요?", a: "작업 확정 후 현장에서 또는 기사님 안내 계좌로 직접 결제합니다." },
    { q: "가격은 어떻게 되나요?", a: "사진/주소/증상 확인 후 대략적인 범위를 안내드립니다." },
    { q: "AS와 작업 책임은 누구에게 있나요?", a: "작업을 수행한 기사님에게 있습니다." },
  ];
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="border-b bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h1>
          <p className="mt-2 text-sm text-gray-600">추가 문의는 카카오채널로 남겨주세요.</p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-6 py-10 md:grid-cols-2 md:px-8">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-amber-100">
              <div className="font-semibold">Q. {it.q}</div>
              <div className="mt-2 text-sm leading-6 text-gray-700">A. {it.a}</div>
            </div>
          ))}
        </div>
      </section>

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
        {/* 선택: 없는 경로는 랜딩으로 */}
        {/* <Route path="*" element={<Landing />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
