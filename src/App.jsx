import React, { useEffect, useMemo, useState } from "react";

/* 네비게이션: 서비스 소개(#hero로 스크롤), 표준 견적/FAQ/문의는 오버레이 페이지 */
const NAV = [
  { id: "about",   label: "서비스 소개", type: "scroll" },
  { id: "pricing", label: "표준 견적",   type: "page"   },
  { id: "faq",     label: "FAQ",        type: "page"   },
  { id: "contact", label: "문의",        type: "page"   },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (v[0]) setActive((v[0].target as HTMLElement).id);
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
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

/* ===== 문서 섹션들 (약관/법고지/개인정보) ===== */
function LegalModal({ open, onClose, activeTab, setActiveTab }: {open:boolean; onClose:() => void; activeTab: string; setActiveTab: (id:string)=>void;}) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const TabButton = ({ id, children }: {id:string; children: React.ReactNode}) => (
    <button
      onClick={() => setActiveTab(id)}
      className={
        "px-3 py-2 rounded-full text-sm font-semibold transition " +
        (activeTab === id
          ? "bg-[var(--primary)] text-neutral-900 shadow font-bold"
          : "text-neutral-700 hover:bg-neutral-100")
      }
      aria-pressed={activeTab === id}
      type="button"
    >
      {children}
    </button>
  );

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="min-h-[100dvh] flex items-start justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-neutral-200">
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <div className="flex items-center gap-2">
              <TabButton id="tos">이용약관</TabButton>
              <TabButton id="legal">법적 고지</TabButton>
              <TabButton id="privacy">개인정보 처리방침</TabButton>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100" aria-label="닫기" type="button">×</button>
          </div>
          <div className="max-h-[min(72vh,calc(100dvh-160px))] overflow-y-auto p-6 text-[14px] leading-relaxed text-neutral-800">
            {activeTab === "tos" && <TOS setActiveTab={setActiveTab} />}
            {activeTab === "legal" && <LegalNotice />}
            {activeTab === "privacy" && <Privacy />}
          </div>
        </div>
      </div>
    </div>
  );
}

