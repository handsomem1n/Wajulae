import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

const KAKAO_CHAT_LINK = "http://pf.kakao.com/_xdmQxkn/chat";

// LEGAL: 사이트 전역 고지(푸터에만 사용)
const LEGAL_NOTICE =
  "와줄래는 고객과 지역 기사(사업자)를 연결하는 통신판매중개자입니다. 당사는 거래의 당사자가 아니며, 작업의 계약·결제·환불·A/S·하자담보 책임은 작업을 수행한 기사에게 있습니다.";

// ---------- Shared UI ----------
function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="flex w-full items-center justify-between px-6 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500 font-bold text-white shadow-sm">
            와
          </span>
          <div className="leading-tight">
            <div className="text-lg font-bold">와줄래</div>
            <div className="text-xs text-gray-500">생활출동 연결 플랫폼</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/home" className="hover:text-amber-600">홈</Link>
          <Link to="/cases" className="hover:text-amber-600">가능 작업</Link>
          <Link to="/policy" className="hover:text-amber-600">정책/책임고지</Link>
          <Link to="/faq" className="hover:text-amber-600">FAQ</Link>
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
  );
}

function Footer() {
  return (
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
            <li>주소: 경기도 안산시 상록구 광덕산1로</li>
          </ul>
          <div className="mt-3 text-[11px] text-gray-400">
            <Link className="mx-2 hover:underline" to="/policy">이용약관·개인정보·책임고지</Link>|
            <Link className="mx-2 hover:underline" to="/faq">FAQ</Link>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Wajulle. All rights reserved.
      </div>
    </footer>
  );
}

