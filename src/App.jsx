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

/* 아이콘 */
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
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

/* ─────────────────────────────
   약관/법적 고지/개인정보 모달 (그대로 유지)
   ───────────────────────────── */
function LegalModal({ open, onClose, activeTab, setActiveTab }) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const TabButton = ({ id, children }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={
        "px-3 py-2 rounded-full text-sm font-semibold transition " +
        (activeTab === id
          ? "bg-primary text-white shadow"
          : "text-neutral-700 hover:bg-neutral-100")
      }
      aria-pressed={activeTab === id}
    >
      {children}
    </button>
  );

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="relative mx-auto mt-[6vh] max-w-4xl rounded-2xl bg-white shadow-2xl border border-neutral-200">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <div className="flex items-center gap-2">
            <TabButton id="tos">이용약관</TabButton>
            <TabButton id="legal">법적 고지</TabButton>
            <TabButton id="privacy">개인정보 처리방침</TabButton>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100" aria-label="닫기">×</button>
        </div>
        <div className="max-h-[72vh] overflow-y-auto p-6 text-[14px] leading-relaxed text-neutral-800">
          {activeTab === "tos" && <TOS setActiveTab={setActiveTab} />}
          {activeTab === "legal" && <LegalNotice />}
          {activeTab === "privacy" && <Privacy />}        
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────
   문서 섹션 분리 (읽기 쉬움)
   ───────────────────────────── */
const TOS = ({ setActiveTab }) => (
  <article className="space-y-4">
    <p className="text-xs text-neutral-500">시행일: 2025-11-09 · 와줄래(“회사”)</p>
    <h3 className="font-bold text-base">제1조 (목적)</h3>
    <p>본 약관은 회사가 운영하는 생활수리·설치·점검 등의 <strong>중개 플랫폼</strong>(이하 “플랫폼”) 이용에 있어 회사와 이용자(고객/기사)의 권리·의무 및 책임 사항을 정합니다.</p>
    <h3 className="font-bold text-base">제2조 (정의)</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>“고객”: 플랫폼을 통해 서비스를 요청하는 자</li>
      <li>“기사(서비스 제공자)”: 고객에게 직접 시공·용역을 제공하는 독립 개인 또는 사업자</li>
      <li>“중개서비스”: 매칭·결제 등 연결을 위한 온라인 시스템</li>
      <li>“거래계약”: 고객과 기사 간 직접 체결되는 용역 계약</li>
    </ul>
    <h3 className="font-bold text-base">제3조 (중개 서비스의 성격)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>회사는 <strong>중개자</strong>이며, 실제 시공·용역의 <strong>당사자</strong>가 아닙니다.</li>
      <li>고객과 기사 간 거래계약은 상호 합의로 성립하며 회사는 당사자가 아닙니다.</li>
      <li>기사는 회사의 지휘·감독을 받지 않는 <strong>독립 사업자</strong>입니다.</li>
    </ol>
    <h3 className="font-bold text-base">제4조 (시공·용역 책임)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>품질·안전·하자보수·일정·손해배상 등 <strong>모든 법적 책임은 기사</strong>에게 있습니다.</li>
      <li>기사는 관련 법령·자격·안전기준을 준수하며, 위반 시 책임은 기사에게 있습니다.</li>
      <li>고객은 작업 범위·가격·AS 조건을 기사와 사전 합의해야 합니다.</li>
    </ol>
    <h3 className="font-bold text-base">제5조 (가격·결제·수수료)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>대금은 고객과 기사 간 합의로 확정됩니다.</li>
      <li>회사는 PG/에스크로 등 결제 시스템을 제공하고 <strong>중개 수수료</strong>를 부과할 수 있으며, 세부는 플랫폼에 고지합니다.</li>
    </ol>
    <h3 className="font-bold text-base">제6조 (취소·환불)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>배정 전 취소는 전액 환불이 원칙입니다.</li>
      <li>배정 후 취소/이미 제공된 용역은 기사와의 약정 및 법령에 따릅니다.</li>
    </ol>
    <h3 className="font-bold text-base">제7조 (분쟁 해결)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>분쟁은 당사자 간 해결을 원칙으로 합니다.</li>
      <li>회사는 상담/중재를 안내할 수 있으나 법적 강제권은 없습니다.</li>
    </ol>
    <h3 className="font-bold text-base">제8조 (면책)</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>기사 과실·계약 위반</li>
      <li>고객 제공 정보의 오류</li>
      <li>천재지변 등 불가항력</li>
      <li>회사의 중대한 과실이 없는 한 시스템 장애로 인한 간접·특별·결과적 손해</li>
    </ul>
    <h3 className="font-bold text-base">제9조 (자격·보험)</h3>
    <p>특정 업종에 필요한 자격/면허/보험은 기사 책임이며, 유지·갱신의 책임 또한 기사에게 있습니다.</p>
    <h3 className="font-bold text-base">제10조 (개인정보 보호)</h3>
    <p>개인정보 처리에 관한 사항은 <button className="underline underline-offset-4" onClick={() => setActiveTab("privacy")}>개인정보 처리방침</button>을 따릅니다.</p>
    <h3 className="font-bold text-base">제11조 (준거법/관할)</h3>
    <p>대한민국 법령을 준거법으로 하며, 관할은 민사소송법에 따릅니다.</p>
    <p className="text-xs text-neutral-500">문의: legal@wajullae.co.kr</p>
  </article>
);

