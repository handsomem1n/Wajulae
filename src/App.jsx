import React, { useEffect, useMemo, useState } from "react";

/* 네비게이션: 서비스 소개(#hero로 스크롤), 표준 견적/FAQ/문의는 오버레이 페이지 */
const NAV = [
  { id: "about",   label: "서비스 소개", type: "scroll" },
  { id: "pricing", label: "표준 견적",   type: "page"   },
  { id: "faq",     label: "FAQ",        type: "page"   },
  { id: "contact", label: "문의",        type: "page"   },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (v[0]) setActive(v[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
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
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

/* ===== 문서 모달 동일, 생략 없이 그대로 유지 ===== */
... (📌 여기 약관/법무/개인정보 부분은 네 코드 그대로 두면 됨 — 수정 없음) ...

/* ===== 표준 견적 섹션 ===== */
function SectionPricing() {
  const items = [
    { t: "콘센트 교체",              p: "60,000원",   d: "수량·배선 상태에 따라 변동",           img: "/images/test1.png" },
    { t: "해바라기 수전 교체",        p: "450,000원",  d: "부품·난이도에 따라 변동",             img: "/images/showerhead.jpg" },
    { t: "인터폰 교체",              p: "400,000원",  d: "기종·배선 상태에 따라 변동",           img: "/images/intercom.jpg" },
    { t: "현관문 플로어 힌지 교체",  p: "150,000원",  d: "도어 규격·부품에 따라 변동",           img: "/images/door-hinge.jpg" },
    { t: "싱크대 상판 리모델링 교체", p: "1,200,000원", d: "자재·타공·길이에 따라 변동",          img: "/images/countertop.jpg" },
    { t: "싱크대 수전 교체",         p: "100,000원",  d: "배관·벽체 상태에 따라 변동",           img: "/images/kitchen-faucet.jpg" },
    { t: "타일 한 박스 부분 교체",    p: "180,000원",  d: "면적·자재 수급에 따라 변동",           img: "/images/tiles.jpg" },
    { t: "주방후드 교체",            p: "500,000원",  d: "덕트·전원 위치에 따라 변동",           img: "/images/kitchen-hood.jpg" },
    { t: "언더카운트 세면대 부착",   p: "160,000원",  d: "상판 재질·브라켓 유무에 따라 변동",    img: "/images/undercounter-sink.jpg" },
    { t: "싱크대 배수통 부착",       p: "80,000원",   d: "사이즈·타공 유무에 따라 변동",         img: "/images/drain-basket.jpg" },
    { t: "화장실 환풍기 교체",       p: "100,000원",  d: "전원·덕트 상태에 따라 변동",           img: "/images/bath-fan.jpg" },
    { t: "샤워 수전 교체",           p: "150,000원",  d: "배관·벽체 상태에 따라 변동",           img: "/images/shower-faucet.jpg" },
    { t: "LED 등 교체",              p: "80,000원",   d: "규격·천장 타입에 따라 변동",           img: "/images/led-light.jpg" },
    { t: "세면대 수전 교체",         p: "120,000원",  d: "규격·배관 상태에 따라 변동",           img: "/images/basin-faucet.jpg" },
    { t: "비상센서등 교체",          p: "100,000원",  d: "전원·설치 위치에 따라 변동",           img: "/images/emergency-light.jpg" },
    { t: "폽업 교체",                p: "45,000원",   d: "규격·막힘 여부에 따라 변동",           img: "/images/pop-up.jpg" },
    { t: "소변기 센서 교체",         p: "100,000원",  d: "전원·배관 상태에 따라 변동",           img: "/images/urinal-sensor.jpg" },
    { t: "현관문 경첩 교체",         p: "200,000원",  d: "도어 무게·힌지 규격에 따라 변동",      img: "/images/door-hinge2.jpg" },
    { t: "문 재부착 및 수리",        p: "50,000원",   d: "틀 뒤틀림·경첩 상태에 따라 변동",      img: "/images/door-repair.jpg" },
    { t: "문고리 교체",              p: "50,000원",   d: "백세트 규격·문두께에 따라 변동",       img: "/images/door-handle.jpg" },
>>>>>>> parent of 092ac10 (Update App.jsx)
  ];

  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((c) =>
      (c.t + " " + c.d).toLowerCase().includes(keyword)
    );
  }, [q, items]);

  return (
    <section id="pricing" className="py-16 bg-neutral-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">표준 견적 가이드</h2>
            <p className="text-neutral-500 mt-2">항목은 참고용 표준가입니다.</p>
          </div>

          <div className="w-full sm:w-auto">
            <label className="relative block">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="이미지/항목 검색"
                className="w-full sm:w-80 pl-11 pr-24 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 ring-offset-0"
                type="search"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                <SearchIcon />
              </span>
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                >
                  지우기
                </button>
              )}
            </label>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((c) => (
            <div key={c.t} className="text-left rounded-2xl bg-white ring-1 ring-neutral-200 p-4 select-none">
              {c.img && (
                <img src={c.img} alt={c.t} className="aspect-[4/3] w-full object-cover rounded-xl mb-3" />
              )}
              <p className="font-semibold">{c.t}</p>
              <p className="mt-1 text-lg font-extrabold">{c.p}</p>
              <p className="text-neutral-500 text-sm mt-1">{c.d}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-500 mt-4">※ 현장 상황에 따라 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}

/* ===== 주요 앱 레이아웃 ===== */
export default function App() {
  const active = useScrollSpy(["hero", ...NAV.map((n) => n.id)]);
  const [currentPage, setCurrentPage] = useState(null);
  const isOverlayOpen = !!currentPage;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-neutral-50 text-neutral-900 [--primary:#00c7ae]">

      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-2 font-semibold text-lg"
            onClick={(e)=>{e.preventDefault(); document.getElementById("hero").scrollIntoView({behavior:"smooth"}); setCurrentPage(null);}}
          >
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-[var(--primary)] text-white font-bold">W</span>
            <span>와줄래</span>
            <span className="ml-2 text-sm text-neutral-500 hidden sm:inline">표준견적 안내 / 생활수리 플랫폼</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item)=>(
              <a
                key={item.id}
                href={"#"+item.id}
                onClick={(e)=>{e.preventDefault(); item.type==="scroll" ? document.getElementById("hero").scrollIntoView({behavior:"smooth"}) : setCurrentPage(item.id)}}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${active===item.id ? "bg-[var(--primary)] text-white shadow" : "text-neutral-700 hover:bg-neutral-100"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 히어로 - 가운데 정렬 완전 고정 */}
      {!isOverlayOpen && (
        <section id="hero" className="relative py-24 lg:py-32">
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 via-teal-50 to-white" />
          <div className="relative max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-14 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* 왼쪽 텍스트 */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                철산·광명·구로·가산<br className="hidden sm:block"/>생활수리 플랫폼
              </h1>
              <p className="mt-4 text-base sm:text-lg lg:text-xl text-neutral-700">
                참고용 표준가 제공 / 과장 없는 사전 안내
              </p>
              <div className="mt-10">
                <button onClick={()=>setCurrentPage("pricing")} className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--primary)] text-neutral-900 font-semibold shadow-lg hover:brightness-95">
                  표준 견적 바로가기 <ArrowRight/>
                </button>
              </div>
            </div>

            {/* 오른쪽 선택 UI */}
            <div className="rounded-3xl bg-white shadow-2xl ring-1 ring-neutral-200 p-6">
              <h3 className="font-bold text-lg text-center lg:text-left">어떤 도움이 필요하세요?</h3>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "전등 교체","콘센트/스위치","수전/배관","문/경첩/도어락","타일/실리콘","환풍기/후드"
                ].map((x)=>(
                  <div key={x} className="h-28 rounded-2xl ring-1 ring-neutral-200 bg-neutral-50 p-4 flex flex-col justify-between text-left">
                    <span className="text-2xl">🔧</span>
                    <span className="font-semibold">{x}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-neutral-500 text-center lg:text-left">* 사진이 있으면 상담이 더 빨라요</div>
            </div>

          </div>
        </section>
      )}

      {/* 오버레이 (표준 견적 / FAQ / 문의) */}
      {isOverlayOpen && (
        <div className="fixed inset-0 z-60 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white/90 border-b backdrop-blur z-70">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
              <button onClick={()=>setCurrentPage(null)} className="px-3 py-1 rounded-full ring-1 ring-neutral-300 hover:ring-neutral-400">← 메인으로</button>
              <span className="text-neutral-500 text-sm">{NAV.find((n)=>n.id===currentPage)?.label}</span>
            </div>
          </div>

          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {currentPage==="pricing" && <SectionPricing/>}
            {currentPage==="faq" && <SectionFAQ/>}
            {currentPage==="contact" && <SectionContact/>}
          </div>
        </div>
      )}

      {/* 푸터 */}
      {!isOverlayOpen && (
        <footer className="border-t border-neutral-200 bg-white py-10">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-neutral-600">
            <strong>와줄래</strong> | 사업자등록번호: [000-00-00000]
            <div className="text-xs text-neutral-400 mt-1">주소: 경기도 광명시 철산동</div>
          </div>
        </footer>
      )}

    </div>
  );
}
