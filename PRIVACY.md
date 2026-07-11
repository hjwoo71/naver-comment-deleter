# 개인정보처리방침 / Privacy Policy

**확장 이름**: 네이버 뉴스 댓글 자동삭제
**버전**: 1.0.1
**개발자**: 우현재 (brixon.woo@gmail.com)
**최종 업데이트**: 2026-07-11

---

## 한국어

### 1. 개인정보 수집 여부

본 확장 프로그램(이하 "본 확장")은 **어떠한 개인정보도 수집하지 않습니다.**

- 사용자의 이름, 이메일, 아이디, 비밀번호 등 개인 식별 정보를 수집하지 않습니다.
- 사용자의 브라우저 활동 이력, 검색 기록, 방문한 웹사이트 등을 수집하지 않습니다.
- 사용자가 삭제한 댓글의 내용이나 개수 등 어떠한 사용 데이터도 수집하지 않습니다.

### 2. 외부 전송 여부

본 확장은 **어떤 데이터도 외부 서버로 전송하지 않습니다.**

- 개발자 또는 제3자의 서버와 통신하지 않습니다.
- 분석 도구(Google Analytics 등)를 사용하지 않습니다.
- 광고 네트워크를 사용하지 않습니다.

### 3. 로컬 저장 여부

본 확장은 브라우저의 로컬 저장소(`chrome.storage` 등)를 **사용하지 않습니다.**

- 삭제 진행 상황은 페이지가 열려 있는 동안에만 메모리에 임시 저장되며, 페이지를 닫으면 사라집니다.

### 4. 확장 권한 사용 목적

본 확장이 요청하는 권한은 오직 다음 목적에만 사용됩니다:

| 권한 | 사용 목적 |
|------|----------|
| `scripting` | 사용자가 팝업의 "시작" 버튼을 눌렀을 때, 네이버 뉴스 페이지의 삭제 버튼을 자동 클릭하는 스크립트를 주입 |
| `activeTab` | 현재 활성 탭이 네이버 뉴스 페이지인지 확인 |
| `host_permissions: *://*.naver.com/*` | 네이버 도메인 페이지에서만 스크립트를 실행 (다른 사이트에서는 동작하지 않음) |

### 5. 삭제 대상

본 확장은 **사용자 본인이 작성한 본인 계정의 댓글만** 삭제 대상으로 합니다. 타인의 댓글을 삭제할 수 없습니다 (네이버 서비스 자체가 본인 댓글만 삭제 권한을 부여함).

### 6. 문의

개인정보 처리 관련 문의는 다음으로 연락 주세요:
- 이메일: brixon.woo@gmail.com

---

## English

### 1. Data Collection

This extension **does not collect any personal data.**

- No name, email, ID, password, or other personally identifiable information is collected.
- No browsing history, search history, or visited websites are collected.
- No usage data such as deleted comment content or count is collected.

### 2. Data Transmission

This extension **does not transmit any data to external servers.**

- No communication with developer servers or third-party services.
- No analytics tools (Google Analytics, etc.).
- No advertising networks.

### 3. Local Storage

This extension **does not use browser local storage** (`chrome.storage`, etc.).

- Deletion progress is held only in page memory during operation and is cleared when the page closes.

### 4. Permission Usage

Requested permissions are used solely for the following purposes:

| Permission | Purpose |
|------------|---------|
| `scripting` | To inject the auto-click script into Naver News pages when the user clicks "Start" in the popup |
| `activeTab` | To check whether the currently active tab is a Naver News page |
| `host_permissions: *://*.naver.com/*` | To restrict script execution to Naver domain pages only |

### 5. Scope of Deletion

This extension can only delete **comments authored by the currently logged-in user**. It cannot delete other users' comments (Naver's own service restricts deletion to the comment author).

### 6. Contact

For privacy-related inquiries, please contact:
- Email: brixon.woo@gmail.com