const TOS = ({ setActiveTab }: { setActiveTab: (id:string)=>void }) => (
  <article className="space-y-4">
    <h3 className="font-bold text-base">제1조 (목적)</h3>
    <p>본 약관은 주식회사 와줄래(이하 "회사")가 운영하는 생활수리·설치·점검 등 <strong>중개 플랫폼</strong>(이하 "플랫폼") 이용과 관련하여, 회사와 이용자(고객/기사) 간 권리·의무 및 책임 사항을 정함을 목적으로 합니다.</p>

    <h3 className="font-bold text-base">제2조 (정의)</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong>고객</strong>: 플랫폼을 통해 기사에게 용역 제공을 요청하는 자</li>
      <li><strong>기사(서비스 제공자)</strong>: 고객에게 실제 시공·용역을 제공하는 독립 개인 또는 사업자</li>
      <li><strong>중개서비스</strong>: 매칭·연락 중계·일정 조율·결제도구 제공 등 거래 연결을 위한 온라인 서비스</li>
      <li><strong>거래계약</strong>: 고객과 기사 간 직접 체결되는 용역 계약</li>
    </ul>

    <h3 className="font-bold text-base">제3조 (회사의 지위)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>회사는 <strong>중개자</strong>이며, 고객과 기사 사이의 거래계약의 <strong>당사자</strong>가 아닙니다.</li>
      <li>기사는 회사의 피용자·대리인이 아닌 <strong>독립 사업자</strong>로서 작업 방식·일정·안전관리 등에 대한 권한과 책임을 스스로 부담합니다.</li>
      <li>회사는 기사 선정·시공 품질·하자보수 등에 대해 지휘·감독하지 않으며, 관련 책임은 기사에게 귀속됩니다.</li>
    </ol>

    <h3 className="font-bold text-base">제4조 (대금·결제·세금계산서)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>고객이 지급하는 시공 대금은 <strong>기사에게 직접 지급</strong>됩니다. 회사는 고객으로부터 대금을 직접 수령하지 않습니다.</li>
      <li>회사가 결제 시스템을 제공하는 경우에도, 회사는 기사 명의로 대금을 수령하는 <strong>집금 대행자(수금 대리인)</strong>의 지위에 한정하며, 대금의 귀속 주체는 기사입니다.</li>
      <li>용역과 관련한 <strong>세금계산서/영수증은 기사</strong>가 발행하며, 회사는 기사에게 부과되는 <strong>중개 수수료</strong>에 한하여 세금계산서를 발행할 수 있습니다.</li>
    </ol>

    <h3 className="font-bold text-base">제5조 (시공·용역 책임)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>품질·안전·하자보수·일정·손해배상 등 용역 이행과 관련된 <strong>모든 법적 책임은 기사</strong>에게 있습니다.</li>
      <li>기사는 관련 법령·자격·안전기준을 준수하여야 하며, 위반으로 인한 책임 또한 기사에게 귀속됩니다.</li>
      <li>고객은 작업 범위·가격·AS 조건 등을 기사와 사전 합의하고 확인하여야 합니다.</li>
    </ol>

    <h3 className="font-bold text-base">제6조 (취소·환불)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>배정 전 취소는 원칙적으로 전액 환불을 권장하나, 구체적 기준은 기사와의 약정에 따릅니다.</li>
      <li>배정 후 취소 또는 이미 제공된 용역의 환불·감액·하자보수는 <strong>고객-기사 간 약정 및 관계 법령</strong>에 따릅니다. 회사는 분쟁 조정을 안내할 수 있으나 법적 강제권은 없습니다.</li>
    </ol>

    <h3 className="font-bold text-base">제7조 (면책 및 책임 제한)</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>기사의 과실·계약 위반·무자격 시공 등으로 인한 손해</li>
      <li>고객 제공 정보의 오류·누락</li>
      <li>천재지변 등 불가항력</li>
      <li>정보통신 설비의 보수·교체·정기점검 또는 장애로 인한 서비스 중단(회사의 중대한 과실이 없는 한)</li>
    </ul>
    <p>법령이 허용하는 범위 내에서 회사의 손해배상책임은 <strong>직접적이고 통상 가능한 손해</strong>에 한하며, 간접·특별·결과적 손해는 배상하지 않습니다.</p>

    <h3 className="font-bold text-base">제8조 (자격·보험)</h3>
    <p>특정 업종에 필요한 자격·면허·보험 가입 및 유지·갱신 책임은 기사에게 있습니다.</p>

    <h3 className="font-bold text-base">제9조 (개인정보 보호)</h3>
    <p>개인정보 처리에 관한 사항은 <button className="underline underline-offset-4" onClick={() => setActiveTab("privacy")}>개인정보 처리방침</button>을 따릅니다.</p>

    <h3 className="font-bold text-base">제10조 (준거법/관할)</h3>
    <p>대한민국 법령을 준거법으로 하며, 관할은 민사소송법에 따릅니다.</p>

    <p className="text-xs text-neutral-500">문의: legal@wajullae.co.kr</p>
  </article>
);