const LegalNotice = () => (
  <article className="space-y-4">
    <p className="text-xs text-neutral-500">시행일: 2025-11-09 · 와줄래(“회사”)</p>
    {[
      {t:"① 회사 역할 및 책임 한정", d:"회사는 고객과 기사를 연결하는 온라인 중개서비스 제공자이며, 실제 시공·용역의 당사자가 아닙니다. 시공 결과·품질·안전·하자보수·손해배상 등 법적 책임은 기사에게 있습니다."},
      {t:"② 기사의 독립성", d:"기사는 회사의 피용자/대리인이 아닌 독립 사업자로서 작업 방식·일정·안전관리의 권한과 책임을 스스로 부담합니다."},
      {t:"③ 하자·AS 및 환불", d:"하자보수·환불 기준은 고객-기사 간 계약에 따르며, 제공 완료된 용역은 법령이 허용하는 범위에서 환불이 제한될 수 있습니다."},
      {t:"④ 자격·보험·법령 준수", d:"특정 업종의 자격증·면허·보험 가입은 기사 책임이며, 법령 위반 시 모든 책임은 기사에게 귀속됩니다."},
      {t:"⑤ 분쟁 처리", d:"분쟁은 당사자 간 해결을 원칙으로 하며, 회사는 상담/중재를 안내할 수 있으나 법적 강제권은 없습니다."}
    ].map((x,i)=> (
      <details key={i} className="rounded-2xl border p-4 group">
        <summary className="font-semibold cursor-pointer flex items-center justify-between">
          <span>{x.t}</span>
          <span className="text-neutral-400 group-open:rotate-180 transition">⌄</span>
        </summary>
        <p className="mt-2 text-neutral-700">{x.d}</p>
      </details>
    ))}
    <p className="text-xs text-neutral-500">※ 본 고지는 플랫폼의 법적 지위를 명확히 하기 위한 요약입니다. 상세한 권리·의무는 “이용약관”을 따릅니다.</p>
  </article>
);

