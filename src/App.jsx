import React, { useState } from "react";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

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
  const [open, setOpen] = useState(null); // 'terms' | 'privacy' | 'refund' | 'liability' | null

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
                      "기사님 방문·작업·결제 (고객 ↔ 기사 직접 결제)",
                    ][i]}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {[
                    "전화번호 공개 없이 안전하게 접수합니다.",
                    "가장 가까운 지역 기사님을 연결해드립니다.",
                    "결제와 영수증/환불/AS 관련 사항은 기사님과 직접 협의·처리됩니다.",
                  ][i]}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-6 text-xs text-gray-500">
            * 와줄래는 지역 기사와 고객을 연결하는 <b>중개 플랫폼</b>입니다. 작업 품질·A/S·금액·환불 등 시공 관련 책임은 작업을 수행한 기사님에게 있으며, 회사는 결제·대금 보관 및 정산에 관여하지 않습니다.
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

      {/* Policy (축소 버전) */}
      <section id="policy" className="border-t bg-gray-50">
        <div className="w-full px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">정책 안내</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">운영 정책</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                <li>사전 견적 범위 안내 + 품목별 고정 단가 정책 (현장 변수 시 별도 고지)</li>
                <li>가장 가까운 기사님 우선 배정, 야간/주말 긴급 지원</li>
                <li>전화번호 비공개 접수 (카카오채널 중심)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            자세한 약관 및 정책은 아래 링크에서 확인하실 수 있습니다.{" "}
            <button className="underline" onClick={() => setOpen("terms")}>이용약관</button>
            {" · "}
            <button className="underline" onClick={() => setOpen("privacy")}>개인정보처리방침</button>
            {" · "}
            <button className="underline" onClick={() => setOpen("liability")}>책임고지</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t bg-white">
        <div className="w-full px-6 py-16 md:px-8">
          <h2 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { q: "결제는 어디에 하나요?", a: "작업 확정 후 현장에서 또는 기사님 안내 계좌로 직접 결제합니다. 와줄래는 결제‧정산에 관여하지 않습니다." },
              { q: "가격은 어떻게 되나요?", a: "사진/주소/증상을 확인 후 대략적인 범위를 먼저 안내드리고, 고정 단가표와 현장 변수에 따라 기사님이 최종 확정합니다." },
              { q: "내 전화번호가 노출되나요?", a: "아니요. 카카오채널 채팅으로 안전하게 접수되며, 필요한 경우에 한해 기사님과 연결됩니다." },
              { q: "AS와 작업 책임은 누구에게 있나요?", a: "작업을 수행한 기사님에게 있습니다. 와줄래는 중개 플랫폼으로서 기사 재연결 등 조정을 도와드릴 수 있습니다." },
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
              <button className="mx-2 hover:underline" onClick={() => setOpen("liability")}>책임고지</button>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Wajulle. All rights reserved.
        </div>
      </footer>

      {/* ===== Modals: Terms / Privacy / Liability ===== */}
      <PolicyModal
        open={open === "terms"}
        onClose={() => setOpen(null)}
        title="이용약관 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-07</p>
        <h4>제1조 (목적)</h4>
        <p>본 약관은 와줄래(이하 “회사”)가 제공하는 생활수리 연결 중개 서비스의 이용과 관련하여 회사와 이용자 간 권리·의무 및 책임사항을 정함을 목적으로 합니다.</p>
        <h4>제2조 (정의)</h4>
        <ul>
          <li>“플랫폼”은 고객과 지역 기사(사업자)를 연결하는 중개 서비스입니다.</li>
          <li>“고객”은 수리를 의뢰하는 자, “기사”는 수리를 수행하는 자를 말합니다.</li>
        </ul>
        <h4>제3조 (약관의 효력 및 변경)</h4>
        <p>회사는 약관을 웹사이트에 게시하며, 관계 법령에 따라 변경할 수 있습니다. 변경 시 사전 공지합니다.</p>
        <h4>제4조 (서비스의 내용)</h4>
        <ol>
          <li>고객 문의 접수 및 기사 매칭</li>
          <li>가격 안내(범위) 및 일정 조율 지원</li>
          <li>고객과 기사 간 직접 계약·결제 진행을 위한 정보 전달</li>
        </ol>
        <h4>제5조 (계약 주체 및 책임)</h4>
        <p>실제 수리·시공 계약의 당사자는 고객과 기사입니다. 시공 품질·A/S·금액·환불 등 시공 관련 책임은 기사에게 있습니다. 회사는 결제·대금 보관 및 정산에 관여하지 않습니다.</p>
        <h4>제6조 (이용요금)</h4>
        <p>회사는 중개 서비스에 대한 수수료를 기사에게 청구·정산할 수 있습니다. 고객은 기사에게 직접 결제합니다.</p>
        <h4>제7조 (취소·환불)</h4>
        <p>취소·환불은 고객과 기사 간 합의로 처리되며, 회사는 중개자로서 필요한 정보 제공 및 조정을 지원할 수 있습니다.</p>
        <h4>제8조 (분쟁 해결)</h4>
        <p>분쟁은 우선 당사자 간 협의로 해결하며, 회사는 객관 자료를 바탕으로 조정할 수 있습니다. 관할 법원은 회사 주소지 관할로 합니다.</p>
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
          <li>민원/분쟁 대응, 서비스 품질관리</li>
        </ul>
        <h4>4. 보관 기간</h4>
        <p>이용 목적 달성 시 지체 없이 파기하되, 관련 법령에서 정한 기간 동안 보관할 수 있습니다(거래기록 5년 등).</p>
        <h4>5. 처리 위탁 및 제3자 제공</h4>
        <p>출동 수행을 위해 고객의 최소 정보를 기사에게 제공할 수 있습니다. 메시징·클라우드 등 운영상 필요한 경우 수탁자에게 처리를 위탁할 수 있으며, 위탁 시 수탁자, 위탁업무, 보유기간 등을 고지합니다.</p>
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
        open={open === "liability"}
        onClose={() => setOpen(null)}
        title="책임 범위 고지 (와줄래)"
      >
        <p><b>최종 업데이트</b>: 2025-11-07</p>
        <h4>1. 서비스 성격</h4>
        <p>와줄래는 고객과 기사 간 연결을 제공하는 <b>중개 플랫폼</b>입니다.</p>
        <h4>2. 시공 책임</h4>
        <p>수리·시공의 실제 제공 주체는 기사이며, 시공 품질·A/S·금액·환불 등 시공 관련 책임은 기사에게 있습니다.</p>
        <h4>3. 회사의 역할</h4>
        <p>회사는 중개 과정에서 정보 제공 및 조정을 지원하나, 결제·대금 보관 및 정산에는 관여하지 않습니다.</p>
        <h4>4. 관할</h4>
        <p>분쟁 발생 시 회사 주소지 관할 법원을 합의 관할로 합니다.</p>
      </PolicyModal>
    </main>
  );
}
