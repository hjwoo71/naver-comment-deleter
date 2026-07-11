const $ = (id) => document.getElementById(id);
const startBtn = $("start");
const stopBtn  = $("stop");
const stateEl  = $("state");
const countEl  = $("count");

// ---------- 후원 화면 토글 ----------
$("open-donate").addEventListener("click", () => {
  $("main-view").classList.add("hidden");
  $("donate-view").classList.add("active");
});
$("close-donate").addEventListener("click", () => {
  $("donate-view").classList.remove("active");
  $("main-view").classList.remove("hidden");
});
// -----------------------------------

// ---------- QR 이미지 로드 실패 시 안내 표시 (CSP: onerror 속성 금지 → JS로) ----------
function showQrMissing(img, path) {
  const div = document.createElement("div");
  div.className = "qr-missing";
  div.textContent = path + " 파일을 넣어주세요";
  img.replaceWith(div);
}
$("qr-kakao").addEventListener("error", (e) =>
  showQrMissing(e.target, "assets/kakaopay-qr.png"));
$("qr-toss").addEventListener("error", (e) =>
  showQrMissing(e.target, "assets/toss-qr.jpg"));
// -----------------------------------------------------------------------------

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// Run `func` in the page's MAIN world in every frame, then aggregate {running, count}.
async function inMain(tab, func) {
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    world: "MAIN",
    func,
  });
  let agg = { running: false, count: 0 };
  for (const r of results || []) {
    const v = r?.result;
    if (!v) continue;
    if (v.running) agg.running = true;
    if (typeof v.count === "number") agg.count = Math.max(agg.count, v.count);
  }
  return agg;
}

function applyStatus({ running, count }) {
  stateEl.textContent = running ? "실행 중…" : "대기";
  countEl.textContent = String(count ?? 0);
  startBtn.disabled = !!running;
  stopBtn.disabled  = !running;
}

// ---- functions injected into the page's MAIN world ----
function START_FN() {
  if (window.__ncdTimer) return { running: true, count: window.__ncdCount || 0 };
  if (window.__ncdCount == null) window.__ncdCount = 0;
  if (!window.__ncdOrigConfirm) window.__ncdOrigConfirm = window.confirm;
  window.confirm = () => true;

  window.__ncdTimer = setInterval(() => {
    const del = document.querySelector(".u_cbox_btn_delete");
    if (del) { del.click(); window.__ncdCount++; return; }
    const more = document.querySelector(
      ".u_cbox_paginate.is_more_button > a, a.u_cbox_btn_more, .u_cbox_paginate a"
    );
    if (more) { more.click(); return; }
    clearInterval(window.__ncdTimer);
    window.__ncdTimer = null;
    if (window.__ncdOrigConfirm) {
      window.confirm = window.__ncdOrigConfirm;
      window.__ncdOrigConfirm = null;
    }
    console.log("[네이버 뉴스 댓글 자동삭제] 완료:", window.__ncdCount, "건");
  }, 600);
  return { running: true, count: window.__ncdCount };
}

function STOP_FN() {
  if (window.__ncdTimer) { clearInterval(window.__ncdTimer); window.__ncdTimer = null; }
  if (window.__ncdOrigConfirm) {
    window.confirm = window.__ncdOrigConfirm;
    window.__ncdOrigConfirm = null;
  }
  return { running: false, count: window.__ncdCount || 0 };
}

function STATUS_FN() {
  return { running: !!window.__ncdTimer, count: window.__ncdCount || 0 };
}
// -------------------------------------------------------

async function refreshUi() {
  const tab = await getActiveTab();
  if (!tab?.url || !/naver\.com/.test(tab.url)) {
    stateEl.textContent = "네이버 페이지가 아닙니다";
    startBtn.disabled = true;
    stopBtn.disabled  = true;
    return;
  }
  try {
    applyStatus(await inMain(tab, STATUS_FN));
  } catch (e) {
    stateEl.textContent = "권한 부족 또는 페이지 미로드";
  }
}

startBtn.addEventListener("click", async () => {
  const tab = await getActiveTab();
  applyStatus(await inMain(tab, START_FN));
});

stopBtn.addEventListener("click", async () => {
  const tab = await getActiveTab();
  applyStatus(await inMain(tab, STOP_FN));
});

const poll = setInterval(refreshUi, 500);
window.addEventListener("unload", () => clearInterval(poll));

refreshUi();
