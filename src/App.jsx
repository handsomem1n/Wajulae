import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.08),transparent_50%),radial-gradient(circle_at_70%_0,rgba(59,130,246,0.05),transparent_40%)]" />
        <div className="w-full px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight md:text-5xl">
              생활수리 긴급 출동 연결
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
                className="rounded-2xl border border-amber-300 px-6 py-3 text-sm font-semibold text-amber-700 transition bg-amber-50 hover:bg-white"
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

// ---------- Home: 메뉴 클릭 시 동일 화면 ----------
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

// 스키마: title, summary, category, price, content, labor, material (소요시간 삭제)
const CASES = [
  { id:"intercom-replace-01", title:"인터폰 교체", category:"door", summary:"노후 인터폰을 신형으로 교체하여 통화/문열림 기능 개선.", content:"", price:"", labor:"", material:"" },
  { id:"floor-hinge-01", title:"현관문 플로어 힌지 교체", category:"door", summary:"쾅 닫힘/복귀 불량 개선 및 레벨링.", content:"", price:"", labor:"", material:"" },
  { id:"top-plate-01", title:"싱크대 상판 교체", category:"kitchen", summary:"상판 절단·타공·실리콘 마감 포함.", content:"", price:"", labor:"", material:"" },
  { id:"rain-shower-01", title:"해바라기 수전 교체", category:"bath", summary:"샤워 기둥형 수전 교체 및 수압/누수 점검.", content:"", price:"", labor:"", material:"" },
  { id:"k-sink-faucet-01", title:"싱크대 수전 교체", category:"kitchen", summary:"싱크 수전 교체 및 호스/앵글밸브 점검.", content:"", price:"", labor:"", material:"" },
  { id:"tile-partial-01", title:"타일 부분 교체", category:"space", summary:"파손 타일 일부 교체 및 줄눈 보수.", content:"", price:"", labor:"", material:"" },
  { id:"hood-replace-01", title:"주방 후드 교체", category:"kitchen", summary:"후드 본체 교체 및 덕트 점검.", content:"", price:"", labor:"", material:"" },
  { id:"undercounter-basin-01", title:"언더카운터 세면대 부착", category:"bath", summary:"하부 부착형 세면대 설치 및 실리콘 마감.", content:"", price:"", labor:"", material:"" },
  { id:"sink-trap-01", title:"싱크대 배수통 교체", category:"kitchen", summary:"배수 트랩/통 교체로 누수·악취 개선.", content:"", price:"", labor:"", material:"" },
  { id:"door-frame-paint-01", title:"문/창틀 페인트 시공", category:"space", summary:"문짝/프레임 사포·프라이머 후 도장.", content:"", price:"", labor:"", material:"" },
  { id:"bath-fan-01", title:"화장실 환풍기 교체", category:"bath", summary:"환풍기 본체 교체 및 역류방지 점검.", content:"", price:"", labor:"", material:"" },
  { id:"balcony-paint-02", title:"베란다 페인트", category:"space", summary:"보양 후 2회 도장, 결로/오염부 보수.", content:"", price:"", labor:"", material:"" },
  { id:"bath-fan-02", title:"욕실 환풍기 교체", category:"bath", summary:"욕실 소형 환풍기 교체.", content:"", price:"", labor:"", material:"" },
  { id:"bath-fan-03", title:"환풍기 교체", category:"bath", summary:"공용/욕실 환풍기 교체.", content:"", price:"", labor:"", material:"" },
  { id:"shower-faucet-01", title:"샤워 수전 교체", category:"bath", summary:"샤워 혼합수전 교체 및 누수 점검.", content:"", price:"", labor:"", material:"" },
  { id:"living-led-01", title:"LED 거실등 교체", category:"electric", summary:"거실 메인등 LED 교체.", content:"", price:"", labor:"", material:"" },
  { id:"basin-faucet-01", title:"세면대 수전 교체", category:"bath", summary:"세면대 싱글레버 교체 및 실리콘 보수.", content:"", price:"", labor:"", material:"" },
  { id:"basin-set-01", title:"세면대&수전 교체", category:"bath", summary:"세면대 볼과 수전 동시 교체.", content:"", price:"", labor:"", material:"" },
  { id:"basin-faucet-02", title:"세면대 수전 교체", category:"bath", summary:"세면대 수전 노후 교체.", content:"", price:"", labor:"", material:"" },
  { id:"sensor-light-01", title:"비상센서등 교체", category:"door", summary:"현관/복도 비상센서등 교체.", content:"", price:"", labor:"", material:"" },
  { id:"popup-01", title:"세면대 폽업 교체", category:"bath", summary:"폽업 배수장치 교체.", content:"", price:"", labor:"", material:"" },
  { id:"faucet-trap-popup-01", title:"세면대 수전/트랩/폽업 교체", category:"bath", summary:"수전+트랩+폽업 일괄 교체.", content:"", price:"", labor:"", material:"" },
  { id:"hinge-repair-01", title:"싱크대 하부장 경첩 보수", category:"kitchen", summary:"문틀 처짐·유격 보정.", content:"", price:"", labor:"", material:"" },
  { id:"sink-partial-repair-01", title:"싱크대 부분 수리, 수전 교체", category:"kitchen", summary:"하부장 보수+수전 교체 패키지.", content:"", price:"", labor:"", material:"" },
  { id:"hood-replace-02", title:"주방 후드 교체", category:"kitchen", summary:"대형 후드 교체, 흡기 성능 개선.", content:"", price:"", labor:"", material:"" },
  { id:"k-sink-faucet-02", title:"싱크대 수전 교체", category:"kitchen", summary:"싱크대 수전 교체(모델별 상이).", content:"", price:"", labor:"", material:"" },
  { id:"k-sink-faucet-03", title:"싱크대 수전 교체", category:"kitchen", summary:"기본형 싱크 수전 교체.", content:"", price:"", labor:"", material:"" },
  { id:"basin-set-02", title:"세면대 수전/트랩/폽업 교체", category:"bath", summary:"세면대 3종 교체(가산 사례).", content:"", price:"", labor:"", material:"" },
  { id:"mortise-knob-01", title:"모티스락 문고리 교체", category:"door", summary:"모티스락 손잡이 세트 교체.", content:"", price:"", labor:"", material:"" },
  { id:"outlet-01", title:"콘센트 교체", category:"electric", summary:"노후 콘센트 교체 및 배선 점검.", content:"", price:"", labor:"", material:"" },
  { id:"urinal-sensor-01", title:"소변기 센서 교체", category:"bath", summary:"센서 미작동 수리/교체.", content:"", price:"", labor:"", material:"" },
  { id:"door-hinge-01", title:"현관문 경첩 교체", category:"door", summary:"경첩 마모 교체 및 틀 보정.", content:"", price:"", labor:"", material:"" },
  { id:"downlight-mix-01", title:"다운라이트·욕실&거실 LED 교체", category:"electric", summary:"다량 LED 교체 패키지.", content:"", price:"", labor:"", material:"" },
  { id:"led-replace-01", title:"LED 등 교체", category:"electric", summary:"LED 단품 교체.", content:"", price:"", labor:"", material:"" },
  { id:"top-plate-02", title:"싱크대 상판 교체", category:"kitchen", summary:"대리석/인조대리석 상판 교체.", content:"", price:"", labor:"", material:"" },
  { id:"ballast-fl-01", title:"안정기 + 형광등 교체", category:"electric", summary:"형광등 안정기 세트 교체.", content:"", price:"", labor:"", material:"" },
  { id:"led-sensor-01", title:"LED 센서등 교체", category:"electric", summary:"현관/복도 센서등 LED 교체.", content:"", price:"", labor:"", material:"" },
  { id:"basin-angle-01", title:"세면대 수전/앵글밸브 교체", category:"bath", summary:"수전+앵글밸브 교체.", content:"", price:"", labor:"", material:"" },
  { id:"basin-full-01", title:"세면대/트랩/폽업/앵글밸브 교체", category:"bath", summary:"세면대 풀세트 교체.", content:"", price:"", labor:"", material:"" },
  { id:"led-replace-02", title:"LED 등 교체", category:"electric", summary:"LED 단품 교체(소형).", content:"", price:"", labor:"", material:"" },
  { id:"downlight-01", title:"다운라이트 교체", category:"electric", summary:"매립등 교체.", content:"", price:"", labor:"", material:"" },
  { id:"door-rehang-02", title:"문 재부착 및 수리", category:"door", summary:"경첩 보강/재부착.", content:"", price:"", labor:"", material:"" },
  { id:"boiler-01", title:"온수기 교체", category:"bath", summary:"소형 전기 온수기 교체.", content:"", price:"", labor:"", material:"" },
  { id:"hood-replace-03", title:"주방 후드 교체", category:"kitchen", summary:"표준형 후드 교체.", content:"", price:"", labor:"", material:"" },
  { id:"ballast-fl-02", title:"LED 형광등 안정기 교체", category:"electric", summary:"형광등 안정기 교체(가산).", content:"", price:"", labor:"", material:"" },
  { id:"mortise-knob-02", title:"모티스락 문고리 교체", category:"door", summary:"모티스락 손잡이 교체(구로).", content:"", price:"", labor:"", material:"" },
  { id:"knob-01", title:"문고리 교체", category:"door", summary:"일반 문고리 교체.", content:"", price:"", labor:"", material:"" },
  { id:"basin-faucet-03", title:"세면대 수전 교체", category:"bath", summary:"세면대 수전 교체(구로).", content:"", price:"", labor:"", material:"" },
  { id:"shower-glass-01", title:"샤워부스 유리 교체", category:"bath", summary:"샤워부스 유리 파손 교체.", content:"", price:"", labor:"", material:"" },
  { id:"tub-silicone-01", title:"욕조 실리콘 시공", category:"bath", summary:"욕조 실리콘 탈거·재시공.", content:"", price:"", labor:"", material:"" },
  { id:"k-sink-faucet-04", title:"싱크대 수전 교체", category:"kitchen", summary:"프리미엄 수전 교체.", content:"", price:"", labor:"", material:"" },
  { id:"paper-molding-paint-01", title:"도배&몰딩 페인트", category:"space", summary:"도배 후 몰딩 페인트 마감.", content:"", price:"", labor:"", material:"" },
  { id:"frame-paint-02", title:"문틀 페인트", category:"space", summary:"문틀 부분 도장.", content:"", price:"", labor:"", material:"" },
];

