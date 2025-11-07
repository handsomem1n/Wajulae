import React from "react";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

export default function CheolsanSOSLanding() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500 font-bold text-white shadow-sm">
              S
            </span>
            <div className="leading-tight">
              <div className="text-lg font-bold">와줄래</div>
              <div className="text-xs text-gray-500">생활출동 연결 플랫폼</div>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#how" className="hover:text-amber-600">이용방법</a>
            <a href="#services" className="hover:text-amber-600">가능 작업</a>
            <a href="#areas" className="hover:text-amber-600">지원 지역</a>
            <a href="#policy" className="hover:text-amber-600">정책/책임고지</a>
            <a href="#faq" className="hover:text-amber-600">FAQ</a>
          </nav>
          <a
            href={KAKAO_CHAT_LINK}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-600"
          >
            카카오채널 문의
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.08),transparent_50%),radial-gradient(circle_at_70%_0,rgba(59,130,246,0.05),transparent_40%)]" />

        {/* 중앙 정렬 + 양 컬럼 꽉 차게 */}
        <div className="mx-auto grid max-w-6xl items-stretch justify-items-stretch gap-8 px-6 py-16 md:grid-cols-2 md:gap-12 md:px-8 md:py-24">
          <div className="md:pr-8">
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight md:text-5xl">
              철산·광명 생활수리 <span className="text-amber-600">긴급 출동</span> 연결
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              변기막힘, 누수, 보일러, 전기, 잠금해제, 문 개방 등
              <br className="hidden md:block" />
              <b>가장 가까운 지역 기사님</b>을 빠르게 연결해드립니다.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={KAKAO_CHAT_LINK}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-amber-600"
              >
                카카오채널로 문의하기
              </a>
              <a
                href="#how"
                className="rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white"
              >
                이용방법 보기
              </a>
            </div>

            <div className="mt-6 grid max-w-lg grid-cols-3 gap-4 text-center text-sm">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-2xl font-bold text-amber-600">10~20분</div>
                <div className="mt-1 text-gray-600">평균 출동 안내</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-2xl font-bold text-amber-600">사전견적</div>
                <div className="mt-1 text-gray-600">고정 단가 정책</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-2xl font-bold text-amber-600">동네기사</div>
                <div className="mt-1 text-gray-600">실명·리뷰 기반</div>
              </div>
            </div>
          </div>

          {/* 오른쪽 카드: 컬럼 폭 꽉 채우기 */}
          <div>
            <div className="relative w-full overflow-hidden rounded-2xl border bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-gray-100 p-4">
                <div className="text-sm font-semibold text-gray-700">빠른 접수 예시</div>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <div className="text-gray-700">1) 주소: 철산동 e편한 103동 1202호</div>
                    <div className="text-gray-700">2) 증상: 변기가 완전히 막힘(역류)</div>
                    <div className="text-gray-700">3) 사진: 1~2장 첨부</div>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-gray-800">
                    사진 확인 후 <b>대략 비용 범위</b>를 안내하고, 가장 가까운 기사님을 연결해드립니다.
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-900 p-3 text-white">
                <span className="text-sm">카카오채널로 안전하게 접수</span>
                <a
                  href={KAKAO_CHAT_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-gray-900"
                >
                  지금 문의
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">이용 방법</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <li key={i} className="rounded-2xl border bg-gray-50 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-white">
                    {n}
                  </span>
                  <div className="font-semibold">
                    {[
                      "카카오채널에서 주소/증상/사진 전송",
                      "사전 견적 범위 안내 후 기사 매칭",
                      "기사님 방문·작업·결제 (와줄래 선입금 후 정산)",
                    ][i]}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {[
                    "전화번호 공개 없이 안전하게 접수합니다.",
                    "가장 가까운 지역 기사님을 연결해드립니다.",
                    "결제는 와줄래 계좌로 선입금되며, 작업 완료 확인 후 기사님께 정산됩니다.",
                  ][i]}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-6 text-xs text-gray-500">
            * 연결 중개 + 대금 보관/정산 서비스입니다. 시공 품질·A/S 책임은 작업을 수행한 기사님에게 있습니다.
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">가능 작업</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-4">
            {["변기 막힘", "배관 누수", "보일러", "전기", "잠금해제", "문 개방", "싱크대/배수", "욕실/배관"].map((label, idx) => (
              <div key={idx} className="rounded-xl border bg-white px-4 py-3 text-center shadow-sm">
                {label}
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500">* 항목 외 작업은 채팅으로 문의 주세요.</div>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">지원 지역</h2>
          <p className="mt-3 text-sm text-gray-600">철산 · 광명 · 구로 · 독산 · 가산</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-4">
            {["철산", "광명", "구로", "독산", "철산역 인근", "광명사거리", "구로디지털", "가산/독산 경계"].map((a, i) => (
              <div key={i} className="rounded-xl border bg-gray-50 px-4 py-3 text-center">
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy & Disclaimer */}
      <section id="policy" className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">정책 / 책임 고지</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">운영 정책</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                <li>사전 견적 범위 안내 + 품목별 고정 단가 정책 (현장 변수 시 별도 고지)</li>
                <li>가장 가까운 기사님 우선 배정, 야간/주말 긴급 지원</li>
                <li>전화번호 비공개 접수 (카카오채널 중심)</li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">책임 고지</h3>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                와줄래는 지역 생활수리 기사님과 고객을 연결하는 중개 플랫폼이며, 고객이 결제한 작업비를 안전하게 보관하고 작업 완료 확인 후 기사님께 정산하는 ‘대금 보관 및 정산 대행 서비스(에스크로 유사)’를 제공합니다. 
                작업의 실제 제공 주체는 개별 기사님으로, 시공 품질·A/S·손해배상 등 시공 관련 책임은 기사님에게 있으며, 고객과 기사님 사이에서 실제 계약이 성립합니다. 
                와줄래는 시공 행위 및 결과에 대한 직접적 책임을 부담하지 않으며, 대금 보관/정산 절차 내에서의 조정·중재 역할을 수행합니다. 
                결제 계좌: 카카오뱅크 3333-20-7345246 (예금주: 와줄래).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { q: "결제는 어디에 하나요?", a: "작업 확정 후 와줄래 계좌(카카오뱅크 3333-20-7345246, 예금주: 와줄래)로 선입금하시면, 작업 완료 확인 후 기사님께 정산됩니다." },
              { q: "가격은 어떻게 되나요?", a: "사진/주소/증상을 확인 후 대략적인 범위를 먼저 안내드리고, 고정 단가 표와 현장 변수에 따라 확정됩니다. 최종 금액은 작업 확정 시 안내드립니다." },
              { q: "내 전화번호가 노출되나요?", a: "아니요. 카카오채널 채팅으로 안전하게 접수되며, 필요한 경우에 한해 기사님과 연결됩니다." },
              { q: "AS와 작업 책임은 누구에게 있나요?", a: "작업을 수행한 기사님에게 있습니다. 와줄래는 중개 및 대금 보관/정산 역할을 하며, 분쟁 시 조정 지원을 제공합니다." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border bg-gray-50 p-5 shadow-sm">
                <div className="font-semibold">Q. {item.q}</div>
                <div className="mt-2 text-sm leading-6 text-gray-700">A. {item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-amber-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-14 text-center md:px-8">
          <h3 className="text-xl font-extrabold md:text-2xl">지금 바로 가까운 기사님 연결 받기</h3>
          <p className="max-w-2xl text-sm text-gray-700">
            주소 · 증상 · 사진 1~2장만 보내주세요. 빠르면 10~20분 내 출동 안내가 가능합니다.
          </p>
          <a
            href={KAKAO_CHAT_LINK}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-black"
          >
            카카오채널로 문의하기
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 md:px-8">
          <div>
            <div className="text-lg font-bold">와줄래</div>
            <div className="mt-1 text-sm text-gray-500">생활출동 연결 플랫폼 · 고객과 기사 연결 서비스</div>
          </div>
          <div className="text-sm text-gray-500">
            <div className="font-semibold">사업자 정보</div>
            <ul className="mt-2 space-y-1">
              <li>상호: 와줄래 </li>
              <li>사업자등록번호: 338-46-01315 </li>
              <li>대표: 김현성</li>
              <li>연락: 카카오채널 문의</li>
              <li>주소: 경기도 광명시 철산동 </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CheolsanSOS. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
