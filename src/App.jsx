import React, { useMemo, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

// 카테고리 라벨 매핑 (영문 키 -> 한글)
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
  // …필요 시 추가
];

// ---------- Card ----------
function CaseCard({ item }: { item: any }) {
  const categoryLabel = CATEGORY_LABELS[item.category] || item.category;
  const hasPrice = !!(item.price && String(item.price).trim());
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

      <div className="flex items-center justify-between">