const Privacy = () => (
  <article className="space-y-4">
    <p className="text-xs text-neutral-500">시행일: 2025-11-09 · 와줄래</p>
    <h3 className="font-bold text-base">개인정보 처리방침(요약)</h3>
    <p><strong>수집 항목</strong>: 성명, 연락처, 주소, 결제정보, 이용기록 등 · <strong>목적</strong>: 매칭·결제·고객지원 · <strong>보관</strong>: 목적 달성 후 지체없이 파기(법정 보관 예외)</p>
    <h4 className="font-semibold">수집/이용</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li>회원가입·매칭·결제·정산·분쟁대응을 위한 최소 정보 수집</li>
      <li>법령상 거래기록은 관련 기간 보관</li>
    </ul>
    <h4 className="font-semibold">제3자 제공/처리위탁</h4>
    <p>PG사·문자전송·클라우드·고객센터 등에 한정하여 위탁하며, 수탁사/항목/기간은 서비스 내 고지합니다.</p>
    <h4 className="font-semibold">이용자 권리</h4>
    <p>열람·정정·삭제·처리정지·동의 철회 요청 가능</p>
    <h4 className="font-semibold">보호조치</h4>
    <p>암호화·접근통제·접속기록 보관·침해사고 대응</p>
    <p className="text-xs text-neutral-500">전문은 별도 문서로 제공되며, 본 요약은 이해를 돕기 위한 것입니다.</p>
  </article>
);

/* ===== 표준 견적 (Soomgo 느낌 카드 스타일) ===== */
function SectionPricing() {
  const items = [
    { t: "콘센트 교체",              p: "60,000원",  d: "수량·배선 상태에 따라 변동" },
    { t: "해바라기 수전 교체",        p: "450,000원", d: "부품·난이도에 따라 변동" },
    { t: "인터폰 교체",              p: "400,000원", d: "기종·배선 상태에 따라 변동" },
    { t: "현관문 플로어 힌지 교체",  p: "150,000원", d: "도어 규격·부품에 따라 변동" },
    { t: "싱크대 상판 리모델링 교체", p: "120,000원", d: "자재·타공·길이에 따라 변동" },
    { t: "싱크대 수전 교체",         p: "100,000원", d: "배관·벽체 상태에 따라 변동" },
    { t: "타일 한 박스 부분 교체",    p: "180,000원", d: "면적·자재 수급에 따라 변동" },
    { t: "주방후드 교체",            p: "500,000원", d: "덕트·전원 위치에 따라 변동" },
    { t: "언더카운트 세면대 부착",   p: "160,000원", d: "상판 재질·브라켓 유무에 따라 변동" },
    { t: "싱크대 배수통 부착",       p: "80,000원",  d: "사이즈·타공 유무에 따라 변동" },
    { t: "화장실 환풍기 교체",       p: "100,000원", d: "전원·덕트 상태에 따라 변동" },
    { t: "샤워 수전 교체",           p: "150,000원", d: "배관·벽체 상태에 따라 변동" },
    { t: "LED 등 교체",              p: "80,000원",  d: "규격·천장 타입에 따라 변동" },
    { t: "세면대 수전 교체",         p: "120,000원", d: "규격·배관 상태에 따라 변동" },
    { t: "비상센서등 교체",          p: "100,000원", d: "전원·설치 위치에 따라 변동" },
    { t: "폽업 교체",                p: "45,000원",  d: "규격·막힘 여부에 따라 변동" },
    { t: "소변기 센서 교체",         p: "100,000원", d: "전원·배관 상태에 따라 변동" },
    { t: "현관문 경첩 교체",         p: "200,000원", d: "도어 무게·힌지 규격에 따라 변동" },
    { t: "문 재부착 및 수리",        p: "50,000원",  d: "틀 뒤틀림·경첩 상태에 따라 변동" },
    { t: "문고리 교체",              p: "50,000원",  d: "백세트 규격·문두께에 따라 변동" },
  ];

  return (
    <section id="pricing" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">표준 견적 가이드</h2>
        <p className="text-neutral-500 mt-2">항목을 선택하면 담당자가 빠르게 연락드립니다.</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((c) => (
            <button
              key={c.t}
              className="text-left rounded-2xl bg-white ring-1 ring-neutral-200 hover:ring-primary/40 hover:shadow-md transition p-4 group"
            >
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 mb-3" />
              <p className="font-semibold">{c.t}</p>
              <p className="mt-1 text-lg font-extrabold text-primary">{c.p}</p>
              <p className="text-neutral-500 text-sm mt-1">{c.d}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-primary text-sm opacity-0 group-hover:opacity-100">바로 문의하기 <ArrowRight /></span>
            </button>
          ))}
        </div>
        <p className="text-xs text-neutral-500 mt-4">※ 현장 상황에 따라 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}

