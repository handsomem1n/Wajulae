import React, { useState } from "react";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

// LEGAL: 사이트 전역 고지(상단 리본·푸터·모달에서 반복 사용)
const LEGAL_NOTICE =
  "와줄래는 고객과 지역 기사(사업자)를 연결하는 통신판매중개자입니다. 당사는 거래의 당사자가 아니며, 작업의 계약·결제·환불·A/S·하자담보 책임은 작업을 수행한 기사에게 있습니다.";

function PolicyModal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative mx-4 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
          >
            닫기
          </button>
        </div>
        <div className="prose prose-sm max-w-none text-gray-800">{children}</div>
      </div>
    </div>
  );
}

export default function WajulleLanding() {
 const [open, setOpen] = useState(null);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="flex w-full items-center justify-between px-6 py-3 md:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500 font-bold text-white shadow-sm">
              와
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
        {/* LEGAL: 상단 리본 고지 */}
        <div className="w-full bg-amber-50/90 text-[11px] md:text-xs text-amber-900 border-t px-6 md:px-8 py-2">
          <div className="max-w-5xl">{LEGAL_NOTICE}</div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.08),transparent_50%),radial-gradient(circle_at_70%_0,rgba(59,130,246,0.05),transparent_40%)]" />
        <div className="grid w-full items-stretch justify-items-stretch gap-8 px-6 py-16 md:grid-cols-2 md:gap-12 md:px-8 md:py-24">
          <div className="md:pr-8">
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight md:text-5xl">
              철산·광명 생활수리 <span className="text-amber-600">긴급 출동</span> 연결
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              변기막힘, 누수, 보일러, 전기, 잠금해제, 문 개방 등
              <span className="md:hidden">&nbsp;</span>
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

            {/* Stats */}
            <div className="mt-6 grid max-w-lg grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-sm flex flex-col items-center justify-center min-h-[90px]">
                <div className="text-lg sm:text-2xl font-extrabold text-amber-600 leading-tight tracking-tight">
                  10~20분
                </div>
                <div className="mt-0.5 text-[11px] sm:text-xs text-gray-600 leading-tight">
                  평균 출동 안내
                </div>
              </div>
              <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-sm flex flex-col items-center justify-center min-h-[90px]">
                <div className="text-lg sm:text-2xl font-extrabold text-amber-600 leading-tight tracking-tight">
                  사전견적
                </div>
                <div className="mt-0.5 text-[11px] sm:text-xs text-gray-600 leading-tight">
                  고정 단가 정책
                </div>
              </div>
              <div className="rounded-2xl bg-white p-3 sm:p-4 shadow-sm flex flex-col items-center justify-center min-h-[90px]">
                <div className="text-lg sm:text-2xl font-extrabold text-amber-600 leading-tight tracking-tight">
                  동네기사
                </div>
                <div className="mt-0.5 text-[11px] sm:text-xs text-gray-600 leading-tight">
                  실명·리뷰 기반
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
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
        <div className="w-full px-6 py-16 md:px-8">
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
                      "기사님 방문·작업·결제 (고객 ↔ 기사 직접 결제)",
                    ][i]}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {[
                    "전화번호 공개 없이 안전하게 접수합니다.",
                    "가장 가까운 지역 기사님을 연결해드립니다.",
                    // LEGAL: 결제·환불·AS는 기사와 직접
                    "결제·영수증·환불·A/S는 기사님과 직접 협의·처리됩니다. 와줄래는 결제·정산에 관여하지 않습니다.",
                  ][i]}
                </p>
              </li>
            ))}
          </ol>
          {/* LEGAL: 중개자 고지 강조 블록 */}
          <div className="mt-6 rounded-xl border bg-amber-50 p-4 text-xs text-amber-900">
            <b>중요 고지</b>: {LEGAL_NOTICE}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t bg-gray-50">
        <div className="w-full px-6 py-16 md:px-8">
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
        <div className="w-full px-6 py-16 md:px-8">
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

      {/* Policy */}
      <section id="policy" className="border-t bg-gray-50">
        <div className="w-full px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">정책/책임 고지</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">운영 정책</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                <li>사전 견적 범위 안내 + 품목별 고정 단가 정책 (현장 변수 시 별도 고지)</li>
                <li>가장 가까운 기사님 우선 배정, 야간/주말 긴급 지원</li>
                <li>전화번호 비공개 접수 (카카오채널 중심)</li>
              </ul>
            </div>
            {/* LEGAL: 책임 고지 카드 */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">책임 고지</h3>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                {LEGAL_NOTICE} 표기·광고·안내된 정보와 실제 시공 내용의 적합성, 자재 선택, 작업 방법, 가격 확정 및 사후처리는 기사(사업자) 책임입니다.
                당사는 정보전달과 매칭을 지원하나, 법률·세무·기술적 자문을 제공하지 않습니다.
              </p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            자세한 내용은 아래 문서를 확인하세요:{" "}
            <button className="underline" onClick={() => setOpen("terms")}>이용약관</button>
            {" · "}
            <button className="underline" onClick={() => setOpen("privacy")}>개인정보처리방침</button>
            {" · "}
            <button className="underline" onClick={() => setOpen("liability")}>책임고지 전문</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t bg-white">
        <div className="w-full px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "결제는 어디에 하나요?",
                a: "작업 확정 후 현장에서 또는 기사님 안내 계좌로 직접 결제합니다. 와줄래는 결제·정산에 관여하지 않습니다.",
              },
              {
                q: "가격은 어떻게 되나요?",
                a: "사진/주소/증상을 확인 후 대략적인 범위를 먼저 안내드리고, 고정 단가표와 현장 변수에 따라 기사님이 최종 확정합니다.",
              },
              {
                q: "AS와 작업 책임은 누구에게 있나요?",
                a: "작업을 수행한 기사님에게 있습니다. 와줄래는 중개 플랫폼으로서 기사 재연결 등 조정을 도와드릴 수 있습니다.",
              },
              {
                q: "문제가 생기면 와줄래가 책임지나요?",
                a: "와줄래는 통신판매중개자로서 거래 당사자가 아닙니다. 작업 관련 책임과 손해배상 책임은 기사에게 있으며, 당사는 자료 확보·조정 지원을 합니다.",
              },
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
        <div className="flex w-full flex-col items-center gap-4 px-6 py-14 text-center md:px-8">
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
        <div className="grid w-full gap-6 px-6 py-10 md:grid-cols-2 md:px-8">
          <div>
            <div className="text-lg font-bold">와줄래</div>
            <div className="mt-1 text-sm text-gray-500">
              생활출동 연결 플랫폼 · 고객과 기사 연결 서비스
            </div>
            {/* LEGAL: 통신판매중개자 고지 반복 */}
            <div className="mt-3 text-xs text-gray-500">{LEGAL_NOTICE}</div>
          </div>
          <div className="text-sm text-gray-500">
            <div className="font-semibold">사업자 정보</div>
            <ul className="mt-2 space-y-1">
              <li>상호: 와줄래</li>
              <li>사업자등록번호: 338-46-01315</li>
              <li>대표: 안정근, 한승민, 김현성</li>
              <li>연락: 카카오채널 문의</li>
              {/* 주소는 유지 권장. 필요 시 축약 가능 */}
              <li>주소: 경기도 안산시 상록구 광덕산1로</li>
            </ul>
            <div className="mt-3 text-[11px] text-gray-400">
              <button className="mx-2 hover:underline" onClick={() => setOpen("terms")}>이용약관</button>|
              <button className="mx-2 hover:underline" onClick={() => setOpen("privacy")}>개인정보처리방침</button>|
              <button className="mx-2 hover:underline" onClick={() => setOpen("liability")}>책임고지</button>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Wajulle. All rights reserved.
        </div>
      </footer>

      {/* ===== Modals ===== */}
      <PolicyModal
        open={open === "terms"}
        onClose={() => setOpen(null)}
        title="이용약관 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-08</p>
        <h4>제1조 (목적)</h4>
        <p>본 약관은 와줄래(“회사”)가 제공하는 생활수리 연결 중개 서비스 이용과 관련하여 회사와 이용자 간 권리·의무 및 책임사항을 정함을 목적으로 합니다.</p>
        <h4>제2조 (회사의 지위)</h4>
        <p>
          회사는 통신판매중개자로서 거래의 당사자가 아니며, 고객과 기사(사업자) 간 체결되는 계약의 당사자가 아닙니다. 회사는 정보전달·매칭·일정 조율을 지원하나,
          작업의 적법성·적합성·안전성·완전성·품질에 관한 보증 또는 책임을 부담하지 않습니다.
        </p>
        <h4>제3조 (서비스 내용)</h4>
        <ol>
          <li>의뢰 접수, 기사 매칭, 견적 범위 안내 및 일정 조율 지원</li>
          <li>연락 및 현장 방문을 위한 최소 정보 전달</li>
          <li>분쟁 발생 시 자료 수집·사실 확인 및 조정 지원(법적 판단·강제력 없음)</li>
        </ol>
        <h4>제4조 (계약 당사자 및 책임)</h4>
        <p>
          수리·시공 계약의 당사자는 고객과 기사이며, 가격 확정·결제·영수증·취소·환불·A/S·하자담보·손해배상 등은 기사 책임입니다.
          고객은 작업 전 기사와 최종 가격·범위·A/S 조건을 확인해야 합니다.
        </p>
        <h4>제5조 (면책)</h4>
        <p>
          회사는 다음 사유로 발생한 손해에 책임을 지지 않습니다: (1) 기사 또는 고객의 고의·과실, (2) 현장 정보·사진 등 제공 자료의 부정확성,
          (3) 천재지변 및 불가항력, (4) 제3자의 시스템 장애. 단, 회사의 고의 또는 중대한 과실이 입증되는 경우는 제외합니다.
        </p>
        <h4>제6조 (금지행위)</h4>
        <ul>
          <li>회사를 당사자인 것처럼 오인시키는 행위(가격 확정·대금 수령·영수증 발행을 회사 명의로 요구 등)</li>
          <li>허위 견적·허위 후기·부당한 대금 요구 등 부정행위</li>
        </ul>
        <h4>제7조 (분쟁 해결 및 관할)</h4>
        <p>분쟁은 당사자 간 협의를 우선하며, 회사는 자료에 기초하여 조정을 지원할 수 있습니다. 관할 법원은 회사 소재지 관할로 합니다.</p>
        <h4>제8조 (기타)</h4>
        <p>본 약관은 관계 법령의 변경에 따라 개정될 수 있으며, 웹사이트 공지로 효력이 발생합니다.</p>
        <div className="mt-4 rounded-md bg-amber-50 p-3 text-xs text-amber-900">{LEGAL_NOTICE}</div>
      </PolicyModal>

      <PolicyModal
        open={open === "privacy"}
        onClose={() => setOpen(null)}
        title="개인정보 처리방침 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-08</p>
        <h4>1. 수집 항목 및 방법</h4>
        <ul>
          <li>필수: 닉네임/성명, 카카오채널 대화내역(연락수단), 주소(방문 장소), 의뢰 내용 및 사진</li>
          <li>선택: 후기·평가, 기사 매칭을 위한 참고 정보</li>
          <li>방법: 카카오톡 채널 상담 및 이용자가 자발적으로 제공한 자료</li>
        </ul>
        <h4>2. 이용 목적</h4>
        <ul>
          <li>의뢰 접수, 기사 매칭 및 출동 안내</li>
          <li>민원 대응, 품질 관리, 분쟁 발생 시 사실 확인</li>
        </ul>
        <h4>3. 보유 기간</h4>
        <p>목적 달성 시 지체 없이 파기하되, 관련 법령에서 정한 기간(거래 관련 기록 5년 등)을 따릅니다.</p>
        <h4>4. 제3자 제공 및 위탁</h4>
        <p>작업 수행을 위해 고객의 최소 정보를 기사에게 제공할 수 있으며, 운영상 필요한 경우 국내외 클라우드·메시징 서비스에 처리를 위탁할 수 있습니다.</p>
        <h4>5. 권리 행사</h4>
        <p>열람·정정·삭제·처리정지 요구 및 동의 철회는 카카오채널로 접수 가능합니다.</p>
        <h4>6. 안전성 확보 조치</h4>
        <p>접근권한 최소화, 접근기록 보관, 암호화(해당 시) 등 합리적 보호조치를 시행합니다.</p>
      </PolicyModal>

      <PolicyModal
        open={open === "liability"}
        onClose={() => setOpen(null)}
        title="책임고지 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-08</p>
        <h4>1. 회사의 지위</h4>
        <p>{LEGAL_NOTICE}</p>
        <h4>2. 책임의 범위</h4>
        <ul>
          <li>작업의 품질·안전·가격·A/S·환불·하자담보는 기사 책임</li>
          <li>회사는 정보전달·매칭·조정 지원 역할에 한정</li>
          <li>회사는 법률·세무·기술 자문을 제공하지 않음</li>
        </ul>
        <h4>3. 분쟁 시 조치</h4>
        <p>증빙(현장 사진, 대화 기록, 견적·작업 내역 등)을 기준으로 사실 확인을 지원하며, 필요 시 기사 재연결·재방문을 조정할 수 있습니다.</p>
        <div className="mt-4 rounded-md bg-gray-50 p-3 text-[11px] text-gray-600">
          본 고지는 안내 목적이며, 개별 사건에 대한 법률자문이 아닙니다.
        </div>
      </PolicyModal>
    </main>
  );
}