const LegalNotice = () => (
  <article className="space-y-4">
    {[
      {t:"① 회사의 법적 지위", d:"회사는 고객과 기사를 연결하는 온라인 중개자이며, 거래의 당사자가 아닙니다."},
      {t:"② 결제 구조", d:"고객이 지급하는 시공 대금의 귀속 주체는 기사입니다. 회사는 고객으로부터 직접 대금을 수령하지 않으며, 결제도구 제공 시 기사 명의의 집금 대행자 역할에 한정됩니다."},
      {t:"③ 기사의 독립성", d:"기사는 회사의 피용자/대리인이 아닌 독립 사업자입니다. 작업 품질·안전·일정·하자보수 책임은 기사에게 있습니다."},
      {t:"④ 영수증/세금계산서", d:"용역 대금 관련 영수증/세금계산서는 기사(사업자)가 발행합니다. 회사는 기사에게 청구되는 중개 수수료에 대해서만 세금계산서를 발행할 수 있습니다."},
      {t:"⑤ 하자·AS·환불", d:"하자보수·환불 기준은 고객-기사 간 약정 및 법령에 따릅니다. 회사는 분쟁 조정 절차를 안내할 수 있으나 법적 강제권은 없습니다."},
      {t:"⑥ 책임 제한", d:"법령이 허용하는 범위 내에서 회사는 간접·특별·결과적 손해에 대해 책임을 지지 않습니다."},
      {t:"⑦ 안전 및 준법", d:"기사의 자격·면허·보험 유지, 산업안전 및 관련 법령 준수 책임은 기사에게 있습니다."},
      {t:"⑧ 정보 고지", d:"플랫폼 내 견적/가격/설명은 참고 정보로, 현장 상황에 따라 변동될 수 있습니다."}
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
    <h3 className="font-bold text-base">개인정보 처리방침(요약)</h3>
    <p><strong>처리자 지위</strong>: 회사는 계정·매칭·고객지원 등 플랫폼 운영과 관련하여 개인정보처리자(Controller)입니다. 결제도구 제공 시 결제정보는 PG사 등 수탁사가 처리하며, 회사는 기사 명의의 집금 대행에 한정하여 필요한 범위에서 처리할 수 있습니다.</p>
    <p><strong>수집 항목</strong>: 성명, 연락처, 주소(시공지), 상담/견적/이용기록, 기기정보, 결제 관련 식별자(카드 토큰 등) · <strong>목적</strong>: 회원관리, 매칭, 상담, 분쟁 대응, 보안, 부정이용 방지 · <strong>보관</strong>: 목적 달성 후 파기하되, 법정 보관기간은 예외</p>

    <h4 className="font-semibold">제3자 제공 및 처리위탁</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li>PG/에스크로, 문자·알림 발송, 클라우드·백업, 고객센터 시스템, 인증/보안 솔루션 등</li>
      <li>수탁사·항목·기간·국외 이전 여부는 서비스 내 별도 고지</li>
    </ul>

    <h4 className="font-semibold">이용자 권리</h4>
    <p>개인정보의 열람·정정·삭제·처리정지·동의 철회 요청이 가능합니다. 법령상 예외 사유가 있는 경우 제한될 수 있습니다.</p>

    <h4 className="font-semibold">보호조치</h4>
    <p>암호화, 접근통제, 최소권한, 접속기록 보관, 침해사고 대응 등</p>

    <p className="text-xs text-neutral-500">본 요약은 이해를 돕기 위한 것으로, 전문은 서비스 내 전체 개인정보 처리방침에서 확인하세요.</p>
  </article>
);

/* ===== 표준 견적(검색 + 이미지 지원) ===== */
function SectionPricing() {
  const items = [
    { t: "콘센트 교체",              p: "60,000원",  d: "수량·배선 상태에 따라 변동",           img: "/images/test1.png" },
    { t: "해바라기 수전 교체",        p: "450,000원", d: "부품·난이도에 따라 변동",             img: "/images/showerhead.jpg" },
    { t: "인터폰 교체",              p: "400,000원", d: "기종·배선 상태에 따라 변동",             img: "/images/intercom.jpg" },
    { t: "현관문 플로어 힌지 교체",  p: "150,000원", d: "도어 규격·부품에 따라 변동",             img: "/images/door-hinge.jpg" },
    { t: "싱크대 수전 교체",         p: "100,000원", d: "배관·벽체 상태에 따라 변동",             img: "/images/kitchen-faucet.jpg" },
    { t: "싱크대 상판 리모델링 교체", p: "1,200,000원", d: "자재·타공·길이에 따라 변동",           img: "/images/countertop.jpg" },
    { t: "대리석 크랙 보수", p: "300,000원", d: "규격에 따라 변동",           img: "/images/countertop.jpg" },
    { t: "타일 한 박스 부분 교체",    p: "180,000원", d: "면적·자재 수급에 따라 변동",             img: "/images/tiles.jpg" },
    { t: "주방후드 교체",            p: "500,000원", d: "덕트·전원 위치에 따라 변동",             img: "/images/kitchen-hood.jpg" },
    { t: "언더카운트 세면대 부착",   p: "160,000원", d: "상판 재질·브라켓 유무에 따라 변동",      img: "/images/undercounter-sink.jpg" },
    { t: "싱크대 배수통 부착",       p: "80,000원",  d: "사이즈·타공 유무에 따라 변동",          img: "/images/drain-basket.jpg" },
    { t: "화장실 환풍기 교체",       p: "100,000원", d: "전원·덕트 상태에 따라 변동",             img: "/images/bath-fan.jpg" },
    { t: "샤워 수전 교체",           p: "150,000원", d: "배관·벽체 상태에 따라 변동",             img: "/images/shower-faucet.jpg" },
    { t: "LED 등 교체",              p: "80,000원",  d: "규격·천장 타입에 따라 변동",             img: "/images/led-light.jpg" },
    { t: "세면대 수전 교체",         p: "120,000원", d: "규격·배관 상태에 따라 변동",             img: "/images/basin-faucet.jpg" },
    { t: "비상센서등 교체",          p: "100,000원", d: "전원·설치 위치에 따라 변동",             img: "/images/emergency-light.jpg" },
    { t: "폽업 교체",                p: "45,000원",  d: "규격·막힘 여부에 따라 변동",             img: "/images/pop-up.jpg" },
    { t: "소변기 센서 교체",         p: "100,000원", d: "전원·배관 상태에 따라 변동",             img: "/images/urinal-sensor.jpg" },
    { t: "현관문 경첩 교체",         p: "200,000원", d: "도어 무게·힌지 규격에 따라 변동",        img: "/images/door-hinge2.jpg" },
    { t: "문 재부착 및 수리",        p: "50,000원",  d: "틀 뒤틀림·경첩 상태에 따라 변동",        img: "/images/door-repair.jpg" },
    { t: "문고리 교체",              p: "50,000원",  d: "백세트 규격·문두께에 따라 변동",         img: "/images/door-handle.jpg" },
  ];

  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((c) => (c.t + " " + c.d).toLowerCase().includes(keyword));
  }, [q, items]);
  const searchSuffix = q ? " (검색어: \u201C" + q + "\u201D)" : "";

  return (
    <section id="pricing" className="py-16 bg-neutral-50">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">표준 견적 가이드</h2>
            <p className="text-neutral-500 mt-2">* 모든 금액은 부가세 · 출장비 · 기본 부품비 포함 기준입니다.</p>
          </div>
          <div className="w-full sm:w-auto">
            <label className="relative block">
              <span className="sr-only">항목 검색</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="항목 검색"
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
                  aria-label="검색어 지우기"
                >
                  지우기
                </button>
              )}
            </label>
          </div>
        </div>

        <div className="mt-4 text-sm text-neutral-500">총 {filtered.length}건{searchSuffix}</div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((c) => (
              <div key={c.t} className="text-left rounded-2xl bg-white ring-1 ring-neutral-200 p-4 select-none cursor-default">
                {c.img ? (
                  <img
                    src={c.img}
                    alt={c.t}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover rounded-xl mb-3"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 mb-3" />
                )}
                <p className="font-semibold">{c.t}</p>
                <p className="mt-1 text-lg font-extrabold text-neutral-900">{c.p}</p>
                <p className="text-neutral-500 text-sm mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-600">
            검색 결과가 없습니다. 다른 키워드로 다시 시도해 보세요.
          </div>
        )}

        <p className="text-xs text-neutral-500 mt-4">※ 현장 상황에 따라 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}

function SectionFAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">자주 묻는 질문</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {[
            { q: "결제는 누구에게 하나요?", a: "고객이 지급하는 시공 대금은 기사에게 직접 지급됩니다. 회사는 고객으로부터 대금을 직접 수령하지 않습니다." },
            { q: "영수증/세금계산서는 누가 발행하나요?", a: "용역 대금 관련 영수증·세금계산서는 기사(사업자)가 발행합니다. 회사는 기사에게 청구되는 중개 수수료에 대해서만 세금계산서를 발행할 수 있습니다." },
            { q: "하자보수 책임은 누구에게 있나요?", a: "시공의 주체는 기사이며, 품질·AS·하자 책임은 기사에게 있습니다. 회사는 중개자 지위에서 분쟁 조정을 안내할 수 있습니다." },
            { q: "취소/환불은 어떻게 이루어지나요?", a: "배정 전 취소는 전액 환불을 권장하나, 구체적 기준은 기사와의 약정 및 법령에 따릅니다. 배정 후 취소·이미 제공된 용역의 환불/감액/하자보수는 고객-기사 간 약정에 따릅니다." },
            { q: "가격이 달라질 수 있는 이유는?", a: "현장 상태, 자재/부자재, 배선·배관·접근성, 난이도 등에 따라 달라질 수 있습니다. 표준 가이드는 참고용입니다." },
            { q: "기사는 검증된 분인가요?", a: "기본 신원/사업자 확인 절차를 거치며, 업종에 필요한 자격·면허·보험 유지 책임은 기사에게 있습니다." },
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

