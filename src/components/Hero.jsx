import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-visible">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 via-teal-50 to-white" />
      <div className="relative w-full max-w-[160rem] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-32 py-24 lg:py-32 2xl:py-48 grid lg:grid-cols-2 gap-12 2xl:gap-20 items-center min-h-[84vh]">
        {/* 왼쪽 텍스트 */}
        <div className="text-center lg:text-left">
          <h1 className="font-extrabold tracking-tight leading-[1.05] text-[clamp(36px,4.2vw,88px)]">
            서울·경기남부<br className="hidden sm:block" /> 생활수리 플랫폼
          </h1>
          <p className="mt-4 text-[clamp(15px,1.4vw,28px)] text-neutral-700 max-w-2xl mx-auto lg:mx-0">
            참고용 표준가 제공 / 과장 없는 사전 안내
          </p>

          {/* 버튼 묶음 */}
          <div className="mt-10 flex flex-row gap-3 justify-center lg:justify-start lg:flex-col lg:items-start">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-neutral-900 transition text-[clamp(14px,1.1vw,18px)]"
            >
              🧾 표준 견적 바로가기
            </Link>

            <a
              href="http://pf.kakao.com/_xdmQxkn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-neutral-900 transition text-[clamp(14px,1.1vw,18px)] lg:mt-3"
            >
              💬 카카오톡 상담하기
            </a>
          </div>
        </div>

        {/* 오른쪽 카드 */}
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
  );
}

