import { ArrowRight, Check } from "../components/Icons";

export default function SectionContact() {
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
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">이름</span>
                <input
                  required
                  className="px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:bg-white dark:text-neutral-900 focus:outline-none focus:ring-2 ring-offset-0"
                  placeholder="홍길동"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">연락처</span>
                <input
                  required
                  type="tel"
                  className="px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:bg-white dark:text-neutral-900 focus:outline-none focus:ring-2 ring-offset-0"
                  placeholder="010-0000-0000"
                />
              </label>
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

