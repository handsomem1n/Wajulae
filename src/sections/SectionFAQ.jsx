const FAQ_ITEMS = [
  { 
    q: "결제는 누구에게 하나요?", 
    a: "고객이 지급하는 시공 대금은 기사에게 직접 지급됩니다. 회사는 고객으로부터 대금을 직접 수령하지 않습니다." 
  },
  { 
    q: "영수증/세금계산서는 누가 발행하나요?", 
    a: "용역 대금 관련 영수증·세금계산서는 기사(사업자)가 발행합니다. 회사는 기사에게 청구되는 중개 수수료에 대해서만 세금계산서를 발행할 수 있습니다." 
  },
  { 
    q: "하자보수 책임은 누구에게 있나요?", 
    a: "시공의 주체는 기사이며, 품질·AS·하자 책임은 기사에게 있습니다. 회사는 중개자 지위에서 분쟁 조정을 안내할 수 있습니다." 
  },
  { 
    q: "취소/환불은 어떻게 이루어지나요?", 
    a: "배정 전 취소는 전액 환불을 권장하나, 구체적 기준은 기사와의 약정 및 법령에 따릅니다. 배정 후 취소·이미 제공된 용역의 환불/감액/하자보수는 고객-기사 간 약정에 따릅니다." 
  },
  { 
    q: "가격이 달라질 수 있는 이유는?", 
    a: "현장 상태, 자재/부자재, 배선·배관·접근성, 난이도 등에 따라 달라질 수 있습니다. 표준 가이드는 참고용입니다." 
  },
  { 
    q: "기사는 검증된 분인가요?", 
    a: "기본 신원/사업자 확인 절차를 거치며, 업종에 필요한 자격·면허·보험 유지 책임은 기사에게 있습니다." 
  },
];

export default function SectionFAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">자주 묻는 질문</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {FAQ_ITEMS.map((f, i) => (
            <details key={i} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="text-neutral-600 mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

