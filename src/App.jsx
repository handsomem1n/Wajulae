import React, { useState } from "react";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

function PolicyModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
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
        <div className="prose prose-sm max-w-none text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function WajulleLanding() {
  const [open, setOpen] = useState<null | "terms" | "privacy" | "refund" | "liability">(null);

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

      {/* Policy & Disclaimer */}
      <section id="policy" className="border-t bg-gray-50">
        <div className="w-full px-6 py-16 md:px-8">
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
        <div className="w-full px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { q: "결제는 어디에 하나요?", a: "작업 확정 후 와줄래 계좌(카카오뱅크 3333-20-7345246, 예금주: 와줄래)로 선입금하시면, 작업 완료 확인 후 기사님께 정산됩니다." },
              { q: "가격은 어떻게 되나요?", a: "사진/주소/증상을 확인 후 대략적인 범위를 먼저 안내드리고, 고정 단가 표와 현장 변수에 따라 확정됩니다." },
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
            <div className="mt-1 text-sm text-gray-500">생활출동 연결 플랫폼 · 고객과 기사 연결 서비스</div>
          </div>
          <div className="text-sm text-gray-500">
            <div className="font-semibold">사업자 정보</div>
            <ul className="mt-2 space-y-1">
              <li>상호: 와줄래</li>
              <li>사업자등록번호: 338-46-01315</li>
              <li>대표: 김현성</li>
              <li>연락: 카카오채널 문의</li>
              <li>주소: 경기도 안산시 상록구 광덕산1로</li>
            </ul>
            <div className="mt-3 text-[11px] text-gray-400">
              <button className="mx-2 hover:underline" onClick={() => setOpen("terms")}>이용약관</button>|
              <button className="mx-2 hover:underline" onClick={() => setOpen("privacy")}>개인정보처리방침</button>|
              <button className="mx-2 hover:underline" onClick={() => setOpen("refund")}>환불 및 정산 정책</button>|
              <button className="mx-2 hover:underline" onClick={() => setOpen("liability")}>책임고지</button>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Wajulle. All rights reserved.
        </div>
      </footer>

      {/* ===== Modals: Terms / Privacy / Refund / Liability ===== */}
      <PolicyModal
        open={open === "terms"}
        onClose={() => setOpen(null)}
        title="이용약관 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-07</p>
        <h4>제1조 (목적)</h4>
        <p>본 약관은 와줄래(이하 “회사”)가 제공하는 생활수리 연결 및 대금 보관·정산 대행 서비스의 이용과 관련하여 회사와 이용자 간 권리·의무 및 책임사항을 정함을 목적으로 합니다.</p>
        <h4>제2조 (정의)</h4>
        <ul>
          <li>“플랫폼”이란 고객과 지역 기사(사업자)를 연결하는 중개 서비스입니다.</li>
          <li>“고객”은 수리를 의뢰하는 자, “기사”는 수리를 수행하는 자를 말합니다.</li>
        </ul>
        <h4>제3조 (약관의 효력 및 변경)</h4>
        <p>회사는 약관을 웹사이트에 게시하며, 관계 법령에 따라 변경할 수 있습니다. 변경 시 사전 공지합니다.</p>
        <h4>제4조 (서비스의 내용)</h4>
        <ol>
          <li>고객과 기사 간 연결 중개</li>
          <li>고객 대금의 임시 보관 및 작업 완료 확인 후 기사 정산</li>
          <li>분쟁 발생 시 조정·중재 지원(법적 판단·강제력은 없음)</li>
        </ol>
        <h4>제5조 (계약 주체 및 책임)</h4>
        <p>실제 수리·시공 계약의 당사자는 고객과 기사입니다. 시공 품질·A/S·손해배상 등 시공 관련 책임은 기사에게 있습니다. 회사는 중개 및 대금 보관·정산 대행에 한정된 역할을 수행합니다.</p>
        <h4>제6조 (이용요금 및 결제)</h4>
        <p>고객은 회사가 안내한 계좌로 선입금하며, 회사는 완료 확인 후 기사에게 정산합니다. 현장 변수 발생 시 사전 고지·동의 절차를 거칩니다.</p>
        <h4>제7조 (취소·환불)</h4>
        <p>현장 출동 전 취소는 전액 환불, 출동 후 취소는 출동비·진단비 공제 후 환불, 작업 개시 후 취소는 작업 진행률에 따라 공제 후 환불합니다. 상세 기준은 “환불 및 정산 정책”을 따릅니다.</p>
        <h4>제8조 (분쟁 해결)</h4>
        <p>분쟁은 우선 당사자 간 협의로 해결하며, 회사는 객관 자료를 바탕으로 조정합니다. 필요 시 관할 법원은 회사 주소지 관할로 합니다.</p>
        <h4>제9조 (기타)</h4>
        <p>사업자 정보: 상호 와줄래 / 대표 김현성 / 주소 경기도 안산시 상록구 광덕산1로 / 연락 카카오채널.</p>
      </PolicyModal>

      <PolicyModal
        open={open === "privacy"}
        onClose={() => setOpen(null)}
        title="개인정보 처리방침 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-07</p>
        <h4>1. 총칙</h4>
        <p>와줄래는 「개인정보보호법」 등 관계 법령을 준수하며 최소한의 정보만 수집·이용합니다.</p>
        <h4>2. 수집 항목 및 방법</h4>
        <ul>
          <li>필수: 성명/닉네임, 연락수단(카카오톡 ID 또는 채널 대화), 주소(방문 장소), 의뢰 내용 및 사진</li>
          <li>선택: 결제 관련 정보(입금자명), 후기·평가</li>
          <li>수집 방법: 카카오톡 채널 상담, 웹 폼(해당 시), 고객이 자발적으로 제공한 자료</li>
        </ul>
        <h4>3. 이용 목적</h4>
        <ul>
          <li>의뢰 접수, 기사 매칭, 출동 안내</li>
          <li>대금 보관·정산, 민원/분쟁 대응, 서비스 품질관리</li>
        </ul>
        <h4>4. 보관 기간</h4>
        <p>이용 목적 달성 시 지체 없이 파기하되, 관련 법령(전자상거래 등)에서 정한 기간 동안 보관할 수 있습니다(거래기록 5년 등).</p>
        <h4>5. 처리 위탁 및 제3자 제공</h4>
        <p>출동 수행을 위해 고객의 최소 정보를 기사에게 제공할 수 있습니다. 결제/정산, 메시징 등 운영상 필요한 경우 국내외 클라우드·메시징 사업자에 처리를 위탁할 수 있으며, 위탁 시 수탁자, 위탁업무, 보유기간 등을 고지합니다.</p>
        <h4>6. 이용자 권리</h4>
        <p>열람/정정/삭제/처리정지 요구 및 동의 철회가 가능합니다. 카카오채널을 통해 접수해 주세요.</p>
        <h4>7. 보호 조치</h4>
        <p>접근권한 최소화, 암호화(해당 시), 접근기록 보관, 내부 교육 등 안전성 확보조치를 시행합니다.</p>
        <h4>8. 파기 절차 및 방법</h4>
        <p>목적 달성 또는 보관기간 경과 시 재생 불가능한 방법으로 지체 없이 파기합니다.</p>
        <h4>9. 개인정보 보호책임자</h4>
        <p>책임자: 김현성 / 연락: 카카오톡 채널</p>
      </PolicyModal>

      <PolicyModal
        open={open === "refund"}
        onClose={() => setOpen(null)}
        title="환불 및 정산 정책 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-07</p>
        <h4>1. 결제 및 보관</h4>
        <p>고객은 회사 안내 계좌로 선입금하며, 회사는 작업 완료 확인 후 기사에게 정산합니다.</p>
        <h4>2. 취소·환불 기준</h4>
        <ul>
          <li><b>출동 전</b> 고객 취소: 전액 환불</li>
          <li><b>출동 후</b> 현장 진단만 진행: 출동비/진단비 공제 후 환불</li>
          <li><b>작업 개시 후</b>: 진행률·사용 자재·소요 시간 등을 반영해 공제 후 환불 또는 미환불</li>
          <li>천재지변·접근 불가 등 불가항력 사유는 예외적으로 조정 가능</li>
        </ul>
        <h4>3. 견적 및 추가 비용</h4>
        <p>사전 고지된 범위를 초과하는 현장 변수가 확인될 경우, 고객 동의하에 추가 비용이 발생할 수 있습니다.</p>
        <h4>4. 분쟁 처리</h4>
        <p>증빙(사진, 대화기록, 진단서 등)을 바탕으로 회사가 중재하며, 최종 법적 판단은 사법기관에 따릅니다.</p>
      </PolicyModal>

      <PolicyModal
        open={open === "liability"}
        onClose={() => setOpen(null)}
        title="책임 범위 고지 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-07</p>
        <h4>1. 서비스 성격</h4>
        <p>와줄래는 고객과 기사 간 연결 및 대금 보관·정산 대행을 제공하는 <b>중개 플랫폼</b>입니다.</p>
        <h4>2. 시공 책임</h4>
        <p>수리·시공의 실제 제공 주체는 기사이며, 시공 품질·A/S·손해배상 등 시공 관련 책임은 기사에게 있습니다.</p>
        <h4>3. 회사의 역할</h4>
        <p>회사는 대금 보관·정산과 분쟁 조정 지원 역할을 수행하나, 시공 행위 자체에 대한 직접적 책임은 부담하지 않습니다.</p>
        <h4>4. 관할</h4>
        <p>분쟁 발생 시 회사 주소지 관할 법원을 합의 관할로 합니다.</p>
      </PolicyModal>
    </main>
  );
}
