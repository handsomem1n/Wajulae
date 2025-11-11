import { useMemo, useState } from "react";
import { SearchIcon } from "../components/Icons";

const PRICING_ITEMS = [
  { t: "콘센트 교체",              p: "60,000원",  d: "수량·배선 상태에 따라 변동",           img: "/images/test1.png" },
  { t: "해바라기 수전 교체",        p: "450,000원", d: "부품·난이도에 따라 변동",             img: "/images/showerhead.jpg" },
  { t: "인터폰 교체",              p: "400,000원", d: "기종·배선 상태에 따라 변동",             img: "/images/intercom.jpg" },
  { t: "현관문 플로어 힌지 교체",  p: "150,000원", d: "도어 규격·부품에 따라 변동",             img: "/images/door-hinge.jpg" },
  { t: "싱크대 수전 교체",         p: "100,000원", d: "배관·벽체 상태에 따라 변동",             img: "/images/kitchen-faucet.jpg" },
  { t: "싱크대 상판 리모델링 교체", p: "1,200,000원", d: "자재·타공·길이에 따라 변동",           img: "/images/countertop.jpg" },
  { t: "대리석 크랙 보수", p: "300,000원", d: "규격에 따라 변동",           img: "/images/countertop.jpg" },
  { t: "타일 한 박스 부분 교체",    p: "180,000원", d: "면적·자재 수급에 따라 변동",             img: "/images/tiles.jpg" },
  { t: "주방후드 교체",            p: "500,000원", d: "덕트·전원 위치에 따라 변동",             img: "/images/kitchen-hood.jpg" },
  { t: "언더카운트 세면대 부착",   p: "160,000원", d: "상판 재질·브라켓 유무에 따라 변동",      img: "/images/undercounter-sink.jpg" },
  { t: "싱크대 배수통 부착",       p: "80,000원",  d: "사이즈·타공 유무에 따라 변동",          img: "/images/drain-basket.jpg" },
  { t: "화장실 환풍기 교체",       p: "100,000원", d: "전원·덕트 상태에 따라 변동",             img: "/images/bath-fan.jpg" },
  { t: "샤워 수전 교체",           p: "150,000원", d: "배관·벽체 상태에 따라 변동",             img: "/images/shower-faucet.jpg" },
  { t: "LED 등 교체",              p: "80,000원",  d: "규격·천장 타입에 따라 변동",             img: "/images/led-light.jpg" },
  { t: "세면대 수전 교체",         p: "120,000원", d: "규격·배관 상태에 따라 변동",             img: "/images/basin-faucet.jpg" },
  { t: "비상센서등 교체",          p: "100,000원", d: "전원·설치 위치에 따라 변동",             img: "/images/emergency-light.jpg" },
  { t: "폽업 교체",                p: "45,000원",  d: "규격·막힘 여부에 따라 변동",             img: "/images/pop-up.jpg" },
  { t: "소변기 센서 교체",         p: "100,000원", d: "전원·배관 상태에 따라 변동",             img: "/images/urinal-sensor.jpg" },
  { t: "현관문 경첩 교체",         p: "200,000원", d: "도어 무게·힌지 규격에 따라 변동",        img: "/images/door-hinge2.jpg" },
  { t: "문 재부착 및 수리",        p: "50,000원",  d: "틀 뒤틀림·경첩 상태에 따라 변동",        img: "/images/door-repair.jpg" },
  { t: "문고리 교체",              p: "50,000원",  d: "백세트 규격·문두께에 따라 변동",         img: "/images/door-handle.jpg" },
];

export default function SectionPricing() {
  const [q, setQ] = useState("");
  
  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return PRICING_ITEMS;
    return PRICING_ITEMS.filter((c) => (c.t + " " + c.d).toLowerCase().includes(keyword));
  }, [q]);
  
  const searchSuffix = q ? ` (검색어: "${q}")` : "";

  return (
    <section id="pricing" className="py-16 bg-neutral-50">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">표준 견적 가이드</h2>
            <p className="text-neutral-500 mt-2">* 모든 금액은 부가세 · 출장비 · 기본 부품비 포함 기준입니다.</p>
          </div>
          <div className="w-full sm:w-auto">
            <label className="relative block">
              <span className="sr-only">항목 검색</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="항목 검색"
                className="w-full sm:w-80 pl-11 pr-24 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 ring-offset-0"
                type="search"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                <SearchIcon />
              </span>
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  aria-label="검색어 지우기"
                >
                  지우기
                </button>
              )}
            </label>
          </div>
        </div>

        <div className="mt-4 text-sm text-neutral-500">총 {filtered.length}건{searchSuffix}</div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((c) => (
              <div key={c.t} className="text-left rounded-2xl bg-white ring-1 ring-neutral-200 p-4 select-none cursor-default">
                {c.img ? (
                  <img
                    src={c.img}
                    alt={c.t}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover rounded-xl mb-3"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 mb-3" />
                )}
                <p className="font-semibold">{c.t}</p>
                <p className="mt-1 text-lg font-extrabold text-neutral-900">{c.p}</p>
                <p className="text-neutral-500 text-sm mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-600">
            검색 결과가 없습니다. 다른 키워드로 다시 시도해 보세요.
          </div>
        )}

        <p className="text-xs text-neutral-500 mt-4">※ 현장 상황에 따라 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}