// ---------- Home (간소화된 랜딩) ----------
function Landing() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />

      {/* Hero: 요청대로 간략 요라인만 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.08),transparent_50%),radial-gradient(circle_at_70%_0,rgba(59,130,246,0.05),transparent_40%)]" />
        <div className="w-full px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight md:text-5xl">
              철산·광명 <span className="text-amber-600">생활수리 긴급 출동</span> 연결
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              변기막힘 · 누수 · 보일러 · 전기 · 잠금해제 · 문 개방 등 <b>가까운 동네 기사</b>를 빠르게 연결해드립니다.
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
              <button
                onClick={() => navigate("/cases")}
                className="rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white"
              >
                가능 작업 보기
              </button>
            </div>
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

      <Footer />
    </main>
  );
}

// ---------- Home: 메뉴 클릭 시도 동일 화면 ----------
function HomeInfoPage() {
  return <Landing />;
}

// ---------- Cases Page ----------
const CASE_CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "door", label: "도어/현관" },
  { key: "bath", label: "욕실" },
  { key: "electric", label: "전기/전등" },
  { key: "kitchen", label: "주방" },
  { key: "space", label: "공간" },
];

// 강남구→철산, 서초구→구로, 송파구→가산으로 지역 매핑
const CASES = [
  { id:"intercom-replace-01", title:"인터폰 교체", area:"철산", price:"459,000원", category:"door", summary:"노후 인터폰을 신형으로 교체하여 통화/문열림 기능 개선." },
  { id:"floor-hinge-01", title:"현관문 플로어 힌지 교체", area:"철산", price:"179,900원", category:"door", summary:"쾅 닫힘/복귀 불량 개선 및 레벨링." },
  { id:"top-plate-01", title:"싱크대 상판 교체", area:"구로", price:"1,313,500원", category:"kitchen", summary:"상판 절단·타공·실리콘 마감 포함." },
  { id:"rain-shower-01", title:"해바라기 수전 교체", area:"철산", price:"476,000원", category:"bath", summary:"샤워 기둥형 수전 교체 및 수압/누수 점검." },
  { id:"k-sink-faucet-01", title:"싱크대 수전 교체", area:"구로", price:"103,600원", category:"kitchen", summary:"싱크 수전 교체 및 호스/앵글밸브 점검." },
  { id:"tile-partial-01", title:"타일 부분 교체", area:"철산", price:"187,200원", category:"space", summary:"파손 타일 일부 교체 및 줄눈 보수." },
  { id:"hood-replace-01", title:"주방 후드 교체", area:"구로", price:"530,000원", category:"kitchen", summary:"후드 본체 교체 및 덕트 점검." },
  { id:"undercounter-basin-01", title:"언더카운터 세면대 부착", area:"구로", price:"188,000원", category:"bath", summary:"하부 부착형 세면대 설치 및 실리콘 마감." },
  { id:"sink-trap-01", title:"싱크대 배수통 교체", area:"철산", price:"86,000원", category:"kitchen", summary:"배수 트랩/통 교체로 누수·악취 개선." },
  { id:"door-frame-paint-01", title:"문/창틀 페인트 시공", area:"철산", price:"791,000원", category:"space", summary:"문짝/프레임 사포·프라이머 후 도장." },
  { id:"bath-fan-01", title:"화장실 환풍기 교체", area:"철산", price:"105,800원", category:"bath", summary:"환풍기 본체 교체 및 역류방지 점검." },
  { id:"balcony-paint-02", title:"베란다 페인트", area:"철산", price:"356,000원", category:"space", summary:"보양 후 2회 도장, 결로/오염부 보수." },
  { id:"bath-fan-02", title:"욕실 환풍기 교체", area:"철산", price:"74,000원", category:"bath", summary:"욕실 소형 환풍기 교체." },
  { id:"bath-fan-03", title:"환풍기 교체", area:"철산", price:"65,900원", category:"bath", summary:"공용/욕실 환풍기 교체." },
  { id:"shower-faucet-01", title:"샤워 수전 교체", area:"구로", price:"169,000원", category:"bath", summary:"샤워 혼합수전 교체 및 누수 점검." },
  { id:"living-led-01", title:"LED 거실등 교체", area:"철산", price:"72,400원", category:"electric", summary:"거실 메인등 LED 교체." },
  { id:"basin-faucet-01", title:"세면대 수전 교체", area:"철산", price:"132,600원", category:"bath", summary:"세면대 싱글레버 교체 및 실리콘 보수." },
  { id:"basin-set-01", title:"세면대&수전 교체", area:"철산", price:"358,000원", category:"bath", summary:"세면대 볼과 수전 동시 교체." },
  { id:"basin-faucet-02", title:"세면대 수전 교체", area:"철산", price:"129,400원", category:"bath", summary:"세면대 수전 노후 교체." },
  { id:"sensor-light-01", title:"비상센서등 교체", area:"철산", price:"315,400원", category:"door", summary:"현관/복도 비상센서등 교체." },
  { id:"popup-01", title:"세면대 폽업 교체", area:"철산", price:"47,000원", category:"bath", summary:"폽업 배수장치 교체." },
  { id:"faucet-trap-popup-01", title:"세면대 수전/트랩/폽업 교체", area:"철산", price:"164,200원", category:"bath", summary:"수전+트랩+폽업 일괄 교체." },
  { id:"hinge-repair-01", title:"싱크대 하부장 경첩 보수", area:"철산", price:"66,400원", category:"kitchen", summary:"문틀 처짐·유격 보정." },
  { id:"sink-partial-repair-01", title:"싱크대 부분 수리, 수전 교체", area:"철산", price:"164,300원", category:"kitchen", summary:"하부장 보수+수전 교체 패키지." },
  { id:"hood-replace-02", title:"주방 후드 교체", area:"철산", price:"705,300원", category:"kitchen", summary:"대형 후드 교체, 흡기 성능 개선." },
  { id:"k-sink-faucet-02", title:"싱크대 수전 교체", area:"구로", price:"134,400원", category:"kitchen", summary:"싱크대 수전 교체(모델별 상이)." },
  { id:"k-sink-faucet-03", title:"싱크대 수전 교체", area:"철산", price:"59,000원", category:"kitchen", summary:"기본형 싱크 수전 교체." },
  { id:"basin-set-02", title:"세면대 수전/트랩/폽업 교체", area:"가산", price:"121,000원", category:"bath", summary:"세면대 3종 교체(가산 사례)." },
  { id:"mortise-knob-01", title:"모티스락 문고리 교체", area:"철산", price:"254,400원", category:"door", summary:"모티스락 손잡이 세트 교체." },
  { id:"outlet-01", title:"콘센트 교체", area:"철산", price:"75,600원", category:"electric", summary:"노후 콘센트 교체 및 배선 점검." },
  { id:"urinal-sensor-01", title:"소변기 센서 교체", area:"철산", price:"108,200원", category:"bath", summary:"센서 미작동 수리/교체." },
  { id:"door-hinge-01", title:"현관문 경첩 교체", area:"구로", price:"247,400원", category:"door", summary:"경첩 마모 교체 및 틀 보정." },
  { id:"downlight-mix-01", title:"다운라이트·욕실&거실 LED 교체", area:"구로", price:"609,400원", category:"electric", summary:"다량 LED 교체 패키지." },
  { id:"led-replace-01", title:"LED 등 교체", area:"구로", price:"93,200원", category:"electric", summary:"LED 단품 교체." },
  { id:"top-plate-02", title:"싱크대 상판 교체", area:"철산", price:"1,415,000원", category:"kitchen", summary:"대리석/인조대리석 상판 교체." },
  { id:"ballast-fl-01", title:"안정기 + 형광등 교체", area:"철산", price:"135,000원", category:"electric", summary:"형광등 안정기 세트 교체." },
  { id:"led-sensor-01", title:"LED 센서등 교체", area:"구로", price:"193,500원", category:"electric", summary:"현관/복도 센서등 LED 교체." },
  { id:"basin-angle-01", title:"세면대 수전/앵글밸브 교체", area:"철산", price:"144,200원", category:"bath", summary:"수전+앵글밸브 교체." },
  { id:"basin-full-01", title:"세면대/트랩/폽업/앵글밸브 교체", area:"철산", price:"442,200원", category:"bath", summary:"세면대 풀세트 교체." },
  { id:"led-replace-02", title:"LED 등 교체", area:"철산", price:"83,600원", category:"electric", summary:"LED 단품 교체(소형)." },
  { id:"downlight-01", title:"다운라이트 교체", area:"철산", price:"92,600원", category:"electric", summary:"매립등 교체." },
  { id:"door-rehang-02", title:"문 재부착 및 수리", area:"철산", price:"54,000원", category:"door", summary:"경첩 보강/재부착." },
  { id:"boiler-01", title:"온수기 교체", area:"구로", price:"372,400원", category:"bath", summary:"소형 전기 온수기 교체." },
  { id:"hood-replace-03", title:"주방 후드 교체", area:"철산", price:"367,000원", category:"kitchen", summary:"표준형 후드 교체." },
  { id:"ballast-fl-02", title:"LED 형광등 안정기 교체", area:"가산", price:"53,000원", category:"electric", summary:"형광등 안정기 교체(가산)." },
  { id:"mortise-knob-02", title:"모티스락 문고리 교체", area:"구로", price:"167,900원", category:"door", summary:"모티스락 손잡이 교체(구로)." },
  { id:"knob-01", title:"문고리 교체", area:"철산", price:"54,600원", category:"door", summary:"일반 문고리 교체." },
  { id:"basin-faucet-03", title:"세면대 수전 교체", area:"구로", price:"96,600원", category:"bath", summary:"세면대 수전 교체(구로)." },
  { id:"shower-glass-01", title:"샤워부스 유리 교체", area:"구로", price:"518,700원", category:"bath", summary:"샤워부스 유리 파손 교체." },
  { id:"tub-silicone-01", title:"욕조 실리콘 시공", area:"철산", price:"21,000원", category:"bath", summary:"욕조 실리콘 탈거·재시공." },
  { id:"k-sink-faucet-04", title:"싱크대 수전 교체", area:"철산", price:"108,600원", category:"kitchen", summary:"프리미엄 수전 교체." },
  { id:"paper-molding-paint-01", title:"도배&몰딩 페인트", area:"철산", price:"915,800원", category:"space", summary:"도배 후 몰딩 페인트 마감." },
  { id:"frame-paint-02", title:"문틀 페인트", area:"구로", price:"(견적 문의)", category:"space", summary:"문틀 부분 도장." },
];

function CaseCard({ item }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm flex flex-col">
      <div className="aspect-[4/3] w-full rounded-xl bg-gray-100 mb-3 flex items-center justify-center text-xs text-gray-400">
        현장 사진(예)
      </div>
      <div className="text-sm text-gray-500">{item.area}</div>
      <div className="mt-1 text-base font-semibold">{item.title}</div>
      <div className="mt-1 text-sm text-gray-600">{item.summary}</div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-amber-900">비용: {item.price}</div>
        <div className="rounded-lg bg-gray-50 px-3 py-2 text-gray-700">소요시간: {item.time}</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <a
          href={KAKAO_CHAT_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white"
        >
          이 작업 문의
        </a>
        <span className="text-[11px] text-gray-400">* 현장 변수에 따라 변동</span>
      </div>
    </div>
  );
}

function CasesPage() {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    let list = CASES;
    if (tab !== "all") list = list.filter((c) => c.category === tab);
    if (q.trim()) {
      const qq = q.trim().toLowerCase();
      list = list.filter((c) =>
        c.title.toLowerCase().includes(qq) ||
        c.area.toLowerCase().includes(qq) ||
        c.summary.toLowerCase().includes(qq)
      );
    }
    return list;
  }, [tab, q]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />

      <section className="border-b bg-white">
        <div className="w-full px-6 py-12 md:px-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">가능 작업 사례</h1>
          <p className="mt-2 text-sm text-gray-600">철산/구로/가산 지역 기준의 시공 사례입니다. 표기 금액은 사례 참고용이며, 사진/주소/증상 확인 후 정확 범위를 안내드립니다.</p>

          {/* Tabs */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {CASE_CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setTab(c.key)}
                className={
                  "rounded-full px-4 py-2 text-sm border " +
                  (tab === c.key
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50")
                }
              >
                {c.label}
              </button>
            ))}
            <div className="ml-auto w-full md:w-72">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="키워드로 검색 (예: 수전, 환풍기, 도어)"
                className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="w-full px-6 py-10 md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ---------- Policy Page ----------
function PolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="border-b bg-white">
        <div className="w-full px-6 py-12 md:px-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">정책/책임고지</h1>
          <p className="mt-2 text-sm text-gray-600">분쟁 예방과 투명한 이용을 위해 필수 안내사항을 명확히 고지합니다.</p>
        </div>
      </section>

      <section className="w-full px-6 py-10 md:px-8 space-y-6">
        <article id="broker" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">1) 통신판매중개자 고지(법적 지위)</h2>
          <p className="mt-2 text-sm text-gray-700">{LEGAL_NOTICE} 고객과 기사 사이의 계약 당사자는 <b>고객과 기사</b>이며, 가격 확정·결제·영수증·환불·A/S·하자담보 책임은 기사에게 있습니다. 당사는 정보전달·매칭·일정 조율을 지원하나 법률적 판단·보증은 제공하지 않습니다.</p>
        </article>

        <article id="scope" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">2) 서비스 범위 및 면책</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>당사는 거래의 당사자가 아니며, 기사(사업자)의 행위·품질·지연·손해에 대한 책임을 지지 않습니다(고의·중과실 제외).</li>
            <li>천재지변, 제3자 시스템 장애 등 불가항력에 따른 손해는 면책됩니다.</li>
            <li>플랫폼의 정보는 참고용으로, 최종 판단·선택은 고객 책임입니다.</li>
          </ul>
        </article>

        <article id="pricing" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">3) 가격·사전견적·현장 변수</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li><b>사전 견적 범위</b>를 사진·주소·증상 기반으로 제시하고, 현장 변수 발생 시 설명·동의 후 변경됩니다.</li>
            <li>품목별 <b>고정 단가표</b> 운영, 야간/휴일/특수 공구/폐기 비용 등은 별도 고지합니다.</li>
            <li>출동 후 취소 시 출동비·자재비·공임이 청구될 수 있습니다.</li>
          </ul>
        </article>

        <article id="payment" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">4) 결제·영수증·환불</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>결제는 <b>고객 ↔ 기사</b> 간 직접 진행되며, 영수증/세금계산서는 기사 사업자 명의로 발행됩니다.</li>
            <li>환불·A/S는 해당 기사 정책과 법령에 따릅니다.</li>
          </ul>
        </article>

        <article id="warranty" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">5) A/S·하자담보</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>A/S 범위·기간은 기사 정책 및 작업 내역서 기준으로 적용됩니다.</li>
            <li>소모품·사용자 과실·자연 마모·3자 변경 등은 보증 제외될 수 있습니다.</li>
          </ul>
        </article>

        <article id="evidence" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">6) 증빙 및 분쟁 조정</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-gray-700">
            <li>증빙 수집: 현장 사진, 대화 기록, 견적·작업 내역</li>
            <li>사실 확인: 기사/고객 소명 청취 및 비교</li>
            <li>조정 지원: 추가 방문/재시공/비용 조정(법적 강제력 없음)</li>
          </ol>
        </article>

        <article id="privacy" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">7) 개인정보 처리 요약</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>수집: 닉네임/성명, 주소, 의뢰 내용/사진, 카카오 대화내역</li>
            <li>이용: 접수·매칭·민원 대응·분쟁 사실 확인</li>
            <li>보관: 목적 달성 시 파기(법정 보관기간 준수)</li>
            <li>권리: 열람·정정·삭제·처리정지·동의 철회(카카오채널 접수)</li>
          </ul>
        </article>

        <article id="misc" className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">8) 기타</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>관할: 회사 소재지 관할 법원</li>
            <li>준거법: 대한민국 법령</li>
            <li>약관 변경 시 웹 공지로 효력 발생</li>
            <li>분리 가능성: 조항 일부 무효 시에도 나머지 조항은 유효</li>
          </ul>
        </article>

        <div className="rounded-xl border bg-amber-50 p-4 text-xs text-amber-900">
          <b>중요 고지</b>: {LEGAL_NOTICE}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ---------- FAQ Page ----------
function FAQPage() {
  const items = [
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
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />

      <section className="border-b bg-white">
        <div className="w-full px-6 py-12 md:px-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h1>
          <p className="mt-2 text-sm text-gray-600">자주 문의 주시는 내용을 정리했습니다. 추가로 궁금하신 점은 카카오채널로 문의 주세요.</p>
        </div>
      </section>

      <section>
        <div className="w-full px-6 py-10 md:px-8 grid gap-4 md:grid-cols-2">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border bg-gray-50 p-5 shadow-sm">
              <div className="font-semibold">Q. {item.q}</div>
              <div className="mt-2 text-sm leading-6 text-gray-700">A. {item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ---------- App ----------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeInfoPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/faq" element={<FAQPage />} />
        {/* 홈 링크와 로고가 동일 화면을 보이도록 / 와 /home 모두 랜딩과 동일 처리 원하면 아래 라우트로 교체 */}
        {/* <Route path="/home" element={<Landing />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
