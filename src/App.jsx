import React from "react";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat"; // ← 실제 채널 링크 그대로 유지

export default function CheolsanSOSLanding() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500 font-bold text-white">S</span>
            <div className="leading-tight">
              <div className="text-lg font-bold">철산SOS</div>
              <div className="text-xs text-gray-500">생활출동 중개 플랫폼</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#how" className="hover:text-amber-600">이용방법</a>
            <a href="#services" className="hover:text-amber-600">가능 작업</a>
            <a href="#areas" className="hover:text-amber-600">지원 지역</a>
            <a href="#policy" className="hover:text-amber-600">책임고지</a>
            <a href="#faq" className="hover:text-amber-600">FAQ</a>
          </nav>
          <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">
            문의하기
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 px-6 py-20 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              철산·광명 생활수리 <span className="text-amber-600">긴급 출동</span> 연결
            </h1>
            <p className="mt-4 text-base text-gray-600 md:text-lg leading-relaxed">
              변기 막힘, 누수, 보일러, 전기, 잠금해제, 문 개방 등<br />
              <b>가장 가까운 지역 기사님</b>을 빠르게 연결해드립니다.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-600">
                카카오채널로 접수하기
              </a>
              <a href="#how" className="rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-white">
                이용방법 보기
              </a>
            </div>
          </div>
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="rounded-xl bg-gray-100 p-4 text-sm">
              <b>빠른 접수 예시</b><br /><br />
              1) 주소<br />
              2) 증상 (예: 변기 완전 막힘 / 역류)<br />
              3) 사진 1~2장 첨부<br /><br />
              확인 후 <b>예상 비용 범위</b> 안내 → 지역 기사 연결
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-extrabold md:text-3xl">이용 방법</h2>
          <ol className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              "카카오채널에서 주소/증상/사진 전송",
              "비용 범위 안내 후 기사 매칭",
              "기사 방문 · 작업 · 결제 (고객 ↔ 기사 직거래)"
            ].map((step, i) => (
              <li key={i} className="rounded-xl border bg-gray-50 p-5 shadow-sm text-sm text-gray-700">
                {i + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-b bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-extrabold md:text-3xl">가능 작업</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
            {["변기 막힘","누수","보일러","전기","잠금해제","문 개방","싱크대","욕실 배관"].map((label,i)=>(
              <div key={i} className="rounded-xl border bg-white px-4 py-3 text-center shadow-sm">{label}</div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section id="areas" className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-extrabold md:text-3xl">지원 지역</h2>
          <p className="mt-3 text-sm text-gray-600">철산 · 광명 · 구로 · 독산 (순차 확대)</p>
        </div>
      </section>

      {/* LEGAL / DISCLAIMER */}
      <section id="policy" className="border-b bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-extrabold md:text-3xl">법적 책임 고지</h2>
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm text-sm leading-7 text-gray-700">
            본 서비스(철산SOS)는 <b>지역 생활 수리 기사 연결 중개 플랫폼</b>입니다.<br />
            철산SOS는 수리/시공을 직접 수행하지 않으며,<br />
            <b>작업 내용, 비용, 품질, A/S 등 모든 책임은 작업을 수행한 기사와 고객 간 체결되는 개별 도급계약에 따라 결정됩니다.</b><br /><br />
            따라서 작업 과정에서 발생할 수 있는 손해·분쟁·하자·추가 비용 등에 대하여<br />
            철산SOS는 민·형사상 책임을 부담하지 않습니다.<br />
            필요 시 고객 요청에 따라 해당 기사와의 재연결만 지원합니다.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-500">
          <div className="font-semibold mb-2">사업자 정보 (발급 진행중)</div>
          <div>상호: 철산SOS</div>
          <div>대표: (추후 입력)</div>
          <div>연락: 카카오채널 문의</div>
          <div className="mt-4 text-xs text-gray-400">© {new Date().getFullYear()} CheolsanSOS</div>
        </div>
      </footer>
    </main>
  );
}
