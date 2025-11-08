// src/App.jsx
import React, { useEffect, useState } from "react";

/* 네비게이션: 서비스 소개(#hero로 스크롤), 표준 견적/FAQ/문의는 오버레이 페이지 */
const NAV = [
  { id: "about",   label: "서비스 소개", type: "scroll" },
  { id: "pricing", label: "표준 견적",   type: "page"   },
  { id: "faq",     label: "FAQ",        type: "page"   },
  { id: "contact", label: "문의",        type: "page"   },
];

/* 현재 섹션 하이라이트 */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        const v = entries.filter(e => e.isIntersecting)
                         .sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
        if (v[0]) setActive(v[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0,0.25,0.5,0.75,1] }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) ob.observe(el); });
    return () => ob.disconnect();
  }, [ids]);
  return active;
}

/* 아이콘들 */
const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <path fill="currentColor" d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z"/>
  </svg>
);

/* ===== 표준 견적 (가격은 여기 items 배열에서 숫자만 바꾸면 됩니다) ===== */
function SectionPricing() {
  // ✅ 숫자/문자만 바꾸면 즉시 반영
  const items = [
    { t: "콘센트 교체",              p: "60,000원", d: "수량·배선 상태에 따라 변동" },
    { t: "해바라기 수전 교체",        p: "450,000원", d: "부품·난이도에 따라 변동" },
    { t: "인터폰 교체",              p: "400,000",     d: "기종·배선 상태에 따라 변동" },
    { t: "현관문 플로어 힌지 교체",  p: "150,000원",     d: "도어 규격·부품에 따라 변동" },
    { t: "싱크대 상판 리모델링 교체", p: "120,000원",     d: "자재·타공·길이에 따라 변동" },
    { t: "싱크대 수전 교체",       p: "100,000원",     d: "배관·벽체 상태에 따라 변동" },
    { t: "타일 한 박스 부분 교체",    p: "180,000원",     d: "면적·자재 수급에 따라 변동" },
    { t: "주방후드 교체",            p: "500,000원",     d: "덕트·전원 위치에 따라 변동" },
    { t: "언더카운트 세면대 부착",   p: "160,000원",     d: "상판 재질·브라켓 유무에 따라 변동" },
    { t: "싱크대 배수통 부착",       p: "80,000원",     d: "사이즈·타공 유무에 따라 변동" },
    { t: "화장실 환풍기 교체",       p: "100,000원",     d: "전원·덕트 상태에 따라 변동" },
    { t: "샤워 수전 교체",           p: "150,000원",     d: "배관·벽체 상태에 따라 변동" },
    { t: "LED 등 교체",              p: "80,000원",     d: "규격·천장 타입에 따라 변동" },
    { t: "세면대 수전 교체",         p: "120,000원",     d: "규격·배관 상태에 따라 변동" },
    { t: "비상센서등 교체",          p: "100,000원",     d: "전원·설치 위치에 따라 변동" },
    { t: "폽업 교체",                p: "45,000원",     d: "규격·막힘 여부에 따라 변동" },
    { t: "소변기 센서 교체",         p: "100,000원",     d: "전원·배관 상태에 따라 변동" },
    { t: "현관문 경첩 교체",         p: "200,000원",     d: "도어 무게·힌지 규격에 따라 변동" },
    { t: "문 재부착 및 수리",        p: "50,000원",     d: "틀 뒤틀림·경첩 상태에 따라 변동" },
    { t: "문고리 교체",              p: "50,000원",     d: "백세트 규격·문두께에 따라 변동" },
  ];

  return (
    <section id="pricing" className="py-16 bg-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold">표준 견적 가이드</h2>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((c) => (
            <div key={c.t} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-100 mb-3" />
              <p className="font-semibold text-sm">{c.t}</p>
              <p className="text-base font-bold mt-1">{c.p}</p>
              <p className="text-neutral-600 text-xs mt-1">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-500 mt-4">※ 현장 상황에 따라 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}

/* ===== FAQ (출장비 질문 제거) ===== */
function SectionFAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold">자주 묻는 질문</h2>
        <div className="mt-8 space-y-4">
          {[
            { q: "견적은 어떻게 산정하나요?", a: "작업 항목·난이도·자재·현장 접근성을 고려한 내부 표준표를 기반으로 산정합니다." },
     
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

/* ===== 문의 ===== */
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
                <li className="flex items-start gap-2"><Check /><span>사전 고지된 표준 견적</span></li>
                <li className="flex items-start gap-2"><Check /><span>전문가 방문 점검</span></li>
                <li className="flex items-start gap-2"><Check /><span>시공 품질 보증</span></li>
              </ul>
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              © {new Date().getFullYear()} 와줄래 — 레이아웃 레퍼런스 기반 합법적 유사 제작 예시.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== 앱 루트 ===== */
export default function App() {
  const active = useScrollSpy(["hero", ...NAV.map(n => n.id)]);
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
                  onClick={(e) => { e.preventDefault(); setCurrentPage("pricing"); }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:opacity-90 focus:ring-2 focus:ring-neutral-900/20"
                >
                  표준 견적 보기 <ArrowRight />
                </a>
                <a
                  href="#faq"
                  onClick={(e) => { e.preventDefault(); setCurrentPage("faq"); }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-neutral-200 font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  FAQ 보기
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-2"><Check /> 표준 가격제</span>
                <span className="inline-flex items-center gap-2"><Check /> 지역 집중 운영</span>
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

      {/* 오버레이 페이지들 */}
      {currentPage && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-stretch">
          <div className="absolute inset-0 bg-white" />
          <div className="relative w-full h-full overflow-y-auto">
            <div className="sticky top-0 z-[61] bg-white/90 border-b border-neutral-200 backdrop-blur">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <button className="px-3 py-1 rounded-lg border" onClick={() => setCurrentPage(null)}>← 메인으로</button>
                  <span className="text-neutral-500 text-sm">{NAV.find(n => n.id === currentPage)?.label}</span>
                </div>
                <a
                  href="#hero"
                  onClick={(e) => { e.preventDefault(); setCurrentPage(null); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="text-sm underline underline-offset-4"
                >
                  와줄래 홈
                </a>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {currentPage === "pricing" && <SectionPricing />}
              {currentPage === "faq"     && <SectionFAQ />}
              {currentPage === "contact" && <SectionContact />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
