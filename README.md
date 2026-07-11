# 네이버 뉴스 댓글 자동삭제 (Chrome Extension)

네이버 뉴스의 "내 댓글 모음" 창에 표시되는 **본인 댓글을 순차적으로 자동 삭제**해주는 Chrome 확장 프로그램입니다.

## 사용법

1. 네이버 뉴스 기사 URL 뒤에 `#user_comment` 를 붙여서 접속
   예: `https://n.news.naver.com/article/000/0000000000#user_comment`
2. 우측에 "뉴스 댓글모음" 창이 열리면 툴바의 확장 아이콘 클릭
3. 팝업의 **[시작]** 버튼 클릭 → 삭제 버튼을 반복 클릭
4. 언제든 **[중지]** 버튼으로 중단 가능
5. 삭제할 댓글이 더 이상 없으면 자동 종료

## 설치 (개발자 모드로 로드)

1. 이 저장소의 [Releases](https://github.com/hjwoo71/naver-comment-deleter/releases)에서 최신 zip 다운로드
2. zip 압축 해제
3. Chrome 주소창에 `chrome://extensions` 입력
4. 우측 상단 **개발자 모드** 토글 켜기
5. **압축해제된 확장 프로그램 로드** 클릭 → 압축 해제한 폴더 선택

Chrome 웹 스토어 등록 후에는 스토어 링크로 대체됩니다.

## 동작 원리

- 600ms마다 다음을 반복:
  1. `.u_cbox_btn_delete` (삭제 버튼)이 보이면 클릭
  2. 없으면 `.u_cbox_paginate` (더보기)를 클릭
  3. 둘 다 없으면 자동 종료
- `window.confirm` 을 임시로 오버라이드 → "댓글을 삭제하시겠습니까?" 다이얼로그 자동 승인
- 중지 시 원래 함수로 복원 (부작용 없음)
- Chrome 확장의 **MAIN world**에 주입해 페이지 실제 window에 반영

## 파일 구조

```
naver-comment-deleter/
├─ manifest.json          Manifest V3
├─ popup.html             팝업 UI
├─ popup.js               팝업 로직 + 페이지 주입
├─ icons/                 확장 아이콘 (16/48/128)
├─ assets/                후원 QR 이미지
├─ PRIVACY.md             개인정보처리방침
├─ privacy-policy.html    웹 게시용 (GitHub Pages)
└─ CWS_LISTING.md         Chrome 웹 스토어 등록 자료
```

## 주의

- **삭제된 댓글은 되돌릴 수 없습니다.** 신중히 사용하세요.
- 네이버가 UI를 변경하면 셀렉터(`.u_cbox_btn_delete`)가 안 먹힐 수 있습니다. 이슈로 알려주세요.
- **본인 계정으로 로그인한 상태에서 본인 댓글만** 삭제 가능합니다 (네이버 서비스 제약).

## 개인정보처리방침

이 확장은 어떠한 데이터도 수집·저장·전송하지 않습니다. 자세한 내용은 [PRIVACY.md](PRIVACY.md) 또는 [privacy-policy.html](https://hjwoo71.github.io/naver-comment-deleter/privacy-policy.html)를 참고하세요.

## 개발자 응원 ☕

이 확장이 도움이 되셨다면 팝업 하단의 **☕ 개발자 응원하기** 버튼을 통해 카카오페이/토스로 자유롭게 후원해 주실 수 있습니다.

## 라이선스

MIT License. 자세한 내용은 [LICENSE](LICENSE) 참고.
