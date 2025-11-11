export default function SectionContact() {
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/12koP2bsGHf_nIy_3oEC8yGhAizBea8lgVlGQp3bChsU/viewform";

  return (
    <section
      id="contact"
      className="py-16 bg-white text-neutral-900"
    >
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">간편 문의</h2>
            <p className="mt-2 text-neutral-600">
              필수 정보만 빠르게 남겨 주세요. 상담원이 연락드립니다.
            </p>
          </div>

          {/* 메인 카드 */}
          <div className="rounded-3xl bg-gradient-to-br from-[var(--primary)]/5 to-teal-50 p-8 sm:p-12 shadow-xl border border-neutral-200">
            <div className="text-center space-y-2">
              {/* 아이콘 */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)] text-white text-4xl shadow-lg">
                📝
              </div>

              <div>
                <h3 className="text-xl font-bold text-neutral-900">작업 요청서 작성</h3>
                <p className="mt-2 text-neutral-600 leading-relaxed">
                  증상 사진과 함께 상세한 내용을 남겨주시면<br />
                  전문 기사가 정확한 견적을 제공해드립니다.
                </p>
              </div>

              {/* 안내 사항 */}
              <div className="bg-white rounded-2xl p-6 text-left space-y-3 shadow-sm">
                <p className="font-semibold text-neutral-900">📋 준비하실 내용</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span><strong>이름 및 연락처</strong> - 상담을 위해 필요합니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span><strong>작업 종류</strong> - 수전, 콘센트, 문짝 등</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span><strong>시공 위치</strong> - 정확한 주소를 알려주세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] font-bold">•</span>
                    <span><strong>증상 사진</strong> - 사진이 있으면 상담이 더 빨라요 📸</span>
                  </li>
                </ul>
              </div>

              {/* CTA 버튼 */}
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--primary)] text-neutral-900 font-bold text-lg hover:brightness-105 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0 active:scale-95"
              >
                <span>📋</span>
                <span>작업 요청서 작성하기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <p className="text-xs text-neutral-500">
                * 새 창에서 Google Form이 열립니다
              </p>
            </div>
          </div>

          {/* 고객 약속 */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-neutral-200">
              <div className="text-2xl mb-2">✓</div>
              <div className="font-semibold text-sm">표준 견적 안내</div>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-neutral-200">
              <div className="text-2xl mb-2">✓</div>
              <div className="font-semibold text-sm">전문가 방문 점검</div>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-neutral-200">
              <div className="text-2xl mb-2">✓</div>
              <div className="font-semibold text-sm">시공 품질 보증</div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} 와줄래
          </div>
        </div>
      </div>
    </section>
  );
}