function SectionContact() {
  return (
    <footer id="contact" className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">간편 문의</h2>
            <p className="mt-2 text-neutral-600">필수 정보만 빠르게 남겨 주세요. 상담원이 연락드립니다.</p>
            <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">이름</span>
                <input required className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 ring-offset-0" placeholder="홍길동" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">연락처</span>
                <input required type="tel" className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 ring-offset-0" placeholder="010-0000-0000" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">요청 항목</span>
                <select className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 ring-offset-0">
                  <option>콘센트 교체</option>
                  <option>문/경첩/도어락 교체</option>
                  <option>전등/전기</option>
                  <option>타일/실리콘/대리석</option>
                  <option>기타</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">지역</span>
                <input required className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 ring-offset-0" placeholder="예: 철산동 e편한세상 102동 101호" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">상세 설명</span>
                <textarea rows={4} className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 ring-offset-0" placeholder="상태/사진 링크 등" />
              </label>
              <button className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:brightness-95" type="button">
                접수하기 <ArrowRight />
              </button>
            </form>
          </div>
          <div className="lg:pl-10">
            <div className="rounded-3xl ring-1 ring-neutral-200 p-6 bg-white">
              <h3 className="font-semibold">고객 약속</h3>
              <ul className="mt-4 space-y-2 text-neutral-700">
                <li className="flex items-start gap-2"><Check /><span>표준 견적 안내</span></li>
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

/* 모바일 Dock */
function MobileDock({ onOpen }: { onOpen: (page: string | null) => void }) {
  const goHome = () => {
    onOpen(null);
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-3 left-0 right-0 z-[70] px-4 md:hidden">
      <div className="mx-auto max-w-sm rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200 overflow-hidden">
        <div className="grid grid-cols-4">
          <button className="py-3 text-sm font-semibold hover:bg-neutral-50" onClick={goHome} type="button">홈</button>
          <button className="py-3 text-sm font-semibold hover:bg-neutral-50 border-l border-neutral-200" onClick={() => onOpen("pricing")} type="button">표준 견적</button>
          <button className="py-3 text-sm font-semibold hover:bg-neutral-50 border-l border-neutral-200" onClick={() => onOpen("faq")} type="button">FAQ</button>
          <button className="py-3 text-sm font-semibold hover:bg-neutral-50 border-l border-neutral-200" onClick={() => onOpen("contact")} type="button">문의</button>
        </div>
      </div>
    </div>
  );
}

/* ===== 앱 루트 ===== */
export default function App() {
  const active = useScrollSpy(["hero", ...NAV.map((n) => n.id)]);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const isOverlayOpen = !!currentPage;

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOverlayOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOverlayOpen]);

  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState("tos");

  const handleNavClick = (item: typeof NAV[number]) => (e: React.MouseEvent) => {
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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-neutral-50 text-neutral-900 [--primary:#00c7ae]">
      <style>{`
        .gutter-stable { scrollbar-gutter: stable both-edges; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-1 font-semibold text-lg leading-none"
            aria-label="홈"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              setCurrentPage(null);
            }}
          >
            <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-[var(--primary)] text-white font-bold">W</span>
            <span>와줄래</span>
            <span className="text-sm font-normal text-neutral-500">표준견적 안내 / 생활수리 플랫폼</span>
          </a>
          <nav className="hidden md:flex items-center gap-1" aria-label="주요 섹션">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  active === item.id ? "bg-[var(--primary)] text-white shadow" : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 히어로 — 오버레이가 열리면 아예 렌더하지 않음 */}
      {!isOverlayOpen && (
        <section id="hero" className="relative overflow-visible">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 via-teal-50 to-white" />
          <div className="relative w-full max-w-[160rem] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-32 py-24 lg:py-32 2xl:py-48 grid lg:grid-cols-2 gap-12 2xl:gap-20 items-center min-h-[84vh]">
            <div className="text-center lg:text-left">
              <h1 className="font-extrabold tracking-tight leading-[1.05] text-[clamp(36px,4.2vw,88px)]">서울·경기남부<br className="hidden sm:block" /> 생활수리 플랫폼</h1>
              <p className="mt-4 text-[clamp(15px,1.4vw,28px)] text-neutral-700 max-w-2xl mx-auto lg:mx-0">참고용 표준가 제공 / 과장 없는 사전 안내</p>
              <div className="mt-10">
                <button type="button" onClick={() => setCurrentPage("pricing")} className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[var(--primary)] text-neutral-900 font-semibold shadow-lg hover:brightness-95 focus:outline-none text-[clamp(14px,1.1vw,18px)]">
                  표준 견적 바로가기 <ArrowRight />
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full sm:w-[min(92vw,560px)] lg:w-[min(50vw,760px)] 2xl:w-[min(44vw,920px)] rounded-3xl bg-white shadow-2xl ring-1 ring-neutral-200 p-6 2xl:p-8 select-none cursor-default">
                <h3 className="font-bold text-lg 2xl:text-xl text-center lg:text-left">어떤 도움이 필요하세요?</h3>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 2xl:gap-4">
                  {[
                    {label:"전등 교체", icon:"💡"},
                    {label:"콘센트/스위치", icon:"🔌"},
                    {label:"수전/배관", icon:"🚿"},
                    {label:"문/경첩/도어락", icon:"🚪"},
                    {label:"타일/대리석/실리콘", icon:"🧱"},
                    {label:"환풍기/후드/배수구", icon:"🌀"},
                  ].map((it) => (
                    <div key={it.label} className="h-28 2xl:h-32 rounded-2xl ring-1 ring-neutral-200 bg-neutral-50 p-4 2xl:p-5 text-left flex flex-col justify-between">
                      <span className="text-2xl 2xl:text-3xl" aria-hidden="true">{it.icon}</span>
                      <span className="font-semibold 2xl:text-base">{it.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs 2xl:text-sm text-neutral-500 text-center lg:text-left">* 사진이 있으면 상담이 더 빨라요</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 오버레이 페이지 */}
      {isOverlayOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-stretch overflow-y-auto overscroll-contain">
          <div className="absolute inset-0 bg-white" />
          <div className="relative w-full min-h-[100dvh]">
            <div className="sticky top-0 z-[61] bg-white/90 border-b border-neutral-200 backdrop-blur">
              <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-end">
                <nav className="flex items-center gap-1" aria-label="오버레이 탭">
                  {["about","pricing","faq","contact"].map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        if (id === "about") {
                          setCurrentPage(null);
                          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          setCurrentPage(id);
                        }
                      }}
                      aria-current={currentPage === id ? "page" : undefined}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        currentPage === id ? "bg-[var(--primary)] text-white shadow" : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {NAV.find(n=>n.id===id)?.label || (id === "about" ? "서비스 소개" : id)}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {currentPage === "pricing" && <SectionPricing />}
              {currentPage === "faq"     && <SectionFAQ />}
              {currentPage === "contact" && <SectionContact />}
            </div>
          </div>
        </div>
      )}

      {/* 푸터 — 오버레이 때는 안 보이게 */}
      {!isOverlayOpen && (
        <div className="border-t border-neutral-200 bg-white">
          <div className="max-w-[96rem] w-full mx-auto px-6 lg:px-10 py-8">
            <div className="text-sm text-neutral-700 space-y-1">
              <div>
                <strong className="text-neutral-900">와줄래</strong> <span className="text-neutral-400">|</span>
              </div>
              <div>대표: 안정근&김현성</div>
              <div>주소: 경기도 광명시 철산동</div>
              <div>사업자등록번호: 000-00-00000</div>
            </div>
            <nav className="mt-3 flex items-center gap-3 text-sm">
              <button className="text-neutral-700 hover:text-[var(--primary)]" onClick={() => { setLegalTab("privacy"); setLegalOpen(true); }} type="button">개인정보 처리방침</button>
              <span className="text-neutral-300">·</span>
              <button className="text-neutral-700 hover:text-[var(--primary)]" onClick={() => { setLegalTab("legal"); setLegalOpen(true); }} type="button">법적 고지</button>
              <span className="text-neutral-300">·</span>
              <button className="text-neutral-700 hover:text-[var(--primary)]" onClick={() => { setLegalTab("tos"); setLegalOpen(true); }} type="button">이용약관</button>
            </nav>
          </div>
        </div>
      )}

      {/* 약관 모달 */}
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} activeTab={legalTab} setActiveTab={setLegalTab} />

      {/* 모바일 Dock은 항상 노출 */}
      <MobileDock onOpen={setCurrentPage} />
    </div>
  );
}
