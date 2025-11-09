// ✅ 여기부터 전체 복사
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

const TOS = ({ setActiveTab }) => (
  <article className="space-y-4">
    ...
  </article>
);

const LegalNotice = () => (
  <article className="space-y-4">
    ...
  </article>
);

const Privacy = () => (
  <article className="space-y-4">
    ...
  </article>
);

/* ===== 표준 견적 ===== */
function SectionPricing() {
  ...
}

/* ===== FAQ ===== */
function SectionFAQ() {
  ...
}

/* ===== ✅ 문의 (다크모드 고정 + input 흰배경 적용) ===== */
function SectionContact() {
  return (
    <footer
      id="contact"
      className="py-16 bg-white text-neutral-900 dark:bg-white dark:text-neutral-900"
      style={{ colorScheme: "light" }}
    >
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">간편 문의</h2>
            <p className="mt-2 text-neutral-600">필수 정보만 빠르게 남겨 주세요. 상담원이 연락드립니다.</p>

            <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "이름", type: "text", placeholder: "홍길동" },
                { label: "연락처", type: "tel", placeholder: "010-0000-0000" },
              ].map((f, i) => (
                <label className="flex flex-col gap-2" key={i}>
                  <span className="text-sm font-medium">{f.label}</span>
                  <input
                    required
                    type={f.type}
                    placeholder={f.placeholder}
                    className="px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:bg-white dark:text-neutral-900 focus:outline-none focus:ring-2 ring-offset-0"
                  />
                </label>
              ))}

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">요청 항목</span>
                <select className="px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:bg-white dark:text-neutral-900 focus:outline-none focus:ring-2 ring-offset-0">
                  <option>콘센트 교체</option>
                  <option>문/경첩/도어락 교체</option>
                  <option>전등/전기</option>
                  <option>타일/실리콘/대리석</option>
                  <option>기타</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">지역</span>
                <input
                  required
                  className="px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:bg-white dark:text-neutral-900 focus:outline-none focus:ring-2 ring-offset-0"
                  placeholder="예: 철산동 e편한세상 102동 101호"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">상세 설명</span>
                <textarea
                  rows={4}
                  className="px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:bg-white dark:text-neutral-900 focus:outline-none focus:ring-2 ring-offset-0"
                  placeholder="상태/사진 링크 등"
                />
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
function MobileDock({ onOpen }) {
  ...
}

/* ===== 앱 루트 ===== */
export default function App() {
  ...
}
// ✅ 여기까지 전체 복사