/* ===== FAQ ===== */
function SectionFAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">자주 묻는 질문</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {[
            { q: "견적은 어떻게 산정하나요?", a: "작업 항목·난이도·자재·현장 접근성을 고려한 내부 표준표를 기반으로 산정합니다." },
            { q: "예약은 어떻게 진행돼요?", a: "요청 접수 → 기사 배정 → 방문 점검 → 작업/정산 순서로 진행됩니다." },
            { q: "하자보수는 누가 책임지나요?", a: "시공의 주체는 기사이며, 하자보수 책임 또한 기사에게 있습니다." },
            { q: "결제는 안전한가요?", a: "PG/에스크로 연동으로 안전 결제를 지원합니다." },
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
    <footer id="contact" className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">간편 문의</h2>
            <p className="mt-2 text-neutral-600">필수 정보만 빠르게 남겨 주세요. 상담원이 연락드립니다.</p>
            <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">이름</span>
                <input required className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="홍길동" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">연락처</span>
                <input required type="tel" className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="010-0000-0000" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">요청 항목</span>
                <select className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>콘센트 교체</option>
                  <option>수전 교체</option>
                  <option>전등/전기</option>
                  <option>문/잠금장치</option>
                  <option>기타</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">상세 설명</span>
                <textarea rows={4} className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="상태/사진 링크 등" />
              </label>
              <button className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-95">
                접수하기 <ArrowRight />
              </button>
            </form>
          </div>
          <div className="lg:pl-10">
            <div className="rounded-3xl ring-1 ring-neutral-200 p-6 bg-white">
              <h3 className="font-semibold">고객 약속</h3>
              <ul className="mt-4 space-y-2 text-neutral-700">
                <li className="flex items-start gap-2"><Check /><span>사전 고지된 표준 견적</span></li>
                <li className="flex items-start gap-2"><Check /><span>전문가 방문 점검</span></li>
                <li className="flex items-start gap-2"><Check /><span>시공 품질 보증</span></li>
              </ul>
            </div>
            <div className="mt-4 text-xs text-neutral-500">© {new Date().getFullYear()} 와줄래</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== 앱 루트 ===== */
