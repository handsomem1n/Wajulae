import { useEffect } from "react";

function LegalModal({ open, onClose, activeTab, setActiveTab }) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const TabButton = ({ id, children }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={
        "px-3 py-2 rounded-full text-sm font-semibold transition " +
        (activeTab === id
          ? "bg-[var(--primary)] text-neutral-900 shadow font-bold"
          : "text-neutral-700 hover:bg-neutral-100")
      }
      aria-pressed={activeTab === id}
      type="button"
    >
      {children}
    </button>
  );

  if (!open) return null;
  
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="min-h-[100dvh] flex items-start justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-neutral-200">
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <div className="flex items-center gap-2">
              <TabButton id="tos">이용약관</TabButton>
              <TabButton id="legal">법적 고지</TabButton>
              <TabButton id="privacy">개인정보 처리방침</TabButton>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100" aria-label="닫기" type="button">×</button>
          </div>
          <div className="max-h-[min(72vh,calc(100dvh-160px))] overflow-y-auto p-6 text-[14px] leading-relaxed text-neutral-800">
            {activeTab === "tos" && <TOS setActiveTab={setActiveTab} />}
            {activeTab === "legal" && <LegalNotice />}
            {activeTab === "privacy" && <Privacy />}
          </div>
        </div>
      </div>
    </div>
  );
}

const TOS = ({ setActiveTab }) => (
  <article className="space-y-4">
    <h3 className="font-bold text-base">제1조 (목적)</h3>
    <p>본 약관은 주식회사 와줄래(이하 "회사")가 운영하는 생활수리·설치·점검 등 <strong>중개 플랫폼</strong>(이하 "플랫폼") 이용과 관련하여, 회사와 이용자(고객/기사) 간 권리·의무 및 책임 사항을 정함을 목적으로 합니다.</p>

    <h3 className="font-bold text-base">제2조 (정의)</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong>고객</strong>: 플랫폼을 통해 기사에게 용역 제공을 요청하는 자</li>
      <li><strong>기사(서비스 제공자)</strong>: 고객에게 실제 시공·용역을 제공하는 독립 개인 또는 사업자</li>
      <li><strong>중개서비스</strong>: 매칭·연락 중계·일정 조율·결제도구 제공 등 거래 연결을 위한 온라인 서비스</li>
      <li><strong>거래계약</strong>: 고객과 기사 간 직접 체결되는 용역 계약</li>
    </ul>

    <h3 className="font-bold text-base">제3조 (회사의 지위)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>회사는 <strong>중개자</strong>이며, 고객과 기사 사이의 거래계약의 <strong>당사자</strong>가 아닙니다.</li>
      <li>기사는 회사의 피용자·대리인이 아닌 <strong>독립 사업자</strong>로서 작업 방식·일정·안전관리 등에 대한 권한과 책임을 스스로 부담합니다.</li>
      <li>회사는 기사 선정·시공 품질·하자보수 등에 대해 지휘·감독하지 않으며, 관련 책임은 기사에게 귀속됩니다.</li>
    </ol>

    <h3 className="font-bold text-base">제4조 (대금·결제·세금계산서)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>고객이 지급하는 시공 대금은 <strong>기사에게 직접 지급</strong>됩니다. 회사는 고객으로부터 대금을 직접 수령하지 않습니다.</li>
      <li>회사가 결제 시스템을 제공하는 경우에도, 회사는 기사 명의로 대금을 수령하는 <strong>집금 대행자(수금 대리인)</strong>의 지위에 한정하며, 대금의 귀속 주체는 기사입니다.</li>
      <li>용역과 관련한 <strong>세금계산서/영수증은 기사</strong>가 발행하며, 회사는 기사에게 부과되는 <strong>중개 수수료</strong>에 한하여 세금계산서를 발행할 수 있습니다.</li>
    </ol>

    <h3 className="font-bold text-base">제5조 (시공·용역 책임)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>품질·안전·하자보수·일정·손해배상 등 용역 이행과 관련된 <strong>모든 법적 책임은 기사</strong>에게 있습니다.</li>
      <li>기사는 관련 법령·자격·안전기준을 준수하여야 하며, 위반으로 인한 책임 또한 기사에게 귀속됩니다.</li>
      <li>고객은 작업 범위·가격·AS 조건 등을 기사와 사전 합의하고 확인하여야 합니다.</li>
    </ol>

    <h3 className="font-bold text-base">제6조 (취소·환불)</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>배정 전 취소는 원칙적으로 전액 환불을 권장하나, 구체적 기준은 기사와의 약정에 따릅니다.</li>
      <li>배정 후 취소 또는 이미 제공된 용역의 환불·감액·하자보수는 <strong>고객-기사 간 약정 및 관계 법령</strong>에 따릅니다. 회사는 분쟁 조정을 안내할 수 있으나 법적 강제권은 없습니다.</li>
    </ol>

    <h3 className="font-bold text-base">제7조 (면책 및 책임 제한)</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>기사의 과실·계약 위반·무자격 시공 등으로 인한 손해</li>
      <li>고객 제공 정보의 오류·누락</li>
      <li>천재지변 등 불가항력</li>
      <li>정보통신 설비의 보수·교체·정기점검 또는 장애로 인한 서비스 중단(회사의 중대한 과실이 없는 한)</li>
    </ul>
    <p>법령이 허용하는 범위 내에서 회사의 손해배상책임은 <strong>직접적이고 통상 가능한 손해</strong>에 한하며, 간접·특별·결과적 손해는 배상하지 않습니다.</p>

    <h3 className="font-bold text-base">제8조 (자격·보험)</h3>
    <p>특정 업종에 필요한 자격·면허·보험 가입 및 유지·갱신 책임은 기사에게 있습니다.</p>

    <h3 className="font-bold text-base">제9조 (개인정보 보호)</h3>
    <p>개인정보 처리에 관한 사항은 <button className="underline underline-offset-4" onClick={() => setActiveTab("privacy")}>개인정보 처리방침</button>을 따릅니다.</p>

    <h3 className="font-bold text-base">제10조 (준거법/관할)</h3>
    <p>대한민국 법령을 준거법으로 하며, 관할은 민사소송법에 따릅니다.</p>

    <p className="text-xs text-neutral-500">문의: legal@wajullae.co.kr</p>
  </article>
);