function CaseCard({ item }) {
  const hasPrice = Boolean(item.price && String(item.price).trim());
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-xl ring-1 ring-amber-100/60">
      {/* Top accent bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

      {/* Category + optional price */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800 ring-1 ring-amber-200">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
          </svg>
          {item.category}
        </span>
        {hasPrice ? (
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-700 ring-1 ring-amber-300">
            비용 {item.price}
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-500 ring-1 ring-gray-200">
            비용 입력 전
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2 text-base font-semibold tracking-tight text-gray-900">
        {item.title}
      </h3>

      {/* Summary */}
      <p className="mt-1 text-sm leading-6 text-gray-600">
        {item.summary}
      </p>

      {/* CTA */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/cases/${item.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        >
          자세히 보기
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
        <span className="text-[11px] text-gray-400">* 사례 기준</span>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{background:"radial-gradient(600px circle at var(--x,50%) 0%, rgba(245,158,11,0.12), transparent 40%)"}} />
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
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 rounded bg-amber-500" />
            <h1 className="text-2xl font-extrabold md:text-3xl">가능 작업 사례</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            사례 기준의 시공 내역입니다. 표기 금액은 참고용이며, 사진/주소/증상 확인 후 정확 범위를 안내드립니다.
          </p>

          {/* Tabs */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {CASE_CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setTab(c.key)}
                className={
                  "rounded-full px-4 py-2 text-sm border " +
                  (tab === c.key
                    ? "bg-amber-500 border-amber-500 text-white shadow"
                    : "bg-white border-amber-200 text-amber-800 hover:bg-amber-50")
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
                className="w-full rounded-full border border-amber-200 px-4 py-2 text-sm outline-none focus:border-amber-500"
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

// ---------- Case Detail Page (공통 레이아웃) ----------
function CaseDetailPage() {
  const { id } = useParams();
  const data = CASES.find((c) => c.id === id);

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <TopBar />
        <section className="w-full px-6 py-16 md:px-8">
          <div className="max-w-3xl">
            <div className="text-2xl font-bold">항목을 찾을 수 없습니다.</div>
            <p className="mt-2 text-sm text-gray-600">뒤로 가기 또는 다른 작업을 선택해 주세요.</p>
            <div className="mt-6 flex items-center gap-3">
              <Link to="/cases" className="rounded-xl border px-4 py-2 text-sm">목록으로</Link>
              <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white">카카오채널 문의</a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <section className="border-b bg-white">
        <div className="w-full px-6 py-10 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-6 w-1 rounded bg-amber-500" />
                <h1 className="text-2xl font-extrabold md:text-3xl">{data.title}</h1>
              </div>
              <p className="mt-1 text-sm text-gray-600">사례 상세 안내</p>
            </div>
            <Link to="/cases" className="rounded-full border px-4 py-2 text-sm">목록으로</Link>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-10 md:px-8">
        <div className="mx-auto grid max-w-3xl gap-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <DetailList
              items={[
                { label: "시공내역", value: data.content || "" },
                { label: "비용", value: data.price || "" },
                { label: "공임비", value: data.labor || "" },
                { label: "제품비용", value: data.material || "" },
              ]}
            />
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm">
              <div className="font-semibold mb-2">설명</div>
              <div className="leading-6 text-gray-700">{data.summary}</div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-4 text-xs text-amber-900 ring-1 ring-amber-200">
            * 표기 금액과 내역은 사례 기준이며, 현장 상태(배관/전원/구조)에 따라 변동될 수 있습니다.
          </div>

          <div className="flex items-center gap-3">
            <a href={KAKAO_CHAT_LINK} target="_blank" rel="noreferrer" className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600">카카오채널로 상담하기</a>
            <Link to="/cases" className="text-sm text-gray-600 underline">목록으로 돌아가기</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function DetailList({ items }) {
  return (
    <dl className="space-y-4">
      {items.map((it, idx) => (
        <div key={idx} className="rounded-xl border bg-amber-50/40 p-3 ring-1 ring-amber-100">
          <dt className="text-[11px] font-semibold text-amber-700">{it.label}</dt>
          <dd className="mt-1 text-base font-semibold text-gray-900">{it.value}</dd>
        </div>
      ))}
    </dl>
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
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 rounded bg-amber-500" />
            <h1 className="text-2xl font-extrabold md:text-3xl">자주 묻는 질문</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">자주 문의 주시는 내용을 정리했습니다. 추가로 궁금하신 점은 카카오채널로 문의 주세요.</p>
        </div>
      </section>

      <section>
        <div className="w-full px-6 py-10 md:px-8 grid gap-4 md:grid-cols-2">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-amber-100">
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
        <Route path="/cases/:id" element={<CaseDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}
