import React, { useEffect, useState } from "react";


// ✅ 리브랜딩 및 동작 변경
// - 브랜드명: "와줄래"
// - "시공 사례" → "가능 견적"으로 변경
// - 네비: "서비스 소개" 클릭 시 로고(좌상단) 클릭과 동일하게 #hero로 이동
// - 그 외(특장점/진행 절차/표준 견적/가능 견적/FAQ/문의)는 "다음 페이지"(풀스크린 오버레이)로 열람
// - "간편 견적 보기" 버튼 및 견적 계산기 모달 제거
// - 텍스트/색/이미지 전부 신규 제작(합법적 유사)


const NAV = [
{ id: "about", label: "서비스 소개", type: "scroll" }, // #hero로 스크롤
{ id: "features", label: "특장점", type: "page" },
{ id: "process", label: "진행 절차", type: "page" },
{ id: "pricing", label: "표준 견적", type: "page" },
{ id: "possible", label: "가능 견적", type: "page" },
{ id: "faq", label: "FAQ", type: "page" },
{ id: "contact", label: "문의", type: "page" },
];


function useScrollSpy(ids) {
const [active, setActive] = useState(ids[0]);
useEffect(() => {
const observer = new IntersectionObserver(
(entries) => {
const visible = entries
.filter((e) => e.isIntersecting)
.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
if (visible[0]) setActive(visible[0].target.id);
},
{ rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
);
ids.forEach((id) => {
const el = document.getElementById(id);
if (el) observer.observe(el);
});
return () => observer.disconnect();
}, [ids]);
return active;
}


const Check = () => (
<svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
);


const ArrowRight = () => (
<svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fill="currentColor" d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8z"/></svg>
);


const Play = () => (
<svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
);


// 섹션 컴포넌트들 — 오버레이 페이지에서도 재사용
function SectionFeatures() {
return (
<section id="features" className="py-16 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<h2 className="text-2xl sm:text-3xl font-bold">왜 우리 서비스일까요?</h2>
<div className="mt-8 grid md:grid-cols-3 gap-6">
{[
{ title: "투명한 가격", desc: "항목별 표준 가격표로 합리적인 의사결정" },
{ title: "전문가 네트워크", desc: "검증된 기술자와 표준 운영 매뉴얼" },
{ title: "빠른 응답", desc: "1분 신청 → 당일 상담(영업일 기준)" },
{ title: "안전 우선", desc: "자재·공정 체크리스트와 품질 보증" },
{ title: "데이터 기반", desc: "상담·시공 데이터를 바탕으로 지속 개선" },
{ title: "전국 커버리지", desc: "순차 확대 중 — 지역별 순차 지원" },
].map((f) => (
<div key={f.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
<div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-4">
<Check/>
</div>
<p className="font-semibold">{f.title}</p>
<p className="text-neutral-600 text-sm mt-1">{f.desc}</p>
</div>
))}
</div>
</div>
</section>
);
}