export default function App() {
  const active = useScrollSpy(["hero", ...NAV.map((n) => n.id)]);
  const [currentPage, setCurrentPage] = useState(null);

  // 법적 문서 모달 상태
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState("tos");

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
    <div className="min-h-screen bg-neutral-50 text-neutral-900 [--primary:#00c7ae]">
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
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-primary text-white font-bold">W</span>
            <span>와줄래</span>
          </a>
          <nav className="hidden md:flex items-center gap-1" aria-label="주요 섹션">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  active === item.id
                    ? "bg-primary text-white shadow"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 히어로 (homeco.kr 유사: 좌측 카피/검색, 우측 카테고리 타일) */}
      <section id="hero" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-teal-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* 좌측: 타이틀/검색/칩 (기존 텍스트 유지) */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                동네 기사님 바로 연결
                <span className="block text-neutral-700 mt-1">철산·광명·구로·가산 긴급 생활 수리</span>
              </h1>
              <form
                onSubmit={(e)=>e.preventDefault()}
                className="mt-6 flex items-center gap-2 p-2 rounded-2xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-neutral-200"
              >
                <span className="ml-2 text-neutral-500"><SearchIcon/></span>
                <input className="flex-1 px-2 py-2 outline-none" placeholder="어떤 수리가 필요하세요? 예: 콘센트 교체" />
                <button className="px-4 py-2 rounded-xl bg-primary text-white font-semibold">견적 받기</button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {["전기","수전/배관","문/잠금","타일","환풍/후드","기타"].map((x)=> (
                  <button key={x} className="px-3 py-1.5 rounded-full bg-white ring-1 ring-neutral-200 hover:ring-primary/40 hover:text-primary transition">{x}</button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-700">
                <div className="inline-flex items-center gap-2"><Check/> 표준 가격제</div>
                <div className="inline-flex items-center gap-2"><Check/> 지역 집중 운영</div>
              </div>
            </div>

            {/* 우측: "이거 두 개"(샘플 이미지/스켈레톤) 제거 → 홈코 유사 카테고리 타일 */}
            <div className="relative">
              <div className="absolute -inset-6 bg-primary/10 rounded-[2rem] blur-2xl" aria-hidden />
              <div className="relative rounded-3xl bg-white shadow-2xl ring-1 ring-neutral-200 p-5">
                <h3 className="font-bold text-lg">어떤 도움이 필요하세요?</h3>
                <p className="text-sm text-neutral-500 mt-1">원하는 항목을 누르면 바로 상담을 시작해요.</p>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    {label:"전등 교체", icon:"💡"},
                    {label:"콘센트/스위치", icon:"🔌"},
                    {label:"수전/배관", icon:"🚿"},
                    {label:"문/경첩/도어락", icon:"🚪"},
                    {label:"타일/실리콘", icon:"🧱"},
                    {label:"환풍기/후드", icon:"🌀"},
                  ].map((it) => (
                    <button key={it.label} className="group h-28 rounded-2xl ring-1 ring-neutral-200 hover:ring-primary/40 hover:shadow-md bg-neutral-50 p-4 text-left flex flex-col justify-between">
                      <span className="text-2xl" aria-hidden>{it.icon}</span>
                      <span className="font-semibold group-hover:text-primary">{it.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 text-xs text-neutral-500">* 사진이 있으면 상담이 더 빨라요</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 오버레이 페이지들 (구성 동일) */}
      {currentPage && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-stretch">
          <div className="absolute inset-0 bg-white" />
          <div className="relative w-full h-full overflow-y-auto">
            <div className="sticky top-0 z-[61] bg-white/90 border-b border-neutral-200 backdrop-blur">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <button className="px-3 py-1 rounded-full ring-1 ring-neutral-300 hover:ring-neutral-400" onClick={() => setCurrentPage(null)}>← 메인으로</button>
                  <span className="text-neutral-500 text-sm">{NAV.find((n) => n.id === currentPage)?.label}</span>
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

      {/* 푸터 */}
      <div className="border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-sm text-neutral-600">
            <strong>와줄래</strong> <span className="text-neutral-400">|</span> <span className="text-neutral-500">사업자등록번호: [000-00-00000] · 통신판매업신고: []</span>
            <div className="text-xs text-neutral-400">주소: [경기도 광명시 철산동] · 대표: [안정근, 김현성] · 대표번호: [02-000-0000]</div>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <button className="text-neutral-700 hover:text-primary" onClick={() => { setLegalTab("tos"); setLegalOpen(true); }}>이용약관</button>
            <span className="text-neutral-300">·</span>
            <button className="text-neutral-700 hover:text-primary" onClick={() => { setLegalTab("legal"); setLegalOpen(true); }}>법적 고지</button>
            <span className="text-neutral-300">·</span>
            <button className="text-neutral-700 hover:text-primary" onClick={() => { setLegalTab("privacy"); setLegalOpen(true); }}>개인정보 처리방침</button>
          </nav>
        </div>
      </div>

      {/* 모달 렌더 */}
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} activeTab={legalTab} setActiveTab={setLegalTab} />
    </div>
  );
}

/* Tailwind 임시 CSS 변수 유틸 */
function className(...v){return v.filter(Boolean).join(' ')}

/* 전역 CSS 도움말 (Tailwind config 없이도 사용):
   .bg-primary 등은 직접 쓸 수 없으므로 [--primary] CSS 변수와 함께 다음 유틸 클래스를 사용하세요.
   아래는 글로벌에 한 번 추가해두면 편한 유틸입니다. (예: globals.css)
   :root { --primary:#00c7ae }
   .bg-primary{ background:var(--primary) }
   .text-primary{ color:var(--primary) }
   .ring-primary\/40{ --tw-ring-color: color-mix(in oklab, var(--primary) 40%, transparent);}
   .focus\:ring-primary\/30:focus{ --tw-ring-color: color-mix(in oklab, var(--primary) 30%, transparent);} 
*/
