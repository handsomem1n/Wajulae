// src/App.jsx
import React, { useEffect, useState } from "react";

/* 구성
 - 히어로(배지: '표준 가격'만 표기)
 - 표준 견적 (오버레이 페이지로 열림)
 - FAQ (오버레이 페이지)
 - 문의 (오버레이 페이지)
 - 특장점/진행절차/가능견적/소개영상 모두 제거
*/

const NAV = [
  { id: "about",   label: "서비스 소개", type: "scroll" }, // 로고와 동일, #hero로 스크롤
  { id: "pricing", label: "표준 견적",   type: "page"   },
  { id: "faq",     label: "FAQ",        type: "page"   },
  { id: "contact", label: "문의",        type: "page"   },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <path fill="currentColor" d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z" />
  </svg>
);

/* 섹션: 표준 견적 */
function SectionPricing() {
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold">표준 견적 가이드 (예시)</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { t: "콘센트 교체", p: "₩35,000~", d: "수량·배선 상태에 따라 변동" },
            { t: "수전 교체", p: "₩85,000~", d: "부품·난이도에 따라 변동" },
            { t: "벽지 보수", p: "₩70,000~", d: "면적·오염 상태에 따라 변동" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 mb-4" />
              <p className="font-semibold">{c.t}</p>
              <p className="text-2xl font-extrabold mt-1">{c.p}</p>
              <p className="text-neutral-600 text-sm mt-1">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-500 mt-4">※ 실제 가격은 현장 상태/자재/난이도에 따라 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}

/* 섹션: FAQ */
function SectionFAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold">자주 묻는 질문</h2>
        <div className="mt-8 space-y-4">
          {[
            { q: "출장비가 정말 무료인가요?", a: "기본 상담·점검은 무료입니다. 일부 외곽 지역은 사전 고지 후 교통비가 발생할 수 있습니다." },
            { q: "견적은 어떻게 산정하나요?", a: "작업 항목·난이도·자재·현장 접근성을 고려한 내부 표준표를 기반으로 산정합니다." },
            { q: "AS 보증은 얼마나 제공되나요?", a: "항목별로 상이하나 통상 3~12개월 보증을 제공합니다. 계약서에 명시됩니다." },
          ].map((f, i) => (
            <details key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="text-neutral-600 mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 섹션: 문의 */
function SectionContact() {
  return (
    <footer id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">간편 문의</h2>
            <p className="mt-2 text-neutral-600">필수 정보만 빠르게 남겨 주세요. 상담원이 연락드립니다.</p>
            <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">이름</span>
                <input required className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20" placeholder="홍길동" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">연락처</span>
                <input required type="tel" className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20" placeholder="010-0000-0000" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">요청 항목</span>
                <select className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20">
                  <option>콘센트 교체</option>
                  <option>수전 교체</option>
                  <option>전등/전기</option>
                  <option>문/잠금장치</option>
                  <option>기타</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">상세 설명</span>
                <textarea rows={4} className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20" placeholder="상태/사진 링크 등" />
              </label>
              <button className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:opacity-90">
                접수하기 <ArrowRight />
              </button>
            </form>
          </div>
          <div className="lg:pl-10">
            <div className="rounded-3xl border border-neutral-200 p-6 bg-white">
              <h3 className="font-semibold">고객 약속</h3>
              <ul className="mt-4 space-y-2 text-neutral-700">
                <li className="flex items-start gap-2"><Check /><span>숨겨진 비용 없이 사전 고지된 표준 견적</span></li>
                <li className="flex items-start gap-2"><Check /><span>전문가 무료 방문 점검</span></li>
                <li className="flex items-start gap-2"><Check /><span>시공 품질 보증 및 사후 케어</span></li>
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { k: "만족도", v: "4.9/5" },
                  { k: "재이용률", v: "1/6" },
                  { k: "평균 응답", v: "당일" },
                ].map((m) => (
                  <div key={m.k} className="rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
                    <p className="text-xs text-neutral-500">{m.k}</p>
                    <p className="text-xl font-extrabold mt-1">{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              © {new Date().getFullYear()} 와줄래 — 본 페이지는 레이아웃 레퍼런스 기반의 합법적 유사 제작 예시입니다.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* === 앱 루트 === */
export default function App() {
  const active = useScrollSpy(["hero", ...NAV.map((n) => n.id)]);
  const [currentPage, setCurrentPage] = useState(null);

  const handleNavClick = (item) => (e) => {
    if (item.type === "scroll") {
      e.preventDefault();
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      setCurrentPage(null);
    } else {
      e.preventDefault();
      setCurrentPage(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-2 font-semibold text-lg"
            aria-label="홈"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              setCurrentPage(null);
            }}
          >
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white">W</span>
            <span>와줄래</span>
          </a>
          <nav className="hidden md:flex items-center gap-1" aria-label="주요 섹션">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick(item)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition ${active === item.id ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section id="hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 mb-4">
                표준 가격
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                동네 기사님 바로 연결
                <span className="block">철산·광명·구로·가산 긴급 수리</span>
              </h1>
              <p className="mt-4 text-neutral-600 text-base sm:text-lg max-w-xl">
                빠르게 찾아가 해결합니다. 사전 안내된 정찰제 비용으로 부담 없이 진행됩니다.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage("pricing");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:opacity-90 focus:ring-2 focus:ring-neutral-900/20"
                >
                  표준 견적 보기 <ArrowRight />
                </a>
              </div>
            </div>
            <div className="relative lg:h-[480px]">
              <div className="absolute -inset-8 bg-gradient-to-tr from-sky-200/40 to-cyan-100/40 rounded-[2rem] blur-2xl" aria-hidden />
              <div className="relative aspect-[4/3] lg:absolute lg:inset-0 rounded-3xl border border-neutral-200 bg-white shadow-xl p-4 grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-3 flex flex-col gap-2">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100" />
                    <div className="h-3 w-2/3 rounded bg-neutral-200" />
                    <div className="h-3 w-1/2 rounded bg-neutral-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 페이지에는 추가 섹션을 직접 노출하지 않음 (요청 반영) */}

      {/* 전체 화면 오버레이 (페이지 전환처럼) */}
      {currentPage && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-stretch">
          <div className="absolute inset-0 bg-white" />
          <div className="relative w-full h-full overflow-y-auto">
            <div className="sticky top-0 z-[61] bg-white/90 border-b border-neutral-200 backdrop-blur">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <button className="px-3 py-1 rounded-lg border" onClick={() => setCurrentPage(null)}>
                    ← 메인으로
                  </button>
                  <span className="text-neutral-500 text-sm">{NAV.find((n) => n.id === currentPage)?.label}</span>
                </div>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(null);
                    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm underline underline-offset-4"
                >
                  와줄래 홈
                </a>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {currentPage === "pricing" && <SectionPricing />}
              {currentPage === "faq" && <SectionFAQ />}
              {currentPage === "contact" && <SectionContact />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
