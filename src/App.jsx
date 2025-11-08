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

// ★ 전역 스타일 (별 제거)
function GlobalStyleReset() {
  return (
    <style>{`
      .no-star::before,
      .no-star::after {
        content: none !important;
      }
      .no-star {
        list-style: none !important;
      }
    `}</style>
  );
}

// 카테고리 라벨
const CATEGORY_LABELS: Record<string, string> = {
  door: "도어/현관",
  bath: "욕실",
  electric: "전기/전등",
  kitchen: "주방",
  space: "공간",
};

// ----- 타입 -----
type CaseDetail = {
  content: string;
  price: string;
  labor: string;
  material: string;
};

type CaseItem = {
  id: string;
  title: string;
  category: keyof typeof CATEGORY_LABELS | string;
  summary: string;
  detail: CaseDetail;
};

// ----- 케이스 데이터 (여기만 수정하면 됨) -----
const CASES: CaseItem[] = [
  {
    id: "intercom-replace-01",
    title: "인터폰 교체",
    category: "door",
    summary: "노후 인터폰을 신형으로 교체하여 통화/문열림 기능 개선.",
    detail: {
      content:
        "기존 인터폰 철거 → 배선 점검 → 신형 인터폰 벽부 설치 → 기능 테스트(통화/문열림) → 마감.",
      price: "120,000원 ~ 180,000원",
      labor: "80,000원",
      material: "인터폰 본체 40,000원 ~ 100,000원",
    },
  },
  {
    id: "door-floor-hinge-01",
    title: "현관문 플로어 힌지 교체",
    category: "door",
    summary: "도어 닫힘/복귀 불량 개선 및 레벨링.",
    detail: {
      content:
        "문 분리 → 기존 매립식 플로어힌지 제거 → 레벨 조정 → 신품 힌지 설치 → 닫힘 속도 세팅 → 재설치 및 마감.",
      price: "200,000원 ~ 350,000원",
      labor: "150,000원 ~ 220,000원",
      material: "플로어힌지 50,000원 ~ 130,000원",
    },
  },
  {
    id: "k-sink-faucet-01",
    title: "싱크대 수전 교체",
    category: "kitchen",
    summary: "싱크 수전 교체 및 배관 누수 점검.",
    detail: {
      content: "",
      price: "",
      labor: "",
      material: "",
    },
  },
  {
    id: "bath-fan-01",
    title: "욕실 환풍기 교체",
    category: "bath",
    summary: "소음/흡기 저하 환풍기 교체.",
    detail: {
      content: "",
      price: "",
      labor: "",
      material: "",
    },
  },
];

// ----- UI -----
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
      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Wajulle. All rights reserved.
      </div>
    </footer>
  );
}

// ----- Card -----
function CaseCard({ item }: { item: CaseItem }) {
  const categoryLabel = (CATEGORY_LABELS[item.category] || item.category).replace(/^★\s*/, "");
  const hasPrice = !!(item.detail?.price?.trim());

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

      <div className="flex items-center justify-between">
        <span className="no-star inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
          {categoryLabel}
        </span>

        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ring-1 ${hasPrice ? "bg-amber-100 text-amber-800 ring-amber-200" : "bg-gray-50 text-gray-500 ring-gray-200"}`}>
          {hasPrice ? `비용 ${item.detail.price}` : "비용 입력 전"}
        </span>
      </div>

      <div className="mt-2 text-base font-semibold">{item.title}</div>
      <div className="mt-1 text-sm text-gray-600">{item.summary}</div>

      <Link
        to={`/cases/${item.id}`}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow transition-colors hover:bg-amber-600"
      >
        자세히 보기 →
      </Link>
    </div>
  );
}

// ----- Cases Page -----
function CasesPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return CASES.filter(c =>
      (tab === "all" || c.category === tab) &&
      (c.title.toLowerCase().includes(s) || c.summary.toLowerCase().includes(s))
    );
  }, [q, tab]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="border-b bg-white px-6 py-10 md:px-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">가능 작업</h1>
        <p className="mt-2 text-sm text-gray-600">사진/주소 확인 후 정확 견적 안내됩니다.</p>

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
              className={`rounded-full border px-4 py-2 text-sm ${
                tab === c.key ? "border-amber-500 bg-amber-500 text-white shadow" : "border-amber-200 bg-white text-amber-800 hover:bg-amber-50"
              }`}
            >
              {c.label}
            </button>
          ))}

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="검색 (예: 수전, 환풍기)"
            className="ml-auto w-full rounded-full border border-amber-200 px-4 py-2 text-sm outline-none focus:border-amber-500 md:w-72"
          />
        </div>
      </section>

      <section className="px-6 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ----- Detail -----
function CaseDetailPage() {
  const { id } = useParams();
  const item = CASES.find((c) => c.id === id);

  if (!item) return <div>항목 없음</div>;

  const rows = [
    { label: "시공내역", value: item.detail.content },
    { label: "비용", value: item.detail.price },
    { label: "공임비", value: item.detail.labor },
    { label: "제품비용", value: item.detail.material },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="border-b bg-white px-6 py-10 md:px-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">{item.title}</h1>
        <p className="text-sm text-gray-600 mt-1">사례 상세 안내</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <dl className="grid gap-3 md:grid-cols-2">
              {rows.map((r, i) => (
                <div key={i} className="rounded-xl border bg-amber-50/40 p-3 ring-1 ring-amber-100">
                  <dt className="text-xs font-semibold text-amber-700">{r.label}</dt>
                  <dd className="mt-1 whitespace-pre-line text-gray-900">{r.value || " "}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm text-sm text-gray-700">
            {item.summary}
          </div>

          <div className="rounded-xl bg-amber-50 p-4 text-xs text-amber-900 ring-1 ring-amber-200">
            * 현장 상태에 따라 비용은 변경될 수 있습니다.
          </div>

          <div className="flex gap-3">
            <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600">
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

// ----- FAQ -----
function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="border-b bg-white px-6 py-10 md:px-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h1>
      </section>

      <Footer />
    </main>
  );
}

// ----- App -----
export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyleReset />
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

// Landing Page
function Landing() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="px-6 py-16 md:px-8">
        <h1 className="text-3xl font-extrabold md:text-5xl">생활수리 <span className="text-amber-600">빠른 연결</span></h1>
        <p className="mt-3 text-gray-600">
          보일러 · 전기 · 누수 · 문 개방 등 지역 기사님 즉시 연결
        </p>
        <div className="mt-6 flex gap-3">
          <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-600">
            카카오채널 문의
          </a>
          <button onClick={() => navigate("/cases")} className="rounded-2xl border border-amber-300 bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-700 hover:bg-white">
            가능 작업 보기
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
