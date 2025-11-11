import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RequestDetailPage() {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [engineerName, setEngineerName] = useState("");
  const [engineerEmail, setEngineerEmail] = useState("");
  const [result, setResult] = useState(null);
  
  // ⚠️ 배포 후 실제 Google Apps Script WebApp URL로 변경 필요
  const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbygepuFV9Mx8I-ciJUqDsWSOQhPXDgDvFMJadkgapbHkEOhTttjjX73h_PWA2aWthdS/exec";
   
  // 작업 정보 로드
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`${WEBAPP_URL}?requestId=${requestId}`);
        const data = await response.json();
        
        if (data.error) {
          alert(data.error);
          setRequest(null);
        } else {
          setRequest(data);
        }
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
        alert("데이터를 불러올 수 없습니다");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequest();
  }, [requestId]);
  
  // 수락 처리
  const handleAccept = async (e) => {
    e.preventDefault();
    
    if (!engineerName.trim()) {
      alert("이름을 입력해주세요");
      return;
    }
    
    if (!confirm(`${engineerName}님으로 이 작업을 수락하시겠습니까?`)) {
      return;
    }
    
    setAccepting(true);
    
    try {
      const response = await fetch(WEBAPP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          requestId: requestId,
          engineerName: engineerName.trim(),
          engineerEmail: engineerEmail.trim()
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult({
          success: true,
          customerPhone: data.customerPhone,
          detailAddress: data.detailAddress
        });
        // 상태 업데이트를 위해 요청 정보 다시 로드
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        alert(data.message || "처리 중 오류가 발생했습니다");
      }
    } catch (error) {
      console.error("수락 처리 오류:", error);
      alert("처리 중 오류가 발생했습니다");
    } finally {
      setAccepting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-600">로딩 중...</p>
        </div>
      </div>
    );
  }
  
  if (!request) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">요청을 찾을 수 없습니다</h2>
          <p className="text-neutral-600 mb-6">요청 ID가 올바르지 않거나 이미 삭제되었습니다.</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:brightness-105 transition"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }
  
  // 매칭 성공 화면
  if (result && result.success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">매칭 성공!</h2>
          <p className="text-lg text-neutral-700 mb-8">
            작업이 배정되었습니다.<br />
            이메일로 상세 정보가 전송되었습니다.
          </p>
          
          <div className="bg-[var(--primary)]/10 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg mb-4">고객 정보</h3>
            <div className="space-y-2">
              <div>
                <span className="text-neutral-600">📞 연락처:</span>
                <span className="ml-2 font-semibold text-lg">{result.customerPhone}</span>
              </div>
              <div>
                <span className="text-neutral-600">🏠 세부 주소:</span>
                <span className="ml-2 font-semibold">{result.detailAddress}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 mb-6">
            3초 후 자동으로 새로고침됩니다...
          </p>
          
          <Link 
            to="/" 
            className="inline-block px-6 py-3 rounded-xl bg-neutral-200 text-neutral-800 font-semibold hover:bg-neutral-300 transition"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 py-8 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 상태 배지 */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            {request.status === "대기중" && (
              <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold text-sm">
                ✅ 수락 가능
              </span>
            )}
            {request.status === "매칭완료" && (
              <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold text-sm">
                🔒 마감됨
              </span>
            )}
          </div>
          <Link 
            to="/" 
            className="text-sm text-neutral-600 hover:text-[var(--primary)] transition"
          >
            ← 홈으로
          </Link>
        </div>
        
        {/* 작업 정보 카드 */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">작업 요청 상세</h1>
            <span className="text-sm text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
              {request.requestId}
            </span>
          </div>
          
          <div className="space-y-5">
            {/* 작업 종류 */}
            <div className="pb-5 border-b border-neutral-200">
              <label className="block text-sm font-semibold text-neutral-500 mb-1">🛠 작업 종류</label>
              <p className="text-xl font-bold text-[var(--primary)]">{request.workType}</p>
            </div>
            
            {/* 자세한 증상 */}
            {request.symptom && (
              <div className="pb-5 border-b border-neutral-200">
                <label className="block text-sm font-semibold text-neutral-500 mb-1">📝 자세한 증상</label>
                <p className="text-lg whitespace-pre-wrap">{request.symptom}</p>
              </div>
            )}
            
            {/* 희망 일정 */}
            <div className="pb-5 border-b border-neutral-200">
              <label className="block text-sm font-semibold text-neutral-500 mb-1">📅 희망 일정</label>
              <p className="text-lg">{request.preferredDate} {request.preferredTime}</p>
            </div>
            
            {/* 주소 */}
            <div className="pb-5 border-b border-neutral-200">
              <label className="block text-sm font-semibold text-neutral-500 mb-1">📍 주소</label>
              <p className="text-lg">{request.address}</p>
              {request.residenceType && (
                <p className="text-sm text-neutral-600 mt-1">
                  거주 형태: {request.residenceType}
                </p>
              )}
              {request.status === "매칭완료" && request.detailAddress && (
                <p className="text-sm font-semibold text-[var(--primary)] mt-2 p-3 bg-[var(--primary)]/10 rounded-xl">
                  🏠 세부 주소: {request.detailAddress}
                </p>
              )}
            </div>
            
            {/* 추가 요청 사항 */}
            {request.additionalRequest && (
              <div className="pb-5 border-b border-neutral-200">
                <label className="block text-sm font-semibold text-neutral-500 mb-1">💬 추가 요청 사항</label>
                <p className="text-lg whitespace-pre-wrap">{request.additionalRequest}</p>
              </div>
            )}
            
            {/* 첨부 이미지 */}
            {request.imageUrl && (
              <div className="pb-5 border-b border-neutral-200">
                <label className="block text-sm font-semibold text-neutral-500 mb-2">📸 첨부 이미지</label>
                <a 
                  href={request.imageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline"
                >
                  <span>이미지 보기</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
            
            {/* 요청 시각 */}
            <div>
              <label className="block text-sm font-semibold text-neutral-500 mb-1">⏰ 요청 시각</label>
              <p className="text-sm text-neutral-600">
                {new Date(request.timestamp).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
        
        {/* 수락 폼 or 마감 안내 */}
        {request.status === "대기중" ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-4">작업 수락하기</h2>
            <form onSubmit={handleAccept} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  이름 (기사) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={engineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  placeholder="홍길동"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  이메일 (선택)
                </label>
                <input
                  type="email"
                  value={engineerEmail}
                  onChange={(e) => setEngineerEmail(e.target.value)}
                  placeholder="engineer@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  이메일을 입력하시면 매칭 완료 알림을 받으실 수 있습니다
                </p>
              </div>
              
              <button
                type="submit"
                disabled={accepting}
                className="w-full py-4 rounded-2xl bg-[var(--primary)] text-white font-bold text-lg hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {accepting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>처리 중...</span>
                  </>
                ) : (
                  <>
                    <span>🙋</span>
                    <span>작업 수락하기</span>
                  </>
                )}
              </button>
            </form>
            
            <p className="text-xs text-neutral-500 mt-4 text-center">
              ※ 선착순 1명만 수락 가능합니다
            </p>
          </div>
        ) : (
          <div className="bg-neutral-100 rounded-3xl p-6 sm:p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold mb-2">마감되었습니다</h2>
            <p className="text-neutral-700 mb-4">
              이미 <strong className="text-[var(--primary)]">{request.matchedEngineer}</strong>님께 배정되었습니다
            </p>
            {request.matchedTime && (
              <p className="text-sm text-neutral-500">
                매칭 시각: {new Date(request.matchedTime).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