const LegalNotice = () => (
  <article className="space-y-4">
    {[
      {t:"① 회사의 법적 지위", d:"회사는 고객과 기사를 연결하는 온라인 중개자이며, 거래의 당사자가 아닙니다."},
      {t:"② 결제 구조", d:"고객이 지급하는 시공 대금의 귀속 주체는 기사입니다. 회사는 고객으로부터 직접 대금을 수령하지 않으며, 결제도구 제공 시 기사 명의의 집금 대행자 역할에 한정됩니다."},
      {t:"③ 기사의 독립성", d:"기사는 회사의 피용자/대리인이 아닌 독립 사업자입니다. 작업 품질·안전·일정·하자보수 책임은 기사에게 있습니다."},
      {t:"④ 영수증/세금계산서", d:"용역 대금 관련 영수증·세금계산서는 기사(사업자)가 발행합니다. 회사는 기사에게 청구되는 중개 수수료에 대해서만 세금계산서를 발행할 수 있습니다."},
      {t:"⑤ 하자·AS·환불", d:"하자보수·환불 기준은 고객-기사 간 약정 및 법령에 따릅니다. 회사는 분쟁 조정 절차를 안내할 수 있으나 법적 강제권은 없습니다."},
      {t:"⑥ 책임 제한", d:"법령이 허용하는 범위 내에서 회사는 간접·특별·결과적 손해에 대해 책임을 지지 않습니다."},
      {t:"⑦ 안전 및 준법", d:"기사의 자격·면허·보험 유지, 산업안전 및 관련 법령 준수 책임은 기사에게 있습니다."},
      {t:"⑧ 정보 고지", d:"플랫폼 내 견적/가격/설명은 참고 정보로, 현장 상황에 따라 변동될 수 있습니다."}
    ].map((x,i)=> (
      <details key={i} className="rounded-2xl border p-4 group">
        <summary className="font-semibold cursor-pointer flex items-center justify-between">
          <span>{x.t}</span>
          <span className="text-neutral-400 group-open:rotate-180 transition">⌄</span>
        </summary>
        <p className="mt-2 text-neutral-700">{x.d}</p>
      </details>
    ))}
    <p className="text-xs text-neutral-500">※ 본 고지는 플랫폼의 법적 지위를 명확히 하기 위한 요약입니다. 상세한 권리·의무는 "이용약관"을 따릅니다.</p>
  </article>
);

const Privacy = () => (
  <article className="space-y-4">
    <h3 className="font-bold text-base">개인정보 처리방침(요약)</h3>
    <p><strong>처리자 지위</strong>: 회사는 계정·매칭·고객지원 등 플랫폼 운영과 관련하여 개인정보처리자(Controller)입니다. 결제도구 제공 시 결제정보는 PG사 등 수탁사가 처리하며, 회사는 기사 명의의 집금 대행에 한정하여 필요한 범위에서 처리할 수 있습니다.</p>
    <p><strong>수집 항목</strong>: 성명, 연락처, 주소(시공지), 상담/견적/이용기록, 기기정보, 결제 관련 식별자(카드 토큰 등) · <strong>목적</strong>: 회원관리, 매칭, 상담, 분쟁 대응, 보안, 부정이용 방지 · <strong>보관</strong>: 목적 달성 후 파기하되, 법정 보관기간은 예외</p>

    <h4 className="font-semibold">제3자 제공 및 처리위탁</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li>PG/에스크로, 문자·알림 발송, 클라우드·백업, 고객센터 시스템, 인증/보안 솔루션 등</li>
      <li>수탁사·항목·기간·국외 이전 여부는 서비스 내 별도 고지</li>
    </ul>

    <h4 className="font-semibold">이용자 권리</h4>
    <p>개인정보의 열람·정정·삭제·처리정지·동의 철회 요청이 가능합니다. 법령상 예외 사유가 있는 경우 제한될 수 있습니다.</p>

    <h4 className="font-semibold">보호조치</h4>
    <p>암호화, 접근통제, 최소권한, 접속기록 보관, 침해사고 대응 등</p>

    <p className="text-xs text-neutral-500">본 요약은 이해를 돕기 위한 것으로, 전문은 서비스 내 전체 개인정보 처리방침에서 확인하세요.</p>
  </article>
);

export default LegalModal;

