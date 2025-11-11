export default function Footer({ setLegalOpen, setLegalTab }) {
  return (
    <div className="border-t border-neutral-200 bg-white pb-24 md:pb-0">
      <div className="max-w-[96rem] w-full mx-auto px-6 lg:px-10 py-8">
        <div className="text-sm text-neutral-700 space-y-1">
          <div>
            <strong className="text-neutral-900">와줄래</strong> <span className="text-neutral-400">|</span>
          </div>
          <div>대표: 안정근&김현성</div>
          <div>주소: 경기도 안산시 상록구 광덕산1로 39-12 </div>
          <div>사업자등록번호: 338-46-01315</div>
        </div>
        <nav className="mt-3 flex items-center gap-3 text-sm">
          <button 
            className="text-neutral-700 hover:text-[var(--primary)]" 
            onClick={() => { setLegalTab("privacy"); setLegalOpen(true); }} 
            type="button"
          >
            개인정보 처리방침
          </button>
          <span className="text-neutral-300">·</span>
          <button 
            className="text-neutral-700 hover:text-[var(--primary)]" 
            onClick={() => { setLegalTab("legal"); setLegalOpen(true); }} 
            type="button"
          >
            법적 고지
          </button>
          <span className="text-neutral-300">·</span>
          <button 
            className="text-neutral-700 hover:text-[var(--primary)]" 
            onClick={() => { setLegalTab("tos"); setLegalOpen(true); }} 
            type="button"
          >
            이용약관
          </button>
        </nav>
      </div>
    </div>
  );
}

