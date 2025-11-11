// ========================================
// 와줄래 생활수리 - Google Apps Script
// ========================================

const SHEET_NAME = "고객요청";
const ENGINEER_SHEET = "기사목록";

// 요청ID 자동 생성 함수
function generateRequestId() {
  const date = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyyMMdd");
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  const count = lastRow > 1 ? lastRow - 1 : 0;
  const serial = (count + 1).toString().padStart(3, '0');
  return `REQ-${date}-${serial}`;
}

// ========================================
// 1. 폼 제출 시 자동 실행
// ========================================
function onFormSubmit(e) {
  const sheet = e.source.getSheetByName(SHEET_NAME);
  const row = e.range.getRow();

  Logger.log("신규 요청 감지: row = " + row);

  // 요청ID 자동 생성 및 저장 (A열)
  const requestId = generateRequestId();
  sheet.getRange(row, 1).setValue(requestId);

  // 요청 데이터 추출 (실제 시트 구조에 맞춤)
  const customerName = sheet.getRange(row, 3).getValue();      // C열: 이름
  const phone = sheet.getRange(row, 4).getValue();             // D열: 연락처
  const residenceType = sheet.getRange(row, 5).getValue();     // E열: 거주 형태
  const workType = sheet.getRange(row, 6).getValue();          // F열: 작업 형태
  const photo = sheet.getRange(row, 7).getValue();             // G열: 사진/동영상
  const symptom = sheet.getRange(row, 8).getValue();           // H열: 자세한 증상
  const addr = sheet.getRange(row, 9).getValue();              // I열: 대략적인 주소
  const detailAddr = sheet.getRange(row, 10).getValue();       // J열: 세부 주소
  const date = sheet.getRange(row, 11).getValue();             // K열: 작업 희망 날짜
  const time = sheet.getRange(row, 12).getValue();             // L열: 원하는 작업 시간
  const additionalRequest = sheet.getRange(row, 13).getValue(); // M열: 추가 요청 사항

  // 매칭 상태 초기화 (N, O, P열)
  sheet.getRange(row, 14).setValue("대기중");  // N열: 매칭 상태
  // O열: 매칭 시각 (비워둠)
  // P열: 매칭된 기사 (비워둠)

  // React 웹앱 URL
  const matchUrl = `https://www.wajulae.co.kr/request/${requestId}`;

  // 이메일 본문 구성
  const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━
   🔧 생활수리 신규 요청
━━━━━━━━━━━━━━━━━━━━━━

📋 요청 ID: ${requestId}
👤 고객명: ${customerName}
📞 연락처: ${phone}
🏠 거주 형태: ${residenceType}
🛠 작업 내용: ${workType}
📝 증상: ${symptom}
📅 희망 날짜: ${date} ${time}
📍 지역: ${addr}
📸 사진: ${photo || '없음'}
${additionalRequest ? '💬 추가 요청: ' + additionalRequest : ''}

━━━━━━━━━━━━━━━━━━━━━━

👇 아래 링크를 클릭하여 상세 내용을 확인하고 수락하세요
(선착순 1명만 매칭됩니다)

🔗 ${matchUrl}

━━━━━━━━━━━━━━━━━━━━━━
※ 이미 다른 기사님이 수락한 경우 마감 표시됩니다.
※ 수락하시면 고객 세부 주소와 연락처가 공개됩니다.
━━━━━━━━━━━━━━━━━━━━━━
`;

  // 기사 이메일 리스트 불러오기
  const engineerSheet = e.source.getSheetByName(ENGINEER_SHEET);
  const data = engineerSheet.getRange(2, 2, engineerSheet.getLastRow() - 1, 1).getValues();
  const emailList = data.flat().filter(email => email);

  // 이메일 발송
  for (let i = 0; i < emailList.length; i++) {
    try {
      MailApp.sendEmail({
        to: emailList[i],
        subject: `[와줄래] 신규 요청 도착 (${workType})`,
        body: emailBody
      });
      Logger.log(`이메일 발송 성공: ${emailList[i]}`);
    } catch (error) {
      Logger.log(`이메일 발송 실패: ${emailList[i]}, 오류: ${error}`);
    }
  }

  Logger.log(`총 ${emailList.length}명의 기사에게 알림 발송 완료`);
}

// ========================================
// 2. API: 요청 정보 조회 (GET)
// ========================================
function doGet(e) {
  try {
    const requestId = e.parameter.requestId;
    
    if (!requestId) {
      return createJsonResponse({
        error: "요청 ID가 필요합니다"
      });
    }

    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // 헤더 제외하고 요청ID로 찾기
    let requestRow = null;
    let rowIndex = -1;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === requestId) {  // A열: 요청ID
        requestRow = data[i];
        rowIndex = i;
        break;
      }
    }
    
    if (!requestRow) {
      return createJsonResponse({
        error: "요청을 찾을 수 없습니다"
      });
    }
    
    // 데이터 구조 (실제 시트 열에 맞춤)
    const response = {
      requestId: requestRow[0],           // A열: 요청ID
      timestamp: requestRow[1],           // B열: 타임스탬프
      customerName: requestRow[2],        // C열: 이름
      phone: requestRow[3],               // D열: 연락처
      residenceType: requestRow[4],       // E열: 거주 형태
      workType: requestRow[5],            // F열: 작업 형태
      imageUrl: requestRow[6],            // G열: 사진/동영상
      symptom: requestRow[7],             // H열: 자세한 증상
      address: requestRow[8],             // I열: 대략적인 주소
      detailAddress: requestRow[9],       // J열: 세부 주소
      preferredDate: requestRow[10],      // K열: 작업 희망 날짜
      preferredTime: requestRow[11],      // L열: 원하는 작업 시간
      additionalRequest: requestRow[12],  // M열: 추가 요청 사항
      status: requestRow[13] || "대기중", // N열: 매칭 상태
      matchedTime: requestRow[14],        // O열: 매칭 시각
      matchedEngineer: requestRow[15]     // P열: 매칭된 기사
    };
    
    return createJsonResponse(response);
    
  } catch (error) {
    Logger.log("doGet 오류: " + error);
    return createJsonResponse({
      error: "서버 오류가 발생했습니다: " + error.toString()
    });
  }
}

// ========================================
// 3. API: 작업 수락 처리 (POST)
// ========================================
function doPost(e) {
  const lock = LockService.getScriptLock();
  
  try {
    // 5초간 락 획득 시도 (동시 접근 방지)
    if (!lock.tryLock(5000)) {
      return createJsonResponse({
        success: false,
        message: "다른 처리가 진행 중입니다. 잠시 후 다시 시도해주세요."
      });
    }
    
    const params = JSON.parse(e.postData.contents);
    const requestId = params.requestId;
    const engineerName = params.engineerName;
    const engineerEmail = params.engineerEmail;
    
    if (!requestId || !engineerName) {
      return createJsonResponse({
        success: false,
        message: "필수 정보가 누락되었습니다"
      });
    }
    
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // 요청 찾기
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === requestId) {
        rowIndex = i + 1; // 시트는 1부터 시작
        break;
      }
    }
    
    if (rowIndex === -1) {
      return createJsonResponse({
        success: false,
        message: "요청을 찾을 수 없습니다"
      });
    }
    
    // 이미 매칭되었는지 확인
    const currentStatus = sheet.getRange(rowIndex, 14).getValue();  // N열: 매칭 상태
    if (currentStatus === "매칭완료") {
      const matchedEngineer = sheet.getRange(rowIndex, 16).getValue();  // P열: 매칭된 기사
      return createJsonResponse({
        success: false,
        message: `이미 ${matchedEngineer}님께 배정되었습니다`
      });
    }
    
    // 매칭 처리
    const matchTime = new Date();
    sheet.getRange(rowIndex, 14).setValue("매칭완료");     // N열: 매칭 상태
    sheet.getRange(rowIndex, 15).setValue(matchTime);      // O열: 매칭 시각
    sheet.getRange(rowIndex, 16).setValue(engineerName);   // P열: 매칭된 기사
    
    // 고객 정보 가져오기
    const customerName = data[rowIndex - 1][2];         // C열: 이름
    const customerPhone = data[rowIndex - 1][3];        // D열: 연락처
    const customerEmail = "";  // 이메일이 없으면 빈 값
    const workType = data[rowIndex - 1][5];             // F열: 작업 형태
    const symptom = data[rowIndex - 1][7];              // H열: 자세한 증상
    const address = data[rowIndex - 1][8];              // I열: 대략적인 주소
    const detailAddress = data[rowIndex - 1][9];        // J열: 세부 주소
    
    // 알림 발송
    sendMatchingNotifications({
      requestId,
      engineerName,
      engineerEmail,
      customerName,
      customerPhone,
      customerEmail,
      workType,
      symptom,
      address,
      detailAddress
    });
    
    return createJsonResponse({
      success: true,
      message: "작업이 배정되었습니다!",
      customerPhone: customerPhone,
      detailAddress: detailAddress
    });
    
  } catch (error) {
    Logger.log("doPost 오류: " + error);
    return createJsonResponse({
      success: false,
      message: "처리 중 오류가 발생했습니다: " + error.toString()
    });
    
  } finally {
    lock.releaseLock();
  }
}

// ========================================
// 유틸리티 함수
// ========================================

// JSON 응답 생성
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// 매칭 완료 알림 발송
function sendMatchingNotifications(info) {
  // 1. 기사에게 알림
  if (info.engineerEmail) {
    const engineerBody = `
━━━━━━━━━━━━━━━━━━━━━━
   ✅ 작업 배정 완료
━━━━━━━━━━━━━━━━━━━━━━

${info.engineerName}님, 작업이 배정되었습니다!

📋 요청 ID: ${info.requestId}
🛠 작업 내용: ${info.workType}
📝 증상: ${info.symptom}
📍 주소: ${info.address}
🏠 세부 주소: ${info.detailAddress}

👤 고객 정보
• 이름: ${info.customerName}
• 연락처: ${info.customerPhone}

━━━━━━━━━━━━━━━━━━━━━━
※ 고객님께 빠른 시일 내에 연락 부탁드립니다.
━━━━━━━━━━━━━━━━━━━━━━
`;
    
    try {
      MailApp.sendEmail({
        to: info.engineerEmail,
        subject: `[와줄래] 작업 배정 완료 - ${info.workType}`,
        body: engineerBody
      });
      Logger.log(`기사 알림 발송 성공: ${info.engineerEmail}`);
    } catch (error) {
      Logger.log(`기사 알림 발송 실패: ${error}`);
    }
  }
  
  // 2. 고객에게 알림 (선택적)
  if (info.customerEmail) {
    const customerBody = `
━━━━━━━━━━━━━━━━━━━━━━
   ✅ 기사님 배정 완료
━━━━━━━━━━━━━━━━━━━━━━

${info.customerName}님, 안녕하세요!

요청하신 작업에 전문 기사님이 배정되었습니다.

🛠 작업 내용: ${info.workType}
👨‍🔧 배정 기사: ${info.engineerName}

곧 기사님께서 연락드릴 예정입니다.

━━━━━━━━━━━━━━━━━━━━━━
감사합니다.
와줄래 드림
━━━━━━━━━━━━━━━━━━━━━━
`;
    
    try {
      MailApp.sendEmail({
        to: info.customerEmail,
        subject: `[와줄래] 기사님 배정 완료`,
        body: customerBody
      });
      Logger.log(`고객 알림 발송 성공: ${info.customerEmail}`);
    } catch (error) {
      Logger.log(`고객 알림 발송 실패: ${error}`);
    }
  }
}
