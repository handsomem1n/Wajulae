import React, { useEffect, useState } from "react";

// ✅ 합법적 유사 제작 가이드
// - 로고/상표/사진/문구는 원문 그대로 사용하지 않습니다.
// - 레이아웃/흐름/상호작용 패턴만 참고하여 재구성했습니다.
// - 모든 텍스트는 새로 작성한 카피이며, 색상도 임의 팔레트로 구성했습니다.
// - 이미지 자리는 대체 배경/아이콘/플레이스홀더로 대체했습니다.

// Tailwind 기반 — 미니멀, 반응형, 접근성 고려
// 이 파일을 단독 React 컴포넌트로 내보내면 미리보기에서 바로 확인할 수 있습니다.

const NAV = [
  { id: "about", label: "서비스 소개" },
  { id: "features", label: "특장점" },
  { id: "process", label: "진행 절차" },
  { id: "pricing", label: "표준 견적" },
  { id: "cases", label: "시공 사례" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "문의" },
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
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fill="currentColor" d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z"/></svg>
);

const Play = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
);

export default function HomecoStyleLanding() {
  const active = useScrollSpy(NAV.map((n) => n.id));
  const [showCalc, setShowCalc] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-semibold text-lg" aria-label="홈">
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white">H</span>
            <span>홈픽스</span>
          </a>
          <nav className="hidden md:flex items-center gap-1" aria-label="주요 섹션">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                  active === item.id
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCalc(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-neutral-900 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
            >
              간편 견적 보기 <ArrowRight/>
            </button>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section id="hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-white"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 mb-4">
                <Check/> 표준 가격 & 무료 현장 점검
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                투명한 표준 견적,
                <span className="block">믿을 수 있는 집수리 플랫폼</span>
              </h1>
              <p className="mt-4 text-neutral-600 text-base sm:text-lg max-w-xl">
                클릭 몇 번으로 집수리를 신청하고, 전문가의 무료 방문 점검 후 표준화된 견적을 받아 보세요. 불필요한 추가 비용 없이 간단하고 빠르게.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#pricing" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:opacity-90 focus:ring-2 focus:ring-neutral-900/20">
                  표준 견적 보기 <ArrowRight/>
                </a>
                <a href="#about" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-neutral-200 font-semibold text-neutral-800 hover:bg-neutral-50">
                  소개 영상 <Play/>
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-2"><Check/> 출장비 무료</span>
                <span className="inline-flex items-center gap-2"><Check/> 표준 가격제</span>
                <span className="inline-flex items-center gap-2"><Check/> 시공 품질 보증</span>
              </div>
            </div>
            <div className="relative lg:h-[480px]">
              <div className="absolute -inset-8 bg-gradient-to-tr from-sky-200/40 to-cyan-100/40 rounded-[2rem] blur-2xl" aria-hidden/>
              <div className="relative aspect-[4/3] lg:absolute lg:inset-0 rounded-3xl border border-neutral-200 bg-white shadow-xl p-4 grid grid-cols-2 gap-4">
                {/* 이미지 플레이스홀더 카드 */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-3 flex flex-col gap-2">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100"/>
                    <div className="h-3 w-2/3 rounded bg-neutral-200"/>
                    <div className="h-3 w-1/2 rounded bg-neutral-200"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section id="about" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-bold">집수리를<br className="hidden sm:block"/> 더 쉽고, 합리적으로</h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                누구나 예측 가능한 가격으로, 어디서든 동일한 품질의 시공을 받는 세상을 목표로 합니다. 내부 표준 프로세스를 기반으로 접수·상담·시공까지 한 번에 처리합니다.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { t: "표준 견적", d: "작업 항목·난이도별 가격 가이드 제공" },
                  { t: "무료 점검", d: "전문가 방문 후 상태 진단 및 옵션 제안" },
                  { t: "품질 보증", d: "시공 완료 후 AS 보증 및 사후 케어" },
                  { t: "간편 신청", d: "모바일 1분 신청으로 빠른 접수" },
                ].map((f) => (
                  <li key={f.t} className="p-4 rounded-2xl border border-neutral-200 bg-white flex items-start gap-3">
                    <div className="mt-1"><Check/></div>
                    <div>
                      <p className="font-semibold">{f.t}</p>
                      <p className="text-neutral-600 text-sm">{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-video rounded-3xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:opacity-90">
                  <Play/> 브랜드 소개 영상 보기(플레이스홀더)
                </button>
              </div>
              <p className="mt-4 text-xs text-neutral-500">※ 실제 영상/사진/로고 미삽입 — 합법적 유사 제작</p>
            </div>
          </div>
        </div>
      </section>

      {/* 특장점 */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">왜 우리 서비스일까요?</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "투명한 가격", desc: "항목별 표준 가격표로 합리적인 의사결정" },
              { title: "전문가 네트워크", desc: "검증된 기술자와 표준 운영 매뉴얼" },
              { title: "빠른 응답", desc: "1분 신청 → 당일 상담(영업일 기준)" },
              { title: "안전 우선", desc: "자재·공정 체크리스트와 품질 보증" },
              { title: "데이터 기반", desc: "상담·시공 데이터를 바탕으로 지속 개선" },
              { title: "전국 커버리지", desc: "순차 확대 중 — 지역별 순차 지원" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-4">
                  <Check/>
                </div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-neutral-600 text-sm mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 절차 */}
      <section id="process" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">진행 절차</h2>
          <ol className="mt-8 grid md:grid-cols-4 gap-6">
            {[
              { n: 1, t: "간편 신청", d: "모바일 폼에 요청 입력 (1분)" },
              { n: 2, t: "무료 점검", d: "전문가 방문/상태 진단" },
              { n: 3, t: "표준 견적", d: "항목/난이도 기반 견적 제안" },
              { n: 4, t: "시공/검수", d: "체크리스트 기반 시공·품질 보증" },
            ].map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-neutral-200 bg-white p-6">
                <span className="absolute -top-3 -left-3 w-10 h-10 rounded-2xl bg-neutral-900 text-white font-bold inline-flex items-center justify-center">{s.n}</span>
                <p className="font-semibold mt-4">{s.t}</p>
                <p className="text-neutral-600 text-sm mt-1">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 표준 견적(샘플 카드) */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">표준 견적 가이드 (예시)</h2>
            <button onClick={() => setShowCalc(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-semibold">
              견적 계산기 열기 <ArrowRight/>
            </button>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { t: "콘센트 교체", p: "₩35,000~", d: "수량·배선 상태에 따라 변동" },
              { t: "수전 교체", p: "₩85,000~", d: "부품·난이도에 따라 변동" },
              { t: "벽지 보수", p: "₩70,000~", d: "면적·오염 상태에 따라 변동" },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 mb-4"/>
                <p className="font-semibold">{c.t}</p>
                <p className="text-2xl font-extrabold mt-1">{c.p}</p>
                <p className="text-neutral-600 text-sm mt-1">{c.d}</p>
                <div className="mt-auto pt-4">
                  <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-200 font-semibold hover:bg-neutral-100">
                    상담 요청 <ArrowRight/>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-4">※ 실제 가격은 현장 상태/자재/난이도에 따라 달라질 수 있습니다.</p>
        </div>
      </section>

      {/* 시공 사례(그리드) */}
      <section id="cases" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">시공 사례</h2>
            <a href="#contact" className="text-sm font-semibold underline underline-offset-4">더 보기</a>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white">
                <div className="aspect-[4/3] bg-neutral-100 group-hover:opacity-90 transition"/>
                <div className="p-5">
                  <h3 className="font-semibold">사례 #{i + 1}</h3>
                  <p className="text-sm text-neutral-600 mt-1">작업 설명(예: 전등 교체, 문 수리 등)</p>
                  <div className="mt-3 text-sm font-medium">₩000,000~</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">자주 묻는 질문</h2>
          <div className="mt-8 space-y-4">
            {[
              { q: "출장비가 정말 무료인가요?", a: "네, 기본 상담·점검은 무료이며, 일부 외곽 지역의 경우 사전 고지 후 교통비가 발생할 수 있습니다." },
              { q: "견적은 어떻게 산정하나요?", a: "작업 항목·난이도·자재·현장 접근성을 고려한 내부 표준표를 기반으로 산정합니다." },
              { q: "AS 보증은 얼마나 제공되나요?", a: "항목별로 상이하나 통상 3~12개월의 보증 기간을 제공합니다. 정확한 내용은 계약서에 명시합니다." },
            ].map((f, i) => (
              <details key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="text-neutral-600 mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 문의/푸터 */}
      <footer id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">간편 문의</h2>
              <p className="mt-2 text-neutral-600">필수 정보만 빠르게 남겨 주세요. 상담원이 연락드립니다.</p>
              <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e)=> e.preventDefault()}>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">이름</span>
                  <input required className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20" placeholder="홍길동"/>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">연락처</span>
                  <input required type="tel" className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20" placeholder="010-0000-0000"/>
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
                  <textarea rows={4} className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20" placeholder="상태/사진 링크 등"/>
                </label>
                <button className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:opacity-90">
                  접수하기 <ArrowRight/>
                </button>
                <p className="text-xs text-neutral-500">접수 시 개인정보 처리에 동의한 것으로 간주됩니다. (예: 연락처·주소 등 상담 목적 사용)</p>
              </form>
            </div>
            <div className="lg:pl-10">
              <div className="rounded-3xl border border-neutral-200 p-6 bg-white">
                <h3 className="font-semibold">고객 약속</h3>
                <ul className="mt-4 space-y-2 text-neutral-700">
                  <li className="flex items-start gap-2"><Check/><span>숨겨진 비용 없이 사전 고지된 표준 견적</span></li>
                  <li className="flex items-start gap-2"><Check/><span>전문가 무료 방문 점검</span></li>
                  <li className="flex items-start gap-2"><Check/><span>시공 품질 보증 및 사후 케어</span></li>
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
                © {new Date().getFullYear()} 홈픽스 — 본 페이지는 레이아웃 레퍼런스 기반의 합법적 유사 제작 예시입니다.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 견적 계산기 — 단순 데모 모달 */}
      {showCalc && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={()=> setShowCalc(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">간편 견적 계산기(데모)</h3>
              <button onClick={()=> setShowCalc(false)} className="px-3 py-1 rounded-lg border">닫기</button>
            </div>
            <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={(e)=> e.preventDefault()}>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">작업 항목</span>
                <select className="px-4 py-3 rounded-xl border border-neutral-300">
                  <option>콘센트 교체</option>
                  <option>수전 교체</option>
                  <option>벽지 보수</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">수량/면적</span>
                <input type="number" className="px-4 py-3 rounded-xl border border-neutral-300" placeholder="예: 3"/>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">난이도</span>
                <select className="px-4 py-3 rounded-xl border border-neutral-300">
                  <option>보통</option>
                  <option>쉬움</option>
                  <option>어려움</option>
                </select>
              </label>
              <button className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:opacity-90">
                대략 견적 보기 <ArrowRight/>
              </button>
              <p className="text-xs text-neutral-500">※ 실제 금액은 현장 점검 후 확정됩니다.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
