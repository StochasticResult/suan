const LIUYAO_NAMES = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const TRIGRAM_META = [
  { name: "乾", symbol: "天", element: "金", binary: "111" },
  { name: "兑", symbol: "泽", element: "金", binary: "110" },
  { name: "离", symbol: "火", element: "火", binary: "101" },
  { name: "震", symbol: "雷", element: "木", binary: "011" },
  { name: "巽", symbol: "风", element: "木", binary: "010" },
  { name: "坎", symbol: "水", element: "水", binary: "100" },
  { name: "艮", symbol: "山", element: "土", binary: "001" },
  { name: "坤", symbol: "地", element: "土", binary: "000" }
];
const SHICHEN_NAMES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ICHING_DATA_URL = "./data/iching.json";
const HEXAGRAM_NAME_MATRIX = [
  ["乾", "履", "同人", "无妄", "姤", "讼", "遁", "否"],
  ["夬", "兑", "革", "随", "大过", "困", "咸", "萃"],
  ["大有", "睽", "离", "噬嗑", "鼎", "未济", "旅", "晋"],
  ["大壮", "归妹", "丰", "震", "恒", "解", "小过", "豫"],
  ["小畜", "中孚", "家人", "益", "巽", "涣", "渐", "观"],
  ["需", "节", "既济", "屯", "井", "习坎", "蹇", "比"],
  ["大畜", "损", "贲", "颐", "蛊", "蒙", "艮", "剥"],
  ["泰", "临", "明夷", "复", "升", "师", "谦", "坤"]
];
const LIU_YAO_HEXAGRAM_MAP = {
  // 乾宫
  "111111": { name: "乾为天", element: "金", shi: 6, ying: 3, palace: "乾", inner: "乾", outer: "乾", structure: "本宫" },
  "011111": { name: "天风姤", element: "金", shi: 1, ying: 4, palace: "乾", inner: "巽", outer: "乾", structure: "" },
  "001111": { name: "天山遁", element: "金", shi: 2, ying: 5, palace: "乾", inner: "艮", outer: "乾", structure: "" },
  "000111": { name: "天地否", element: "金", shi: 3, ying: 6, palace: "乾", inner: "坤", outer: "乾", structure: "" },
  "000011": { name: "风地观", element: "金", shi: 4, ying: 1, palace: "乾", inner: "坤", outer: "巽", structure: "" },
  "000001": { name: "山地剥", element: "金", shi: 5, ying: 2, palace: "乾", inner: "坤", outer: "艮", structure: "" },
  "000101": { name: "火地晋", element: "金", shi: 4, ying: 1, palace: "乾", inner: "坤", outer: "离", structure: "游魂" },
  "111101": { name: "火天大有", element: "金", shi: 3, ying: 6, palace: "乾", inner: "乾", outer: "离", structure: "归魂" },
  // 坎宫
  "010010": { name: "坎为水", element: "水", shi: 6, ying: 3, palace: "坎", inner: "坎", outer: "坎", structure: "本宫" },
  "110010": { name: "水泽节", element: "水", shi: 1, ying: 4, palace: "坎", inner: "兑", outer: "坎", structure: "" },
  "100010": { name: "水雷屯", element: "水", shi: 2, ying: 5, palace: "坎", inner: "震", outer: "坎", structure: "" },
  "101010": { name: "水火既济", element: "水", shi: 3, ying: 6, palace: "坎", inner: "离", outer: "坎", structure: "" },
  "101110": { name: "泽火革", element: "水", shi: 4, ying: 1, palace: "坎", inner: "离", outer: "兑", structure: "" },
  "101100": { name: "雷火丰", element: "水", shi: 5, ying: 2, palace: "坎", inner: "离", outer: "震", structure: "" },
  "101000": { name: "地火明夷", element: "水", shi: 4, ying: 1, palace: "坎", inner: "离", outer: "坤", structure: "游魂" },
  "010000": { name: "地水师", element: "水", shi: 3, ying: 6, palace: "坎", inner: "坤", outer: "坎", structure: "归魂" },
  // 艮宫
  "001001": { name: "艮为山", element: "土", shi: 6, ying: 3, palace: "艮", inner: "艮", outer: "艮", structure: "本宫" },
  "101001": { name: "山火贲", element: "土", shi: 1, ying: 4, palace: "艮", inner: "离", outer: "艮", structure: "" },
  "111001": { name: "山天大畜", element: "土", shi: 2, ying: 5, palace: "艮", inner: "乾", outer: "艮", structure: "" },
  "110001": { name: "山泽损", element: "土", shi: 3, ying: 6, palace: "艮", inner: "兑", outer: "艮", structure: "" },
  "110101": { name: "火泽睽", element: "土", shi: 4, ying: 1, palace: "艮", inner: "兑", outer: "离", structure: "" },
  "110111": { name: "天泽履", element: "土", shi: 5, ying: 2, palace: "艮", inner: "兑", outer: "乾", structure: "" },
  "110011": { name: "风泽中孚", element: "土", shi: 4, ying: 1, palace: "艮", inner: "兑", outer: "巽", structure: "游魂" },
  "001011": { name: "风山渐", element: "土", shi: 3, ying: 6, palace: "艮", inner: "艮", outer: "巽", structure: "归魂" },
  // 震宫
  "100100": { name: "震为雷", element: "木", shi: 6, ying: 3, palace: "震", inner: "震", outer: "震", structure: "本宫" },
  "000100": { name: "雷地豫", element: "木", shi: 1, ying: 4, palace: "震", inner: "坤", outer: "震", structure: "" },
  "010100": { name: "雷水解", element: "木", shi: 2, ying: 5, palace: "震", inner: "坎", outer: "震", structure: "" },
  "011100": { name: "雷风恒", element: "木", shi: 3, ying: 6, palace: "震", inner: "巽", outer: "震", structure: "" },
  "011000": { name: "地风升", element: "木", shi: 4, ying: 1, palace: "震", inner: "巽", outer: "坤", structure: "" },
  "011010": { name: "水风井", element: "木", shi: 5, ying: 2, palace: "震", inner: "巽", outer: "坎", structure: "" },
  "011110": { name: "泽风大过", element: "木", shi: 4, ying: 1, palace: "震", inner: "巽", outer: "兑", structure: "游魂" },
  "100110": { name: "泽雷随", element: "木", shi: 3, ying: 6, palace: "震", inner: "震", outer: "兑", structure: "归魂" },
  // 巽宫
  "011011": { name: "巽为风", element: "木", shi: 6, ying: 3, palace: "巽", inner: "巽", outer: "巽", structure: "本宫" },
  "111011": { name: "风天小畜", element: "木", shi: 1, ying: 4, palace: "巽", inner: "乾", outer: "巽", structure: "" },
  "101011": { name: "风火家人", element: "木", shi: 2, ying: 5, palace: "巽", inner: "离", outer: "巽", structure: "" },
  "100011": { name: "风雷益", element: "木", shi: 3, ying: 6, palace: "巽", inner: "震", outer: "巽", structure: "" },
  "100111": { name: "天雷无妄", element: "木", shi: 4, ying: 1, palace: "巽", inner: "乾", outer: "震", structure: "" },
  "100101": { name: "火雷噬嗑", element: "木", shi: 5, ying: 2, palace: "巽", inner: "震", outer: "离", structure: "" },
  "100001": { name: "山雷颐", element: "木", shi: 4, ying: 1, palace: "巽", inner: "震", outer: "艮", structure: "游魂" },
  "011001": { name: "山风蛊", element: "木", shi: 3, ying: 6, palace: "巽", inner: "巽", outer: "艮", structure: "归魂" },
  // 离宫
  "101101": { name: "离为火", element: "火", shi: 6, ying: 3, palace: "离", inner: "离", outer: "离", structure: "本宫" },
  "001101": { name: "火山旅", element: "火", shi: 1, ying: 4, palace: "离", inner: "艮", outer: "离", structure: "" },
  "011101": { name: "火风鼎", element: "火", shi: 2, ying: 5, palace: "离", inner: "巽", outer: "离", structure: "" },
  "010101": { name: "火水未济", element: "火", shi: 3, ying: 6, palace: "离", inner: "坎", outer: "离", structure: "" },
  "010001": { name: "山水蒙", element: "火", shi: 4, ying: 1, palace: "离", inner: "坎", outer: "艮", structure: "" },
  "010011": { name: "风水涣", element: "火", shi: 5, ying: 2, palace: "离", inner: "巽", outer: "坎", structure: "" },
  "010111": { name: "天水讼", element: "火", shi: 4, ying: 1, palace: "离", inner: "乾", outer: "坎", structure: "游魂" },
  "101111": { name: "天火同人", element: "火", shi: 3, ying: 6, palace: "离", inner: "乾", outer: "离", structure: "归魂" },
  // 坤宫
  "000000": { name: "坤为地", element: "土", shi: 6, ying: 3, palace: "坤", inner: "坤", outer: "坤", structure: "本宫" },
  "100000": { name: "地雷复", element: "土", shi: 1, ying: 4, palace: "坤", inner: "震", outer: "坤", structure: "" },
  "110000": { name: "地泽临", element: "土", shi: 2, ying: 5, palace: "坤", inner: "兑", outer: "坤", structure: "" },
  "111000": { name: "地天泰", element: "土", shi: 3, ying: 6, palace: "坤", inner: "乾", outer: "坤", structure: "" },
  "111100": { name: "雷天大壮", element: "土", shi: 4, ying: 1, palace: "坤", inner: "乾", outer: "震", structure: "" },
  "111110": { name: "泽天夬", element: "土", shi: 5, ying: 2, palace: "坤", inner: "乾", outer: "兑", structure: "" },
  "111010": { name: "水天需", element: "土", shi: 4, ying: 1, palace: "坤", inner: "乾", outer: "坎", structure: "游魂" },
  "000010": { name: "水地比", element: "土", shi: 3, ying: 6, palace: "坤", inner: "坤", outer: "坎", structure: "归魂" },
  // 兑宫
  "110110": { name: "兑为泽", element: "金", shi: 6, ying: 3, palace: "兑", inner: "兑", outer: "兑", structure: "本宫" },
  "010110": { name: "泽水困", element: "金", shi: 1, ying: 4, palace: "兑", inner: "坎", outer: "兑", structure: "" },
  "000110": { name: "泽地萃", element: "金", shi: 2, ying: 5, palace: "兑", inner: "坤", outer: "兑", structure: "" },
  "001110": { name: "泽山咸", element: "金", shi: 3, ying: 6, palace: "兑", inner: "艮", outer: "兑", structure: "" },
  "001010": { name: "水山蹇", element: "金", shi: 4, ying: 1, palace: "兑", inner: "艮", outer: "坎", structure: "" },
  "001000": { name: "地山谦", element: "金", shi: 5, ying: 2, palace: "兑", inner: "艮", outer: "坤", structure: "" },
  "001100": { name: "雷山小过", element: "金", shi: 4, ying: 1, palace: "兑", inner: "艮", outer: "震", structure: "游魂" },
  "110100": { name: "雷泽归妹", element: "金", shi: 3, ying: 6, palace: "兑", inner: "震", outer: "兑", structure: "归魂" }
};
const PALACE_BRANCH_PATTERNS = {
  乾: ["子", "寅", "辰", "午", "申", "戌"],
  坎: ["寅", "辰", "午", "申", "戌", "子"],
  艮: ["辰", "午", "申", "戌", "子", "寅"],
  震: ["子", "寅", "辰", "午", "申", "戌"],
  巽: ["丑", "亥", "酉", "未", "巳", "卯"],
  离: ["卯", "丑", "亥", "酉", "未", "巳"],
  坤: ["未", "巳", "卯", "丑", "亥", "酉"],
  兑: ["巳", "卯", "丑", "亥", "酉", "未"]
};
const PALACE_STEM_PATTERNS = {
  乾: ["甲", "甲", "甲", "壬", "壬", "壬"],
  坎: ["戊", "戊", "戊", "戊", "戊", "戊"],
  艮: ["丙", "丙", "丙", "丙", "丙", "丙"],
  震: ["庚", "庚", "庚", "庚", "庚", "庚"],
  巽: ["辛", "辛", "辛", "辛", "辛", "辛"],
  离: ["己", "己", "己", "己", "己", "己"],
  坤: ["乙", "乙", "乙", "癸", "癸", "癸"],
  兑: ["丁", "丁", "丁", "丁", "丁", "丁"]
};
const DAY_STEM_TO_SPIRIT_START = { 甲: 0, 乙: 0, 丙: 1, 丁: 1, 戊: 2, 己: 3, 庚: 4, 辛: 4, 壬: 5, 癸: 5 };
const SIX_SPIRITS = ["青龙", "朱雀", "勾陈", "螣蛇", "白虎", "玄武"];
const BRANCH_FIVE_ELEMENTS = { 子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水" };
const FIVE_ELEMENT_INDEX = { 木: 0, 火: 1, 土: 2, 金: 3, 水: 4 };
const PALACE_BASE_CODE = { 乾: "111111", 坎: "010010", 艮: "001001", 震: "100100", 巽: "011011", 离: "101101", 坤: "000000", 兑: "110110" };
const STORAGE_KEY = "bazi_records_v3";
const FIXED_DAY_SECT = 2;
const FIXED_YUN_SECT = 2;
const SHENSHA_PROFILE_NAME = "子平通行口径（渊海子平/三命通会系）";
const QUESTION_PROFILE = {
  general: { label: "综合", yongShen: ["官鬼", "妻财", "父母", "子孙", "兄弟"] },
  career: { label: "事业/工作", yongShen: ["官鬼", "父母"] },
  wealth: { label: "财运/投资", yongShen: ["妻财", "子孙"] },
  love: { label: "感情/婚恋", yongShen: ["妻财", "官鬼", "子孙"] },
  health: { label: "健康", yongShen: ["官鬼", "子孙", "父母"] },
  travel: { label: "出行/迁移", yongShen: ["父母", "子孙", "兄弟"] }
};

const tabBazi = document.getElementById("tab-bazi");
const tabLiuyao = document.getElementById("tab-liuyao");
const panelBazi = document.getElementById("panel-bazi");
const panelLiuyao = document.getElementById("panel-liuyao");

const baziForm = document.getElementById("bazi-form");
const baziResult = document.getElementById("bazi-result");
const baziFlowPanel = document.getElementById("bazi-flow-panel");
const baziFlowResult = document.getElementById("bazi-flow-result");
const baziDayunSelect = document.getElementById("bz-dayun-select");
const baziLiuNianSelect = document.getElementById("bz-liunian-select");
const baziLiuYueSelect = document.getElementById("bz-liuyue-select");
const baziLiuRiSelect = document.getElementById("bz-liuri-select");
const baziRecordList = document.getElementById("bazi-record-list");
const clearBaziBtn = document.getElementById("clear-bazi-records");

const liuyaoForm = document.getElementById("liuyao-form");
const liuyaoResult = document.getElementById("liuyao-result");
const lyMovingMode = document.getElementById("ly-moving-mode");
const lyQuestionType = document.getElementById("ly-question-type");
const lyViewMode = document.getElementById("ly-view-mode");
const lyTimeSourceWrap = document.getElementById("ly-time-source-wrap");
const lyTimeSource = document.getElementById("ly-time-source");
const lyManualTimeWrap = document.getElementById("ly-manual-time-wrap");
const lyManualTime = document.getElementById("ly-manual-time");
const lyInputMode = document.getElementById("ly-input-mode");
const lyNumbersWrap = document.getElementById("ly-numbers-wrap");
const lyCoinsWrap = document.getElementById("ly-coins-wrap");
const lyModeNoteNumbers = document.getElementById("ly-mode-note-numbers");
const lyModeNoteCoins = document.getElementById("ly-mode-note-coins");

let currentChartData = null;
let currentRecord = null;
let currentLiuYaoText = "";
let currentLiuYaoJson = null;
let ichingDataMap = new Map();

setupTabs();
setupFlowEvents();
setupLiuyaoForm();
initializeIChingTexts();
runAccuracySelfCheck();
loadBaziRecords();

baziForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!ensureLunarReady()) return;

  const name = document.getElementById("bz-name").value.trim() || "未命名";
  const genderText = document.getElementById("bz-gender").value;
  const date = document.getElementById("bz-date").value;
  const time = document.getElementById("bz-time").value;
  const calendar = document.getElementById("bz-calendar").value;
  const daySect = FIXED_DAY_SECT;
  const yunSect = FIXED_YUN_SECT;

  if (!date || !time) {
    alert("请先填写出生日期和出生时间。");
    return;
  }

  const [year, month, day] = date.split("-").map((v) => Number(v));
  const [hour, minute] = time.split(":").map((v) => Number(v));
  const record = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name,
    gender: genderText,
    genderNum: genderText === "男" ? 1 : 0,
    calendar,
    daySect,
    yunSect,
    birthYmdHm: { year, month, day, hour, minute, second: 0 },
    birthText: `${date} ${time}`,
    createdAt: new Date().toISOString()
  };

  const chartData = buildChartData(record);
  if (!chartData) return;

  currentRecord = record;
  currentChartData = chartData;
  renderBaziResult(record, chartData);
  renderFlowPanel(chartData);
  saveBaziRecord(record);
  loadBaziRecords();
});

baziRecordList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("[data-record-id]");
  if (!button) return;
  if (!ensureLunarReady()) return;

  const recordId = button.getAttribute("data-record-id");
  const record = readBaziRecords().find((item) => item.id === recordId);
  if (!record) return;

  const normalized = normalizeRecord(record);
  const chartData = buildChartData(normalized);
  if (!chartData) return;

  currentRecord = normalized;
  currentChartData = chartData;
  renderBaziResult(normalized, chartData);
  renderFlowPanel(chartData);
});

clearBaziBtn.addEventListener("click", () => {
  const ok = confirm("确认清空所有八字记录？此操作不可撤销。");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  currentRecord = null;
  currentChartData = null;
  baziResult.classList.add("hidden");
  baziFlowPanel.classList.add("hidden");
  loadBaziRecords();
});

liuyaoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const movingMode = lyMovingMode.value;
  const questionType = lyQuestionType.value;
  const viewMode = lyViewMode.value;
  const inputMode = lyInputMode.value;

  let timeInfo = null;
  let liuyaoDate = new Date();
  if (movingMode === "number-with-time") {
    const source = lyTimeSource.value;
    let dateObj = null;
    if (source === "now") {
      dateObj = new Date();
    } else {
      if (!lyManualTime.value) {
        alert("请选择手动时间。");
        return;
      }
      dateObj = new Date(lyManualTime.value);
      if (Number.isNaN(dateObj.getTime())) {
        alert("手动时间无效，请重新选择。");
        return;
      }
    }
    liuyaoDate = dateObj;
    timeInfo = buildTimeInfo(dateObj, source);
  }

  if (inputMode === "numbers") {
    const n1 = Number(document.getElementById("ly-num-1").value);
    const n2 = Number(document.getElementById("ly-num-2").value);
    if (!Number.isInteger(n1) || !Number.isInteger(n2)) {
      alert("请输入两个整数。");
      return;
    }
    const chart = calcLiuyaoChart(n1, n2, { movingMode, timeInfo });
    renderLiuyaoResult(chart, liuyaoDate, {
      questionType,
      viewMode,
      inputMeta: { kind: "numbers", n1, n2 }
    });
    return;
  }

  const coinTotals = [];
  for (let i = 1; i <= 6; i += 1) {
    const sel = document.getElementById(`ly-coin-${i}`);
    const raw = sel ? sel.value : "";
    if (raw === "" || raw === null) {
      alert("请先从初爻到上爻完成六次钱币抛掷。");
      return;
    }
    coinTotals.push(Number(raw));
  }
  for (const t of coinTotals) {
    if (![6, 7, 8, 9].includes(t)) {
      alert("每笔爻的和只能为 6、7、8、9（三枚硬币合计）。");
      return;
    }
  }

  const chart = calcLiuyaoChartFromCoins(coinTotals, { movingMode, timeInfo });
  renderLiuyaoResult(chart, liuyaoDate, {
    questionType,
    viewMode,
    inputMeta: { kind: "coins", coinTotals }
  });
});

liuyaoResult.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const msg = document.getElementById("copy-liuyao-msg");

  if (target.id === "copy-liuyao-btn") {
    if (!currentLiuYaoText) return;
    const ok = await copyText(currentLiuYaoText);
    if (msg) msg.textContent = ok ? "已复制文本" : "复制失败";
    return;
  }

  if (target.id === "download-liuyao-txt") {
    if (!currentLiuYaoText) return;
    downloadFile(`六爻排盘_${Date.now()}.txt`, "text/plain;charset=utf-8", currentLiuYaoText);
    if (msg) msg.textContent = "已导出 TXT";
    return;
  }

  if (target.id === "download-liuyao-json") {
    if (!currentLiuYaoJson) return;
    downloadFile(
      `六爻排盘_${Date.now()}.json`,
      "application/json;charset=utf-8",
      JSON.stringify(currentLiuYaoJson, null, 2)
    );
    if (msg) msg.textContent = "已导出 JSON";
    return;
  }

  if (target.id === "download-liuyao-image") {
    (async () => {
      if (msg) msg.textContent = "正在生成图片…";
      const ok = await exportLiuyaoAsImage();
      if (msg) msg.textContent = ok ? "已导出排盘图" : "导出图片失败";
    })();
  }
});

function ensureLunarReady() {
  if (typeof Solar === "undefined") {
    alert("历法库加载失败，请检查网络后刷新页面。");
    return false;
  }
  return true;
}

function setupTabs() {
  tabBazi.addEventListener("click", () => switchTab("bazi"));
  tabLiuyao.addEventListener("click", () => switchTab("liuyao"));
}

function setupLiuyaoForm() {
  const now = new Date();
  lyManualTime.value = toDateTimeLocal(now);
  lyMovingMode.addEventListener("change", syncLiuyaoTimeFields);
  lyTimeSource.addEventListener("change", syncLiuyaoTimeFields);
  syncLiuyaoTimeFields();
  populateLiuyaoCoinSelects();
  lyCoinsWrap.addEventListener("click", handleLiuyaoCoinClick);
  lyInputMode.addEventListener("change", syncLiuyaoInputMode);
  syncLiuyaoInputMode();
}

function populateLiuyaoCoinSelects() {
  for (let i = 1; i <= 6; i += 1) {
    setCoinFacesForLine(i, ["背", "背", "背"]);
  }
}

function handleLiuyaoCoinClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.id === "ly-coins-reset") {
    populateLiuyaoCoinSelects();
    return;
  }

  const button = target.closest("[data-coin-face]");
  if (!button) return;
  const line = Number(button.getAttribute("data-coin-line"));
  const index = Number(button.getAttribute("data-coin-index"));
  if (!Number.isInteger(line) || !Number.isInteger(index) || line < 1 || line > 6 || index < 0 || index > 2) return;
  flipCoinFace(line, index);
}

function flipCoinFace(line, index) {
  const faces = getCoinFacesForLine(line);
  faces[index] = faces[index] === "字" ? "背" : "字";
  setCoinFacesForLine(line, faces);
}

function setCoinFacesForLine(line, faces) {
  const hiddenInput = document.getElementById(`ly-coin-${line}`);
  const resultEl = document.getElementById(`ly-coin-result-${line}`);
  const facesEl = document.getElementById(`ly-coin-faces-${line}`);
  if (!hiddenInput || !resultEl || !facesEl) return;
  const total = faces.reduce((sum, face) => sum + (face === "字" ? 3 : 2), 0);
  const label = { 6: "老阴·动", 7: "少阳", 8: "少阴", 9: "老阳·动" }[total] || "";
  hiddenInput.value = String(total);
  hiddenInput.dataset.faces = faces.join("");
  renderCoinFaces(facesEl, faces, line);
  resultEl.textContent = `${total}（${label}）`;
  resultEl.classList.add("ready");
}

function getCoinFacesForLine(line) {
  const hiddenInput = document.getElementById(`ly-coin-${line}`);
  const raw = hiddenInput?.dataset?.faces || "背背背";
  return Array.from(raw).slice(0, 3).map((face) => (face === "字" ? "字" : "背"));
}

function renderCoinFaces(container, faces, line) {
  container.innerHTML = faces
    .map((face, index) => {
      const cls = face === "字" ? " is-yang" : face === "背" ? " is-yin" : "";
      return `<button class="coin${cls}" type="button" data-coin-line="${line}" data-coin-index="${index}" data-coin-face="${escapeHTML(face)}">${escapeHTML(face)}</button>`;
    })
    .join("");
}

function syncLiuyaoInputMode() {
  const coins = lyInputMode.value === "coins";
  if (lyCoinsWrap) lyCoinsWrap.classList.toggle("hidden", !coins);
  if (lyNumbersWrap) lyNumbersWrap.classList.toggle("hidden", coins);
  if (lyModeNoteNumbers) lyModeNoteNumbers.classList.toggle("hidden", coins);
  if (lyModeNoteCoins) lyModeNoteCoins.classList.toggle("hidden", !coins);
}

function syncLiuyaoTimeFields() {
  const needTime = lyMovingMode.value === "number-with-time";
  lyTimeSourceWrap.classList.toggle("hidden", !needTime);
  const manual = needTime && lyTimeSource.value === "manual";
  lyManualTimeWrap.classList.toggle("hidden", !manual);
}

function switchTab(target) {
  const isBazi = target === "bazi";
  tabBazi.classList.toggle("active", isBazi);
  tabLiuyao.classList.toggle("active", !isBazi);
  panelBazi.classList.toggle("active", isBazi);
  panelLiuyao.classList.toggle("active", !isBazi);
}

function setupFlowEvents() {
  baziDayunSelect.addEventListener("change", () => {
    if (!currentChartData) return;
    populateLiuNianSelect(currentChartData);
    populateLiuYueSelect(currentChartData);
    populateLiuRiSelect(currentChartData);
    renderFlowFocus(currentChartData);
  });
  baziLiuNianSelect.addEventListener("change", () => {
    if (!currentChartData) return;
    populateLiuYueSelect(currentChartData);
    populateLiuRiSelect(currentChartData);
    renderFlowFocus(currentChartData);
  });
  baziLiuYueSelect.addEventListener("change", () => {
    if (!currentChartData) return;
    populateLiuRiSelect(currentChartData);
    renderFlowFocus(currentChartData);
  });
  baziLiuRiSelect.addEventListener("change", () => {
    if (!currentChartData) return;
    renderFlowFocus(currentChartData);
  });
}

function buildChartData(record) {
  try {
    const birth = normalizeBirth(record);
    const solar = Solar.fromYmdHms(
      birth.year,
      birth.month,
      birth.day,
      birth.hour,
      birth.minute,
      birth.second
    );
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();
    if (typeof eightChar.setSect === "function") {
      eightChar.setSect(record.daySect);
    }
    const yun = eightChar.getYun(record.genderNum, record.yunSect);
    const dayunList = safeCallList(yun, "getDaYun", 9);

    const dayMasterGan = safeCall(eightChar, "getDayGan", "");
    const natal = {
      yearZhi: safeCall(eightChar, "getYearZhi", ""),
      monthZhi: safeCall(eightChar, "getMonthZhi", ""),
      dayZhi: safeCall(eightChar, "getDayZhi", "")
    };
    return {
      solar,
      lunar,
      eightChar,
      yun,
      dayunList,
      dayMasterGan,
      natal
    };
  } catch (error) {
    console.error(error);
    alert("排盘失败，请检查输入数据。");
    return null;
  }
}

function renderBaziResult(record, chartData) {
  const { solar, lunar, eightChar, yun } = chartData;
  const birth = normalizeBirth(record);
  const birthText = `${birth.year}-${String(birth.month).padStart(2, "0")}-${String(birth.day).padStart(2, "0")} ${String(birth.hour).padStart(2, "0")}:${String(birth.minute).padStart(2, "0")}`;

  const tenGodRow = [
    safeCall(eightChar, "getYearShiShenGan", "-"),
    safeCall(eightChar, "getMonthShiShenGan", "-"),
    safeCall(eightChar, "getDayShiShenGan", "日主"),
    safeCall(eightChar, "getTimeShiShenGan", "-")
  ];

  const ganRow = [
    safeCall(eightChar, "getYearGan", "-"),
    safeCall(eightChar, "getMonthGan", "-"),
    safeCall(eightChar, "getDayGan", "-"),
    safeCall(eightChar, "getTimeGan", "-")
  ];

  const zhiRow = [
    safeCall(eightChar, "getYearZhi", "-"),
    safeCall(eightChar, "getMonthZhi", "-"),
    safeCall(eightChar, "getDayZhi", "-"),
    safeCall(eightChar, "getTimeZhi", "-")
  ];

  const hideRow = [
    formatArray(safeCall(eightChar, "getYearHideGan", [])),
    formatArray(safeCall(eightChar, "getMonthHideGan", [])),
    formatArray(safeCall(eightChar, "getDayHideGan", [])),
    formatArray(safeCall(eightChar, "getTimeHideGan", []))
  ];

  const naYinRow = [
    safeCall(eightChar, "getYearNaYin", "-"),
    safeCall(eightChar, "getMonthNaYin", "-"),
    safeCall(eightChar, "getDayNaYin", "-"),
    safeCall(eightChar, "getTimeNaYin", "-")
  ];

  const xunKongRow = [
    safeCall(eightChar, "getYearXunKong", "-"),
    safeCall(eightChar, "getMonthXunKong", "-"),
    safeCall(eightChar, "getDayXunKong", "-"),
    safeCall(eightChar, "getTimeXunKong", "-")
  ];

  baziResult.classList.remove("hidden");
  baziResult.innerHTML = `
    <h4>${escapeHTML(record.name)} · ${record.gender}</h4>
    <p class="bazi-summary">出生：${birthText}（${record.calendar}）｜四柱：${safeCall(eightChar, "toString", "-")}</p>
    <div class="meta-lines">
      <p>节气历：${safeCall(lunar, "toFullString", "-")}</p>
      <p>命宫：${safeCall(eightChar, "getMingGong", "-")} ｜ 身宫：${safeCall(eightChar, "getShenGong", "-")}</p>
      <p>起运：${safeCall(yun, "getStartYear", 0)}年${safeCall(yun, "getStartMonth", 0)}月${safeCall(yun, "getStartDay", 0)}天 ｜ 交运日：${safeCallObjYmd(yun, "getStartSolar")}</p>
      <p>口径：北京时间输入 ｜ 晚子时次日 ｜ 按分钟起运</p>
    </div>
    <table class="line-table">
      <thead>
        <tr><th>项目</th><th>年柱</th><th>月柱</th><th>日柱</th><th>时柱</th></tr>
      </thead>
      <tbody>
        <tr><td>十神</td><td>${tenGodRow[0]}</td><td>${tenGodRow[1]}</td><td>${tenGodRow[2]}</td><td>${tenGodRow[3]}</td></tr>
        <tr><td>天干</td><td>${ganRow[0]}</td><td>${ganRow[1]}</td><td>${ganRow[2]}</td><td>${ganRow[3]}</td></tr>
        <tr><td>地支</td><td>${zhiRow[0]}</td><td>${zhiRow[1]}</td><td>${zhiRow[2]}</td><td>${zhiRow[3]}</td></tr>
        <tr><td>藏干</td><td>${hideRow[0]}</td><td>${hideRow[1]}</td><td>${hideRow[2]}</td><td>${hideRow[3]}</td></tr>
        <tr><td>纳音</td><td>${naYinRow[0]}</td><td>${naYinRow[1]}</td><td>${naYinRow[2]}</td><td>${naYinRow[3]}</td></tr>
        <tr><td>旬空</td><td>${xunKongRow[0]}</td><td>${xunKongRow[1]}</td><td>${xunKongRow[2]}</td><td>${xunKongRow[3]}</td></tr>
      </tbody>
    </table>
  `;
}

function renderFlowPanel(chartData) {
  baziFlowPanel.classList.remove("hidden");
  populateDaYunSelect(chartData);
  populateLiuNianSelect(chartData);
  populateLiuYueSelect(chartData);
  populateLiuRiSelect(chartData);
  renderFlowFocus(chartData);
}

function populateDaYunSelect(chartData) {
  baziDayunSelect.innerHTML = chartData.dayunList
    .map((dy, index) => {
      const gz = safeCall(dy, "getGanZhi", "童限");
      const startYear = safeCall(dy, "getStartYear", "-");
      const endYear = safeCall(dy, "getEndYear", "-");
      const startAge = safeCall(dy, "getStartAge", "-");
      const endAge = safeCall(dy, "getEndAge", "-");
      return `<option value="${index}">${gz}（${startYear}-${endYear} / ${startAge}-${endAge}岁）</option>`;
    })
    .join("");
}

function populateLiuNianSelect(chartData) {
  const dayunIndex = Number(baziDayunSelect.value || "0");
  const dayun = chartData.dayunList[dayunIndex];
  const liuNianList = safeCallList(dayun, "getLiuNian", 10);
  baziLiuNianSelect.innerHTML = liuNianList
    .map((ln, index) => {
      const year = safeCall(ln, "getYear", "-");
      const gz = safeCall(ln, "getGanZhi", "-");
      return `<option value="${index}">${year}年（${gz}）</option>`;
    })
    .join("");
}

function populateLiuYueSelect(chartData) {
  const liuNian = getCurrentLiuNian(chartData);
  const liuYueList = safeCallList(liuNian, "getLiuYue");
  baziLiuYueSelect.innerHTML = liuYueList
    .map((ly, index) => {
      const month = safeCall(ly, "getMonth", index + 1);
      const gz = safeCall(ly, "getGanZhi", "-");
      return `<option value="${index}">${month}月（${gz}）</option>`;
    })
    .join("");
}

function populateLiuRiSelect(chartData) {
  const liuYue = getCurrentLiuYue(chartData);
  const liuRiList = safeCallList(liuYue, "getLiuRi");

  // 优先使用历法库原生流日，确保与大运/流年/流月链路同口径。
  if (liuRiList.length) {
    baziLiuRiSelect.innerHTML = liuRiList
      .map((lr, index) => {
        const day = safeCall(lr, "getDay", index + 1);
        const gz = safeCall(lr, "getGanZhi", "-");
        return `<option value="${index}">${day}日（${gz}）</option>`;
      })
      .join("");
    return;
  }

  // 兜底：库无流日接口时，按该流年月逐日换算。
  const liuNian = getCurrentLiuNian(chartData);
  const year = Number(safeCall(liuNian, "getYear", 0));
  const month = Number(safeCall(liuYue, "getMonth", 1));
  const days = new Date(year, month, 0).getDate();
  const options = [];
  for (let day = 1; day <= days; day += 1) {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    const gz = safeCall(
      lunar,
      "getDayInGanZhiExact2",
      safeCall(lunar, "getDayInGanZhiExact", safeCall(lunar, "getDayInGanZhi", "-"))
    );
    options.push(`<option value="${day}">${day}日（${gz}）</option>`);
  }
  baziLiuRiSelect.innerHTML = options.join("");
}

function getCurrentLiuNian(chartData) {
  const dayunIndex = Number(baziDayunSelect.value || "0");
  const dayun = chartData.dayunList[dayunIndex];
  const liuNianList = safeCallList(dayun, "getLiuNian", 10);
  const liuNianIndex = Number(baziLiuNianSelect.value || "0");
  return liuNianList[liuNianIndex];
}

function getCurrentLiuYue(chartData) {
  const liuNian = getCurrentLiuNian(chartData);
  const liuYueList = safeCallList(liuNian, "getLiuYue");
  const liuYueIndex = Number(baziLiuYueSelect.value || "0");
  return liuYueList[liuYueIndex];
}

function renderFlowFocus(chartData) {
  const dayMasterGan = chartData.dayMasterGan;
  const natal = chartData.natal;
  const dayunIndex = Number(baziDayunSelect.value || "0");
  const dayun = chartData.dayunList[dayunIndex];
  const liuNian = getCurrentLiuNian(chartData);
  const liuYue = getCurrentLiuYue(chartData);
  const year = Number(safeCall(liuNian, "getYear", 0));
  const month = Number(safeCall(liuYue, "getMonth", 1));
  const liuRiList = safeCallList(liuYue, "getLiuRi");

  let day = 1;
  let liuRiGz = "-";
  let liuRiNaYin = "-";
  let liuRiXunKong = "-";

  if (liuRiList.length) {
    const liuRiIndex = Number(baziLiuRiSelect.value || "0");
    const liuRi = liuRiList[liuRiIndex];
    day = Number(safeCall(liuRi, "getDay", 1));
    liuRiGz = safeCall(liuRi, "getGanZhi", "-");
    liuRiNaYin = safeCall(liuRi, "getNaYin", "-");
    liuRiXunKong = safeCall(liuRi, "getXunKong", "-");
  } else {
    day = Number(baziLiuRiSelect.value || "1");
    const liuRiSolar = Solar.fromYmd(year, month, day);
    const liuRiLunar = liuRiSolar.getLunar();
    liuRiGz = safeCall(
      liuRiLunar,
      "getDayInGanZhiExact2",
      safeCall(liuRiLunar, "getDayInGanZhiExact", safeCall(liuRiLunar, "getDayInGanZhi", "-"))
    );
    liuRiNaYin = safeCall(liuRiLunar, "getNaYin", "-");
    liuRiXunKong = safeCall(liuRiLunar, "getDayXunKong", "-");
  }

  const dayunGz = safeCall(dayun, "getGanZhi", "-");
  const liuNianGz = safeCall(liuNian, "getGanZhi", "-");
  const liuYueGz = safeCall(liuYue, "getGanZhi", "-");

  const attentionItems = [
    { label: "年柱", gz: safeCall(chartData.eightChar, "getYear", "") },
    { label: "月柱", gz: safeCall(chartData.eightChar, "getMonth", "") },
    { label: "日柱", gz: safeCall(chartData.eightChar, "getDay", "") },
    { label: "时柱", gz: safeCall(chartData.eightChar, "getTime", "") },
    { label: "大运", gz: dayunGz },
    { label: "流年", gz: liuNianGz },
    { label: "流月", gz: liuYueGz },
    { label: "流日", gz: liuRiGz }
  ];
  const attention = calcGanZhiAttention(attentionItems);

  const dayunShenSha = calcShenSha(dayMasterGan, natal, dayunGz, "大运");
  const liuNianShenSha = calcShenSha(dayMasterGan, natal, liuNianGz, "流年");
  const liuYueShenSha = calcShenSha(dayMasterGan, natal, liuYueGz, "流月");
  const liuRiShenSha = calcShenSha(dayMasterGan, natal, liuRiGz, "流日");

  baziFlowResult.innerHTML = `
    <p class="grid-title">当前焦点</p>
    <div class="focus-row">
      选择：${dayunGz}大运 ｜ ${year}年 ${liuNianGz} ｜ ${month}月 ${liuYueGz} ｜ ${day}日 ${liuRiGz}
    </div>
    <p><strong>神煞规则：</strong>${SHENSHA_PROFILE_NAME}</p>
    <table class="line-table">
      <thead>
        <tr><th>层级</th><th>干支</th><th>十神（相对日主${dayMasterGan}）</th><th>纳音</th><th>旬空</th></tr>
      </thead>
      <tbody>
        <tr><td>大运</td><td>${dayunGz}</td><td>${tenGodFromGz(dayMasterGan, dayunGz)}</td><td>${safeCall(dayun, "getNaYin", "-")}</td><td>${safeCall(dayun, "getXunKong", "-")}</td></tr>
        <tr><td>流年</td><td>${liuNianGz}</td><td>${tenGodFromGz(dayMasterGan, liuNianGz)}</td><td>${safeCall(liuNian, "getNaYin", "-")}</td><td>${safeCall(liuNian, "getXunKong", "-")}</td></tr>
        <tr><td>流月</td><td>${liuYueGz}</td><td>${tenGodFromGz(dayMasterGan, liuYueGz)}</td><td>${safeCall(liuYue, "getNaYin", "-")}</td><td>${safeCall(liuYue, "getXunKong", "-")}</td></tr>
        <tr><td>流日</td><td>${liuRiGz}</td><td>${tenGodFromGz(dayMasterGan, liuRiGz)}</td><td>${liuRiNaYin}</td><td>${liuRiXunKong}</td></tr>
      </tbody>
    </table>
    <p><strong>天干留意：</strong>${attention.gan.join("；") || "无"}</p>
    <p><strong>地支留意：</strong>${attention.zhi.join("；") || "无"}</p>
    <p><strong>大运神煞：</strong>${dayunShenSha.join("，") || "无"}</p>
    <p><strong>流年神煞：</strong>${liuNianShenSha.join("，") || "无"}</p>
    <p><strong>流月神煞：</strong>${liuYueShenSha.join("，") || "无"}</p>
    <p><strong>流日神煞：</strong>${liuRiShenSha.join("，") || "无"}</p>
  `;
}

function loadBaziRecords() {
  const records = readBaziRecords().map(normalizeRecord);
  if (!records.length) {
    baziRecordList.innerHTML = "<li class='record-item'>暂无记录</li>";
    return;
  }
  baziRecordList.innerHTML = records
    .map((record) => {
      const b = normalizeBirth(record);
      const birthText = `${b.year}-${String(b.month).padStart(2, "0")}-${String(b.day).padStart(2, "0")} ${String(b.hour).padStart(2, "0")}:${String(b.minute).padStart(2, "0")}`;
      return `
        <li class="record-item">
          <p class="record-title">${escapeHTML(record.name)} · ${record.gender}</p>
          <p>出生：${birthText} ｜ 固定精算口径</p>
          <p style="margin-top:8px;">
            <button type="button" data-record-id="${record.id}">查看此盘</button>
          </p>
        </li>
      `;
    })
    .join("");
}

function normalizeRecord(record) {
  const gender = record.gender === "女" ? "女" : "男";
  const genderNum = gender === "男" ? 1 : 0;
  const normalizedBirth = normalizeBirth(record);
  return {
    ...record,
    gender,
    genderNum,
    daySect: Number(record.daySect) === 1 ? 1 : 2,
    yunSect: Number(record.yunSect) === 1 ? 1 : 2,
    birthYmdHm: normalizedBirth
  };
}

function normalizeBirth(record) {
  if (record && record.birthYmdHm) {
    const b = record.birthYmdHm;
    return {
      year: Number(b.year),
      month: Number(b.month),
      day: Number(b.day),
      hour: Number(b.hour),
      minute: Number(b.minute),
      second: Number(b.second ?? 0)
    };
  }
  // 兼容旧记录
  const d = new Date(record.birthISO);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds()
  };
}

function saveBaziRecord(record) {
  const records = readBaziRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function readBaziRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("读取八字记录失败：", error);
    return [];
  }
}

function safeCall(obj, methodName, fallback) {
  try {
    if (obj && typeof obj[methodName] === "function") {
      const value = obj[methodName]();
      return value ?? fallback;
    }
    return fallback;
  } catch (_) {
    return fallback;
  }
}

function safeCallObjYmd(obj, methodName) {
  try {
    if (obj && typeof obj[methodName] === "function") {
      const solar = obj[methodName]();
      if (solar && typeof solar.toYmdHms === "function") return solar.toYmdHms();
      if (solar && typeof solar.toYmd === "function") return solar.toYmd();
    }
  } catch (_) {}
  return "-";
}

function safeCallList(obj, methodName, arg) {
  try {
    if (!obj || typeof obj[methodName] !== "function") return [];
    const value = arg === undefined ? obj[methodName]() : obj[methodName](arg);
    return Array.isArray(value) ? value : [];
  } catch (_) {
    return [];
  }
}

function runAccuracySelfCheck() {
  if (!ensureLunarReady()) return;
  try {
    let failed = false;
    const cases = [
      {
        // 来自 lunar-javascript 官方测试 Yun.test.js
        solar: [1981, 1, 29, 23, 37, 0],
        genderNum: 0,
        yunSect: 1,
        expectedStartSolar: "1989-02-18"
      },
      {
        // 来自 lunar-javascript 官方测试 Yun.test.js
        solar: [2018, 6, 11, 9, 30, 0],
        genderNum: 0,
        yunSect: 2,
        expectedStartSolar: "2020-03-21"
      }
    ];
    for (const c of cases) {
      const solar = Solar.fromYmdHms(c.solar[0], c.solar[1], c.solar[2], c.solar[3], c.solar[4], c.solar[5]);
      const eightChar = solar.getLunar().getEightChar();
      const yun = eightChar.getYun(c.genderNum, c.yunSect);
      const got = safeCallObjYmd(yun, "getStartSolar").slice(0, 10);
      if (got !== c.expectedStartSolar) {
        failed = true;
      }
    }

    // 六爻核心回归：确保基础起卦不漂移
    const liuyaoCase = calcLiuyaoChart(12, 34, { movingMode: "number-only", timeInfo: null });
    if (!(liuyaoCase.upper === "巽" && liuyaoCase.lower === "离" && liuyaoCase.movingLine === 4)) {
      failed = true;
    }
    const allOldYang = calcLiuyaoChartFromCoins([9, 9, 9, 9, 9, 9], { movingMode: "number-only", timeInfo: null });
    if (!(allOldYang.mainCode === "111111" && allOldYang.changedCode === "000000" && allOldYang.movingLines.length === 6)) {
      failed = true;
    }
    if (getHexagramInfo("乾", "兑").shortName !== "履" || getHexagramInfo("艮", "坎").shortName !== "蒙") {
      failed = true;
    }

    if (failed) {
      alert("排盘核心自检未通过，请勿用于精算。建议刷新或检查发布文件完整性。");
      return;
    }
  } catch (e) {
    console.error(e);
    alert("历法引擎自检异常，请勿用于精算。");
  }
}

function formatArray(arr) {
  return Array.isArray(arr) && arr.length ? arr.join(" ") : "-";
}

function tenGodFromGz(dayMasterGan, gz) {
  if (!dayMasterGan || !gz || gz.length < 1) return "-";
  const targetGan = gz.charAt(0);
  const dmIndex = STEMS.indexOf(dayMasterGan);
  const tgIndex = STEMS.indexOf(targetGan);
  if (dmIndex < 0 || tgIndex < 0) return "-";

  const elemOrder = ["木", "火", "土", "金", "水"];
  const dmElem = elemOrder.indexOf(elementByStemIndex(dmIndex));
  const tgElem = elemOrder.indexOf(elementByStemIndex(tgIndex));
  const samePolarity = dmIndex % 2 === tgIndex % 2;

  if (dmElem === tgElem) return samePolarity ? "比肩" : "劫财";
  if ((dmElem + 1) % 5 === tgElem) return samePolarity ? "食神" : "伤官";
  if ((dmElem + 2) % 5 === tgElem) return samePolarity ? "偏财" : "正财";
  if ((dmElem + 3) % 5 === tgElem) return samePolarity ? "七杀" : "正官";
  return samePolarity ? "偏印" : "正印";
}

function elementByStemIndex(stemIndex) {
  if (stemIndex === 0 || stemIndex === 1) return "木";
  if (stemIndex === 2 || stemIndex === 3) return "火";
  if (stemIndex === 4 || stemIndex === 5) return "土";
  if (stemIndex === 6 || stemIndex === 7) return "金";
  return "水";
}

function parseGanZhi(gzText) {
  if (!gzText || gzText.length < 2) return { gan: "", zhi: "" };
  return { gan: gzText.charAt(0), zhi: gzText.charAt(1) };
}

function unorderedPair(a, b) {
  return a < b ? `${a}${b}` : `${b}${a}`;
}

function calcGanZhiAttention(items) {
  const ganRules = new Map([
    ["甲己", "甲己合土"],
    ["乙庚", "乙庚合金"],
    ["丙辛", "丙辛合水"],
    ["丁壬", "丁壬合木"],
    ["戊癸", "戊癸合火"],
    ["甲庚", "甲庚冲"],
    ["乙辛", "乙辛冲"],
    ["丙壬", "丙壬冲"],
    ["丁癸", "丁癸冲"]
  ]);
  const zhiRules = [
    ["子丑", "子丑合化土"],
    ["寅亥", "寅亥合化木"],
    ["卯戌", "卯戌合化火"],
    ["辰酉", "辰酉合化金"],
    ["巳申", "巳申合化水"],
    ["午未", "午未合化土"],
    ["子午", "子午相冲"],
    ["丑未", "丑未相冲"],
    ["寅申", "寅申相冲"],
    ["卯酉", "卯酉相冲"],
    ["辰戌", "辰戌相冲"],
    ["巳亥", "巳亥相冲"],
    ["子未", "子未相害"],
    ["丑午", "丑午相害"],
    ["寅巳", "寅巳相害"],
    ["卯辰", "卯辰相害"],
    ["申亥", "申亥相害"],
    ["酉戌", "酉戌相害"],
    ["子酉", "子酉相破"],
    ["丑辰", "辰丑相破"],
    ["寅亥", "寅亥相破"],
    ["卯午", "卯午相破"],
    ["申巳", "申巳相破"],
    ["未戌", "未戌相破"],
    ["寅午", "寅午暗合土"]
  ];

  const ganFound = new Set();
  const zhiFound = new Set();

  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      const a = parseGanZhi(items[i].gz);
      const b = parseGanZhi(items[j].gz);
      if (a.gan && b.gan) {
        const key = unorderedPair(a.gan, b.gan);
        const hit = ganRules.get(key);
        if (hit) ganFound.add(hit);
      }
      if (a.zhi && b.zhi) {
        const key = unorderedPair(a.zhi, b.zhi);
        for (const [rulePair, text] of zhiRules) {
          if (rulePair === key) zhiFound.add(text);
        }
      }
    }
  }
  return { gan: [...ganFound], zhi: [...zhiFound] };
}

function branchIndex(zhi) {
  return BRANCHES.indexOf(zhi);
}

function calcShenSha(dayGan, natal, targetGz, level) {
  const target = parseGanZhi(targetGz);
  if (!target.gan || !target.zhi) return [];

  const result = new Set();
  const addIf = (cond, name) => {
    if (cond) result.add(name);
  };

  // 子平通行口径：天乙贵人（按日干）
  const tianYiMap = {
    甲: ["丑", "未"],
    戊: ["丑", "未"],
    庚: ["丑", "未"],
    乙: ["子", "申"],
    己: ["子", "申"],
    丙: ["亥", "酉"],
    丁: ["亥", "酉"],
    壬: ["卯", "巳"],
    癸: ["卯", "巳"],
    辛: ["寅", "午"]
  };
  addIf((tianYiMap[dayGan] || []).includes(target.zhi), "天乙贵人");

  // 文昌贵人（按日干）
  const wenChangMap = { 甲: "巳", 乙: "午", 丙: "申", 丁: "酉", 戊: "申", 己: "酉", 庚: "亥", 辛: "子", 壬: "寅", 癸: "卯" };
  addIf(wenChangMap[dayGan] === target.zhi, "文昌贵人");

  // 禄神（按日干）
  const luMap = { 甲: "寅", 乙: "卯", 丙: "巳", 戊: "巳", 丁: "午", 己: "午", 庚: "申", 辛: "酉", 壬: "亥", 癸: "子" };
  addIf(luMap[dayGan] === target.zhi, "禄神");

  // 驿马（按年支）
  const yiMaMap = {
    申: "寅", 子: "寅", 辰: "寅",
    寅: "申", 午: "申", 戌: "申",
    巳: "亥", 酉: "亥", 丑: "亥",
    亥: "巳", 卯: "巳", 未: "巳"
  };
  addIf(yiMaMap[natal.yearZhi] === target.zhi, "驿马");

  // 灾煞（按年支）
  const zaiShaMap = {
    申: "午", 子: "午", 辰: "午",
    寅: "子", 午: "子", 戌: "子",
    亥: "酉", 卯: "酉", 未: "酉",
    巳: "卯", 酉: "卯", 丑: "卯"
  };
  addIf(zaiShaMap[natal.yearZhi] === target.zhi, "灾煞");

  // 丧门（按年支前2位）
  const yearIdx = branchIndex(natal.yearZhi);
  if (yearIdx >= 0) {
    const sangMen = BRANCHES[(yearIdx + 2) % 12];
    addIf(sangMen === target.zhi, "丧门");
  }

  // 寡宿（按年支）
  const guaSuMap = {
    亥: "戌", 子: "戌", 丑: "戌",
    寅: "丑", 卯: "丑", 辰: "丑",
    巳: "辰", 午: "辰", 未: "辰",
    申: "未", 酉: "未", 戌: "未"
  };
  addIf(guaSuMap[natal.yearZhi] === target.zhi, "寡宿");

  // 披麻（按年支）
  const piMaMap = {
    亥: "酉", 子: "酉", 丑: "酉",
    寅: "子", 卯: "子", 辰: "子",
    巳: "卯", 午: "卯", 未: "卯",
    申: "午", 酉: "午", 戌: "午"
  };
  addIf(piMaMap[natal.yearZhi] === target.zhi, "披麻");

  // 太极贵人（按日干）
  const taiJiMap = {
    甲: ["子", "午"], 乙: ["子", "午"],
    丙: ["卯", "酉"], 丁: ["卯", "酉"],
    戊: ["辰", "戌", "丑", "未"], 己: ["辰", "戌", "丑", "未"],
    庚: ["寅", "亥"], 辛: ["寅", "亥"],
    壬: ["巳", "申"], 癸: ["巳", "申"]
  };
  addIf((taiJiMap[dayGan] || []).includes(target.zhi), "太极贵人");

  // 月德贵人（按命盘月支）
  const yueDeMap = { 寅: "丙", 卯: "甲", 辰: "壬", 巳: "庚", 午: "丙", 未: "甲", 申: "壬", 酉: "庚", 戌: "丙", 亥: "甲", 子: "壬", 丑: "庚" };
  addIf(yueDeMap[natal.monthZhi] === target.gan, "月德贵人");

  // 天德贵人（按命盘月支）
  const tianDeMap = { 寅: "丁", 卯: "申", 辰: "壬", 巳: "辛", 午: "亥", 未: "甲", 申: "癸", 酉: "寅", 戌: "丙", 亥: "乙", 子: "巳", 丑: "庚" };
  addIf(tianDeMap[natal.monthZhi] === target.gan || tianDeMap[natal.monthZhi] === target.zhi, "天德贵人");

  // 天厨贵人（按日干）
  const tianChuMap = { 甲: "巳", 乙: "午", 丙: "子", 丁: "巳", 戊: "午", 己: "申", 庚: "寅", 辛: "卯", 壬: "巳", 癸: "午" };
  addIf(tianChuMap[dayGan] === target.zhi, "天厨贵人");

  // 你提供的示例偏向在流运层展示神煞，这里按层级过滤主展示集
  if (level === "大运") {
    return [...result].filter((s) => ["天乙贵人", "天德贵人", "寡宿", "披麻"].includes(s));
  }
  if (level === "流年") {
    return [...result].filter((s) => ["丧门", "天乙贵人", "太极贵人", "文昌贵人", "月德贵人", "灾煞"].includes(s));
  }
  if (level === "流月" || level === "流日") {
    return [...result].filter((s) => ["丧门", "天乙贵人", "天厨贵人", "太极贵人", "月德贵人", "禄神", "驿马"].includes(s));
  }
  return [...result];
}

function trigramBinary(idx) {
  const map = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 1],
    [0, 0, 0]
  ];
  return map[idx];
}

function trigramIndexFromBinary(bin) {
  const key = bin.join("");
  const lookup = { "111": 0, "110": 1, "101": 2, "011": 3, "010": 4, "100": 5, "001": 6, "000": 7 };
  return lookup[key];
}

/** 三钱法单笔和 6／7／8／9 → 阴阳画（7／9 为重阳面，6／8 为重阴面） */
function coinTotalToLineBit(total) {
  return total === 7 || total === 9 ? 1 : 0;
}

function completeLiuyaoChartFromLines(params) {
  const {
    baseLines,
    changedLines,
    movingSeed,
    movingLines,
    movingMode,
    timeInfo,
    inputKind
  } = params;
  const changedLower = changedLines.slice(0, 3);
  const changedUpper = changedLines.slice(3, 6);
  const huLower = [baseLines[1], baseLines[2], baseLines[3]];
  const huUpper = [baseLines[2], baseLines[3], baseLines[4]];
  const reversedLines = baseLines.slice().reverse();
  const zongLower = reversedLines.slice(0, 3);
  const zongUpper = reversedLines.slice(3, 6);
  const cuoLines = baseLines.map((line) => (line ? 0 : 1));
  const cuoLower = cuoLines.slice(0, 3);
  const cuoUpper = cuoLines.slice(3, 6);
  const upperBinThree = baseLines.slice(3, 6);
  const lowerBinThree = baseLines.slice(0, 3);
  const upperIdx = trigramIndexFromBinary(upperBinThree);
  const lowerIdx = trigramIndexFromBinary(lowerBinThree);
  const legacyMovingLine = movingLines.length ? movingLines[0] : 0;
  return {
    mainCode: baseLines.join(""),
    changedCode: changedLines.join(""),
    upper: LIUYAO_NAMES[upperIdx],
    lower: LIUYAO_NAMES[lowerIdx],
    movingLine: legacyMovingLine,
    movingLines: movingLines.slice(),
    movingMode,
    movingSeed,
    timeInfo,
    inputKind: inputKind || "numbers",
    changedUpper: LIUYAO_NAMES[trigramIndexFromBinary(changedUpper)],
    changedLower: LIUYAO_NAMES[trigramIndexFromBinary(changedLower)],
    huUpper: LIUYAO_NAMES[trigramIndexFromBinary(huUpper)],
    huLower: LIUYAO_NAMES[trigramIndexFromBinary(huLower)],
    zongUpper: LIUYAO_NAMES[trigramIndexFromBinary(zongUpper)],
    zongLower: LIUYAO_NAMES[trigramIndexFromBinary(zongLower)],
    cuoUpper: LIUYAO_NAMES[trigramIndexFromBinary(cuoUpper)],
    cuoLower: LIUYAO_NAMES[trigramIndexFromBinary(cuoLower)],
    baseLines,
    changedLines
  };
}

function calcLiuyaoChart(num1, num2, options = {}) {
  const movingMode = options.movingMode || "number-only";
  const timeInfo = options.timeInfo || null;
  const sum = Math.abs(num1) + Math.abs(num2);
  const upperIdx = Math.abs(num1) % 8;
  const lowerIdx = Math.abs(num2) % 8;
  const shichenNumber = timeInfo ? timeInfo.shichenNumber : 0;
  const movingSeed = movingMode === "number-with-time" ? sum + shichenNumber : sum;
  const movingLine = (movingSeed % 6) || 6;
  const movingLines = [movingLine];
  const upperBin = trigramBinary(upperIdx);
  const lowerBin = trigramBinary(lowerIdx);
  const baseLines = [...lowerBin, ...upperBin];
  const changedLines = baseLines.slice();
  changedLines[movingLine - 1] = changedLines[movingLine - 1] ? 0 : 1;
  return completeLiuyaoChartFromLines({
    baseLines,
    changedLines,
    movingSeed,
    movingLines,
    movingMode,
    timeInfo,
    inputKind: "numbers"
  });
}

function calcLiuyaoChartFromCoins(coinTotals, options = {}) {
  const movingMode = options.movingMode || "number-only";
  const timeInfo = options.timeInfo || null;
  if (!Array.isArray(coinTotals) || coinTotals.length !== 6) {
    throw new Error("coinTotals 须为长度 6 的数组");
  }
  const baseLines = coinTotals.map(coinTotalToLineBit);
  const changedLines = baseLines.slice();
  const movingLines = [];
  for (let i = 0; i < 6; i += 1) {
    const t = coinTotals[i];
    if (t === 6 || t === 9) {
      movingLines.push(i + 1);
      changedLines[i] = changedLines[i] ? 0 : 1;
    }
  }
  const movingSeed = coinTotals.reduce((acc, x) => acc + x, 0);
  return completeLiuyaoChartFromLines({
    baseLines,
    changedLines,
    movingSeed,
    movingLines,
    movingMode,
    timeInfo,
    inputKind: "coins"
  });
}

function renderLiuyaoResult(chart, liuyaoDate, options = {}) {
  const questionType = options.questionType || "general";
  const viewMode = options.viewMode || "simple";
  const inputMeta = options.inputMeta || { kind: "numbers", n1: "", n2: "" };
  const questionProfile = QUESTION_PROFILE[questionType] || QUESTION_PROFILE.general;
  const upperMeta = trigramMetaByName(chart.upper);
  const lowerMeta = trigramMetaByName(chart.lower);
  const changedUpperMeta = trigramMetaByName(chart.changedUpper);
  const changedLowerMeta = trigramMetaByName(chart.changedLower);
  const huUpperMeta = trigramMetaByName(chart.huUpper);
  const huLowerMeta = trigramMetaByName(chart.huLower);
  const zongUpperMeta = trigramMetaByName(chart.zongUpper);
  const zongLowerMeta = trigramMetaByName(chart.zongLower);
  const cuoUpperMeta = trigramMetaByName(chart.cuoUpper);
  const cuoLowerMeta = trigramMetaByName(chart.cuoLower);
  const benInfo = getHexagramInfo(chart.upper, chart.lower);
  const bianInfo = getHexagramInfo(chart.changedUpper, chart.changedLower);
  const huInfo = getHexagramInfo(chart.huUpper, chart.huLower);
  const zongInfo = getHexagramInfo(chart.zongUpper, chart.zongLower);
  const cuoInfo = getHexagramInfo(chart.cuoUpper, chart.cuoLower);
  const movers = chart.movingLines && chart.movingLines.length ? chart.movingLines : chart.movingLine ? [chart.movingLine] : [];
  const movingPillText =
    movers.length === 0 ? "无动爻（静卦）" : movers.length === 1 ? `第${movers[0]}爻` : `第${movers.join("、")}爻（${movers.length} 处）`;
  const inputLineHtml =
    inputMeta.kind === "coins"
      ? `<p>起卦方式：三枚钱币（自下而上六次合计：${escapeHTML(inputMeta.coinTotals.join("、"))}）</p>`
      : `<p>输入数字：${inputMeta.n1}，${inputMeta.n2}</p>`;
  const pro = buildProfessionalLiuYao(chart, liuyaoDate);
  const yongShenSuggestion = getYongShenSuggestion(questionType, pro);
  const interpretation = buildLiuyaoInterpretation({
    chart,
    questionType,
    benInfo,
    bianInfo,
    pro,
    yongShenSuggestion
  });

  const movingDesc =
    chart.inputKind === "coins"
      ? "三枚钱币法（六次合计定六爻与全部动爻）"
      : chart.movingMode === "number-with-time" && chart.timeInfo
        ? `两数字+时辰（${chart.timeInfo.shichenName}时，时辰数${chart.timeInfo.shichenNumber}）`
        : "仅两数字";
  const timeDesc =
    chart.timeInfo
      ? `${chart.timeInfo.sourceText}：${chart.timeInfo.displayTime}，推算时辰：${chart.timeInfo.shichenName}时`
      : "-";
  const paramDesc = chart.inputKind === "coins" ? `六次合计：${chart.movingSeed}` : `动爻计算数：${chart.movingSeed}`;

  const proOpen = viewMode === "pro" ? "open" : "";

  const yaoCiRows =
    movers.length === 0
      ? `<tr><td>动爻爻辞</td><td>无动爻（静卦）</td></tr>`
      : movers
          .map((pos) => {
            const ln = benInfo.lines[pos - 1];
            return `<tr><td>本卦第${pos}爻</td><td>${ln ? `${ln.name}：${ln.scripture}` : "-"}</td></tr>`;
          })
          .join("");

  liuyaoResult.classList.remove("hidden");
  liuyaoResult.innerHTML = `
    <h4>起卦结果</h4>
    ${inputLineHtml}
    <p>问事类型：${questionProfile.label}</p>
    <p>起卦规则：${movingDesc}</p>
    <p>起卦参数：${paramDesc}</p>
    <p>取时：${timeDesc}</p>
    <div class="pill-row">
      <span class="pill">本卦：${chart.upper}上${chart.lower}下</span>
      <span class="pill">周易：${benInfo.fullName}</span>
      <span class="pill">动爻：${movingPillText}</span>
      <span class="pill">变卦：${chart.changedUpper}上${chart.changedLower}下</span>
      <span class="pill">周易：${bianInfo.fullName}</span>
      <span class="pill">互卦：${chart.huUpper}上${chart.huLower}下</span>
      <span class="pill">综卦：${chart.zongUpper}上${chart.zongLower}下</span>
      <span class="pill">错卦：${chart.cuoUpper}上${chart.cuoLower}下</span>
    </div>
    <div class="focus-row">
      <p><strong>用神建议：</strong>${yongShenSuggestion.text}</p>
      <p><strong>综合提示：</strong>${interpretation.summary}</p>
      <p><strong>断语要点：</strong>${interpretation.bullets.join("；")}</p>
    </div>
    <table class="line-table">
      <thead>
        <tr><th>卦</th><th>上卦</th><th>下卦</th><th>周易卦名</th><th>卦象信息</th></tr>
      </thead>
      <tbody>
        <tr><td>本卦</td><td>${upperMeta.name}(${upperMeta.symbol}/${upperMeta.element}/${upperMeta.binary})</td><td>${lowerMeta.name}(${lowerMeta.symbol}/${lowerMeta.element}/${lowerMeta.binary})</td><td>${benInfo.fullName}</td><td>${benInfo.tip}</td></tr>
        <tr><td>变卦</td><td>${changedUpperMeta.name}(${changedUpperMeta.symbol}/${changedUpperMeta.element}/${changedUpperMeta.binary})</td><td>${changedLowerMeta.name}(${changedLowerMeta.symbol}/${changedLowerMeta.element}/${changedLowerMeta.binary})</td><td>${bianInfo.fullName}</td><td>${bianInfo.tip}</td></tr>
        <tr><td>互卦</td><td>${huUpperMeta.name}(${huUpperMeta.symbol}/${huUpperMeta.element}/${huUpperMeta.binary})</td><td>${huLowerMeta.name}(${huLowerMeta.symbol}/${huLowerMeta.element}/${huLowerMeta.binary})</td><td>${huInfo.fullName}</td><td>${huInfo.tip}</td></tr>
        <tr><td>综卦</td><td>${zongUpperMeta.name}(${zongUpperMeta.symbol}/${zongUpperMeta.element}/${zongUpperMeta.binary})</td><td>${zongLowerMeta.name}(${zongLowerMeta.symbol}/${zongLowerMeta.element}/${zongLowerMeta.binary})</td><td>${zongInfo.fullName}</td><td>${zongInfo.tip}</td></tr>
        <tr><td>错卦</td><td>${cuoUpperMeta.name}(${cuoUpperMeta.symbol}/${cuoUpperMeta.element}/${cuoUpperMeta.binary})</td><td>${cuoLowerMeta.name}(${cuoLowerMeta.symbol}/${cuoLowerMeta.element}/${cuoLowerMeta.binary})</td><td>${cuoInfo.fullName}</td><td>${cuoInfo.tip}</td></tr>
      </tbody>
    </table>
    <table class="line-table">
      <thead>
        <tr><th>层级</th><th>卦辞</th></tr>
      </thead>
      <tbody>
        <tr><td>本卦卦辞</td><td>${benInfo.scripture || "-"}</td></tr>
        <tr><td>变卦卦辞</td><td>${bianInfo.scripture || "-"}</td></tr>
        <tr><td>互卦卦辞</td><td>${huInfo.scripture || "-"}</td></tr>
        <tr><td>综卦卦辞</td><td>${zongInfo.scripture || "-"}</td></tr>
        <tr><td>错卦卦辞</td><td>${cuoInfo.scripture || "-"}</td></tr>
      </tbody>
    </table>
    <table class="line-table">
      <thead>
        <tr><th>重点爻辞</th><th>内容</th></tr>
      </thead>
      <tbody>
        ${yaoCiRows}
      </tbody>
    </table>
    <details ${proOpen}>
      <summary>专业盘（六神 / 纳甲 / 六亲 / 世应 / 伏神）</summary>
      <table class="line-table">
        <thead>
          <tr><th>爻位</th><th>六神</th><th>伏神</th><th>本卦(六亲/干支/五行/旺衰)</th><th>世应</th><th>变卦(六亲/干支/五行)</th></tr>
        </thead>
        <tbody>
          ${pro.lines
            .slice()
            .reverse()
            .map((line) => {
              return `<tr>
                <td>${line.position}</td>
                <td>${line.spirit}</td>
                <td>${line.hidden}</td>
                <td>${line.main}</td>
                <td>${line.shiYing}</td>
                <td>${line.changed}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
      <p>月建：${pro.monthBranch}｜日辰：${pro.dayGanzhi}｜旬空：${pro.dayXunKong}</p>
    </details>
    <table class="line-table">
      <thead>
        <tr><th>爻位（自下而上）</th><th>本卦</th><th>变卦</th><th>是否动爻</th></tr>
      </thead>
      <tbody>
        ${chart.baseLines
          .map((line, index) => {
            const changed = chart.changedLines[index];
            const baseText = line ? "阳爻（———）" : "阴爻（— —）";
            const changedText = changed ? "阳爻（———）" : "阴爻（— —）";
            const moving = movers.includes(index + 1) ? "是" : "否";
            return `<tr><td>${index + 1}</td><td>${baseText}</td><td>${changedText}</td><td>${moving}</td></tr>`;
          })
          .join("")}
      </tbody>
    </table>
    <div class="copy-actions">
      <button type="button" id="copy-liuyao-btn">复制全部信息</button>
      <button type="button" id="download-liuyao-txt">导出 TXT</button>
      <button type="button" id="download-liuyao-json">导出 JSON</button>
      <button type="button" id="download-liuyao-image">导出图片</button>
      <span id="copy-liuyao-msg"></span>
    </div>
  `;

  currentLiuYaoText = buildLiuyaoText({
    inputMeta,
    chart,
    upperMeta,
    lowerMeta,
    changedUpperMeta,
    changedLowerMeta,
    huUpperMeta,
    huLowerMeta,
    zongUpperMeta,
    zongLowerMeta,
    cuoUpperMeta,
    cuoLowerMeta,
    benInfo,
    bianInfo,
    huInfo,
    zongInfo,
    cuoInfo,
    pro
  });

  currentLiuYaoJson = {
    input:
      inputMeta.kind === "coins"
        ? {
            kind: "coins",
            coinTotals: inputMeta.coinTotals,
            questionType,
            questionLabel: questionProfile.label,
            movingMode: chart.movingMode,
            movingSeed: chart.movingSeed
          }
        : {
            kind: "numbers",
            n1: inputMeta.n1,
            n2: inputMeta.n2,
            questionType,
            questionLabel: questionProfile.label,
            movingMode: chart.movingMode,
            movingSeed: chart.movingSeed
          },
    time: chart.timeInfo || null,
    hexagrams: {
      ben: benInfo,
      bian: bianInfo,
      hu: huInfo,
      zong: zongInfo,
      cuo: cuoInfo
    },
    movingLines: movers,
    movingLine: chart.movingLine,
    interpretation,
    yongShenSuggestion,
    professional: pro,
    lines: chart.baseLines.map((line, index) => ({
      position: index + 1,
      base: line ? "阳" : "阴",
      changed: chart.changedLines[index] ? "阳" : "阴",
      moving: movers.includes(index + 1)
    }))
  };
}

function trigramMetaByName(name) {
  return TRIGRAM_META.find((item) => item.name === name) || { name, symbol: "-", element: "-", binary: "---" };
}

function buildLiuyaoText(payload) {
  const {
    inputMeta,
    chart,
    upperMeta,
    lowerMeta,
    changedUpperMeta,
    changedLowerMeta,
    huUpperMeta,
    huLowerMeta,
    zongUpperMeta,
    zongLowerMeta,
    cuoUpperMeta,
    cuoLowerMeta,
    benInfo,
    bianInfo,
    huInfo,
    zongInfo,
    cuoInfo,
    pro
  } = payload;
  const movers =
    chart.movingLines && chart.movingLines.length ? chart.movingLines : chart.movingLine ? [chart.movingLine] : [];
  const inputHead =
    inputMeta.kind === "coins"
      ? `起卦方式：三枚钱币，自下而上六次合计：${inputMeta.coinTotals.join("、")}`
      : `输入数字：${inputMeta.n1}，${inputMeta.n2}`;
  const movingModeLine =
    chart.inputKind === "coins"
      ? "起卦规则：三枚钱币法（六次合计定爻象与全部动爻）"
      : chart.movingMode === "number-with-time" && chart.timeInfo
        ? `起卦规则：两数字+时辰（${chart.timeInfo.shichenName}时，时辰数${chart.timeInfo.shichenNumber}）`
        : `起卦规则：仅两数字`;
  const yaoTextsForMoving = movers
    .map((pos) => {
      const ln = benInfo.lines[pos - 1];
      return ln ? `${ln.name}：${ln.scripture}` : `第${pos}爻：（无文本）`;
    })
    .join("；");

  const lines = chart.baseLines
    .map((line, index) => {
      const changed = chart.changedLines[index];
      const moving = movers.includes(index + 1) ? "动爻" : "";
      const baseText = line ? "阳爻(———)" : "阴爻(— —)";
      const changedText = changed ? "阳爻(———)" : "阴爻(— —)";
      return `第${index + 1}爻：本卦${baseText} -> 变卦${changedText} ${moving}`.trim();
    })
    .join("\n");

  return [
    "六爻排盘结果",
    inputHead,
    movingModeLine,
    `起卦参数：${chart.inputKind === "coins" ? `六次合计：${chart.movingSeed}` : `动爻计算数：${chart.movingSeed}`}`,
    `取时：${chart.timeInfo ? `${chart.timeInfo.sourceText}：${chart.timeInfo.displayTime}，推算时辰：${chart.timeInfo.shichenName}时` : "-"}`,
    `本卦：${chart.upper}上${chart.lower}下`,
    `周易本卦：${benInfo.fullName}（${benInfo.tip}）`,
    `本卦卦辞：${benInfo.scripture || "-"}`,
    `动爻爻位：${movers.length ? `第 ${movers.join("、")} 爻` : "无动爻（静卦）"}`,
    `变卦：${chart.changedUpper}上${chart.changedLower}下`,
    `周易变卦：${bianInfo.fullName}（${bianInfo.tip}）`,
    `变卦卦辞：${bianInfo.scripture || "-"}`,
    `互卦：${chart.huUpper}上${chart.huLower}下`,
    `周易互卦：${huInfo.fullName}（${huInfo.tip}）`,
    `互卦卦辞：${huInfo.scripture || "-"}`,
    `综卦：${chart.zongUpper}上${chart.zongLower}下`,
    `周易综卦：${zongInfo.fullName}（${zongInfo.tip}）`,
    `综卦卦辞：${zongInfo.scripture || "-"}`,
    `错卦：${chart.cuoUpper}上${chart.cuoLower}下`,
    `周易错卦：${cuoInfo.fullName}（${cuoInfo.tip}）`,
    `错卦卦辞：${cuoInfo.scripture || "-"}`,
    `本卦动爻爻辞：${yaoTextsForMoving || "-"}`,
    `月建：${pro.monthBranch}，日辰：${pro.dayGanzhi}，旬空：${pro.dayXunKong}`,
    `本卦上卦：${upperMeta.name}(${upperMeta.symbol}/${upperMeta.element}/${upperMeta.binary})`,
    `本卦下卦：${lowerMeta.name}(${lowerMeta.symbol}/${lowerMeta.element}/${lowerMeta.binary})`,
    `变卦上卦：${changedUpperMeta.name}(${changedUpperMeta.symbol}/${changedUpperMeta.element}/${changedUpperMeta.binary})`,
    `变卦下卦：${changedLowerMeta.name}(${changedLowerMeta.symbol}/${changedLowerMeta.element}/${changedLowerMeta.binary})`,
    `互卦上卦：${huUpperMeta.name}(${huUpperMeta.symbol}/${huUpperMeta.element}/${huUpperMeta.binary})`,
    `互卦下卦：${huLowerMeta.name}(${huLowerMeta.symbol}/${huLowerMeta.element}/${huLowerMeta.binary})`,
    `综卦上卦：${zongUpperMeta.name}(${zongUpperMeta.symbol}/${zongUpperMeta.element}/${zongUpperMeta.binary})`,
    `综卦下卦：${zongLowerMeta.name}(${zongLowerMeta.symbol}/${zongLowerMeta.element}/${zongLowerMeta.binary})`,
    `错卦上卦：${cuoUpperMeta.name}(${cuoUpperMeta.symbol}/${cuoUpperMeta.element}/${cuoUpperMeta.binary})`,
    `错卦下卦：${cuoLowerMeta.name}(${cuoLowerMeta.symbol}/${cuoLowerMeta.element}/${cuoLowerMeta.binary})`,
    "专业六爻盘：",
    ...pro.lines
      .slice()
      .reverse()
      .map(
        (line) =>
          `${line.position}爻 ${line.spirit} ${line.shiYing} | 伏神:${line.hidden} | 本:${line.main} | 变:${line.changed}`
      ),
    "六爻明细：",
    lines
  ].join("\n");
}

function getYongShenSuggestion(questionType, pro) {
  const profile = QUESTION_PROFILE[questionType] || QUESTION_PROFILE.general;
  const candidates = [];
  for (const target of profile.yongShen) {
    for (const line of pro.lines || []) {
      if (!line.main.includes(target)) continue;
      const score = line.main.includes("旺") ? 4 : line.main.includes("相") ? 3 : line.main.includes("休") ? 2 : 1;
      candidates.push({ target, line, score });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  if (!candidates.length) {
    return { text: `优先参考：${profile.yongShen.join("、")}（当前盘中未检索到明显高旺位）`, candidates: [] };
  }
  const top = candidates[0];
  return {
    text: `优先用神：${top.target}，落在第${top.line.position}爻（${top.line.main}）`,
    candidates: candidates.slice(0, 3).map((x) => ({ yongShen: x.target, line: x.line.position, detail: x.line.main }))
  };
}

function buildLiuyaoInterpretation({ chart, questionType, benInfo, bianInfo, pro, yongShenSuggestion }) {
  const profile = QUESTION_PROFILE[questionType] || QUESTION_PROFILE.general;
  const movers =
    chart.movingLines && chart.movingLines.length ? chart.movingLines : chart.movingLine ? [chart.movingLine] : [];
  const refLine =
    movers.length > 0 ? Math.min(...movers) : chart.inputKind === "coins" ? 4 : chart.movingLine > 0 ? chart.movingLine : 4;
  const movingLevel =
    movers.length === 0
      ? "卦无动爻，偏静卦，可侧重卦辞与世应用神"
      : refLine <= 2
        ? "事情处于起步阶段"
        : refLine <= 4
          ? "事情正在发展变化中"
          : "事情接近结果阶段";
  const monthDay = `月建${pro.monthBranch}，日辰${pro.dayGanzhi}`;
  const summary = `${profile.label}类事项：本卦${benInfo.shortName}变${bianInfo.shortName}，${movingLevel}。${monthDay}。`;
  const yaoBullet =
    movers.length === 0
      ? "卦无动爻时，可先以卦辞定大势，再配合世应与用神推演"
      : movers.length === 1
        ? `先看本卦卦辞定大方向，再看第${movers[0]}爻爻辞定关键触发点`
        : `多爻并动（第${movers.join("、")}爻）：宜分轻重主客，并参各动爻爻辞`;

  const bullets = [yaoBullet, `变卦${bianInfo.shortName}代表后续走向，若与本卦五行生扶，多主可成`, yongShenSuggestion.text];
  return { summary, bullets };
}

function downloadFile(filename, mime, content) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportLiuyaoAsPlainTextImage(text) {
  try {
    const lines = String(text || "").split("\n");
    const padding = 24;
    const lineHeight = 24;
    const width = 1200;
    const height = Math.max(240, padding * 2 + lines.length * lineHeight);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#1f1f1f";
    ctx.font = "18px Microsoft YaHei, Segoe UI, sans-serif";
    lines.forEach((line, idx) => {
      ctx.fillText(line, padding, padding + (idx + 1) * lineHeight);
    });
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `六爻排盘_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch (_) {
    return false;
  }
}

function triggerPngDownload(dataUrl, baseName) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `${baseName}_${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 将当前六爻排盘结果卡片渲染为 PNG（整块界面截图，非纯文本）。
 */
async function exportLiuyaoAsImage() {
  const el = liuyaoResult;
  if (!el || el.classList.contains("hidden") || !el.innerHTML.trim()) {
    return false;
  }

  if (typeof html2canvas !== "function") {
    return exportLiuyaoAsPlainTextImage(currentLiuYaoText || "");
  }

  const prevScroll = { top: el.scrollTop, left: el.scrollLeft };
  el.scrollTop = 0;
  el.scrollLeft = 0;

  const capW = Math.max(el.scrollWidth, el.offsetWidth, 1);
  const capH = Math.max(el.scrollHeight, el.offsetHeight, 1);
  const maxEdge = 8192;
  const scale = Math.min(2, maxEdge / Math.max(capW, capH, 1));

  try {
    const canvas = await html2canvas(el, {
      scale,
      backgroundColor: getComputedStyle(el).backgroundColor || "#ffffff",
      useCORS: true,
      logging: false,
      onclone: (_doc, clone) => {
        clone.querySelectorAll("details").forEach((d) => {
          d.setAttribute("open", "");
        });
        clone.querySelector(".copy-actions")?.remove();
        clone.style.width = `${capW}px`;
        clone.style.maxWidth = "none";
        clone.style.height = "auto";
        clone.style.minHeight = "0";
        clone.style.overflow = "visible";
        clone.style.boxShadow = "none";
      }
    });

    el.scrollTop = prevScroll.top;
    el.scrollLeft = prevScroll.left;

    triggerPngDownload(canvas.toDataURL("image/png"), "六爻排盘");
    return true;
  } catch (err) {
    console.error(err);
    el.scrollTop = prevScroll.top;
    el.scrollLeft = prevScroll.left;
    return exportLiuyaoAsPlainTextImage(currentLiuYaoText || "");
  }
}

function getHexagramInfo(upperName, lowerName) {
  const upperMeta = trigramMetaByName(upperName);
  const lowerMeta = trigramMetaByName(lowerName);
  const upperIdx = LIUYAO_NAMES.indexOf(upperName);
  const lowerIdx = LIUYAO_NAMES.indexOf(lowerName);
  const shortName =
    upperIdx >= 0 && lowerIdx >= 0 ? HEXAGRAM_NAME_MATRIX[upperIdx][lowerIdx] : `${upperName}${lowerName}`;
  const fullName = `${upperMeta.symbol}${lowerMeta.symbol}${shortName}`;
  const tip = `上${upperMeta.symbol}下${lowerMeta.symbol}，主看${shortName}之象`;
  const detailKey = `${upperName}-${lowerName}`;
  const detail = ichingDataMap.get(detailKey);
  return {
    shortName,
    fullName,
    tip,
    scripture: detail?.scripture || "",
    lines: Array.isArray(detail?.lines) ? detail.lines : []
  };
}

function buildProfessionalLiuYao(chart, dateObj) {
  const mainInfo = LIU_YAO_HEXAGRAM_MAP[chart.mainCode];
  const changedInfo = LIU_YAO_HEXAGRAM_MAP[chart.changedCode];
  if (!mainInfo || !changedInfo) {
    return { monthBranch: "-", dayGanzhi: "-", dayXunKong: "-", lines: [] };
  }

  const calendar = getLiuyaoCalendarInfo(dateObj);
  const mainPillars = buildHexagramPillars(mainInfo);
  const changedPillars = buildHexagramPillars(changedInfo);
  const hiddenBaseCode = PALACE_BASE_CODE[mainInfo.palace];
  const hiddenInfo = hiddenBaseCode ? LIU_YAO_HEXAGRAM_MAP[hiddenBaseCode] : null;
  const hiddenPillars = hiddenInfo ? buildHexagramPillars(hiddenInfo) : [];

  const dayStem = calendar.dayGanzhi.charAt(0);
  const spiritStart = DAY_STEM_TO_SPIRIT_START[dayStem] ?? 0;

  const lines = [];
  for (let i = 0; i < 6; i += 1) {
    const main = mainPillars[i] || { stem: "-", branch: "-" };
    const changed = changedPillars[i] || { stem: "-", branch: "-" };
    const hidden = hiddenPillars[i] || { stem: "-", branch: "-" };
    const mainElement = BRANCH_FIVE_ELEMENTS[main.branch] || "-";
    const changedElement = BRANCH_FIVE_ELEMENTS[changed.branch] || "-";
    const hiddenElement = BRANCH_FIVE_ELEMENTS[hidden.branch] || "-";
    const mainRelative = getRelativeForLiuQin(mainInfo.element, mainElement);
    const changedRelative = getRelativeForLiuQin(mainInfo.element, changedElement);
    const hiddenRelative = getRelativeForLiuQin(mainInfo.element, hiddenElement);
    const spirit = SIX_SPIRITS[(spiritStart + i) % 6];
    const shiYing = i + 1 === mainInfo.shi ? "世" : i + 1 === mainInfo.ying ? "应" : "";
    const wangShuai = getWangShuaiSimple(mainElement, calendar.monthElement);

    lines.push({
      position: i + 1,
      spirit,
      shiYing,
      hidden: `${hiddenRelative}${hidden.stem}${hidden.branch}`.replace(/^-+/, "-"),
      main: `${mainRelative}${main.stem}${main.branch}(${mainElement}/${wangShuai})`,
      changed: `${changedRelative}${changed.stem}${changed.branch}(${changedElement})`
    });
  }

  return {
    monthBranch: calendar.monthBranch,
    dayGanzhi: calendar.dayGanzhi,
    dayXunKong: calendar.dayXunKong,
    lines
  };
}

function getLiuyaoCalendarInfo(dateObj) {
  try {
    const solar = Solar.fromYmdHms(
      dateObj.getFullYear(),
      dateObj.getMonth() + 1,
      dateObj.getDate(),
      dateObj.getHours(),
      dateObj.getMinutes(),
      dateObj.getSeconds()
    );
    const lunar = solar.getLunar();
    const dayGanzhi = safeCall(
      lunar,
      "getDayInGanZhiExact2",
      safeCall(lunar, "getDayInGanZhiExact", safeCall(lunar, "getDayInGanZhi", "-"))
    );
    const monthGanzhi = safeCall(
      lunar,
      "getMonthInGanZhiExact",
      safeCall(lunar, "getMonthInGanZhi", "-")
    );
    const monthBranch = monthGanzhi.length >= 2 ? monthGanzhi.charAt(1) : "-";
    return {
      dayGanzhi,
      monthGanzhi,
      monthBranch,
      monthElement: BRANCH_FIVE_ELEMENTS[monthBranch] || "-",
      dayXunKong: safeCall(lunar, "getDayXunKong", "-")
    };
  } catch (_) {
    return { dayGanzhi: "-", monthGanzhi: "-", monthBranch: "-", monthElement: "-", dayXunKong: "-" };
  }
}

function buildHexagramPillars(hexInfo) {
  const innerStems = PALACE_STEM_PATTERNS[hexInfo.inner] || [];
  const innerBranches = PALACE_BRANCH_PATTERNS[hexInfo.inner] || [];
  const outerStems = PALACE_STEM_PATTERNS[hexInfo.outer] || [];
  const outerBranches = PALACE_BRANCH_PATTERNS[hexInfo.outer] || [];
  const result = [];
  for (let i = 0; i < 6; i += 1) {
    if (i < 3) {
      result.push({ stem: innerStems[i] || "-", branch: innerBranches[i] || "-" });
    } else {
      result.push({ stem: outerStems[i] || "-", branch: outerBranches[i] || "-" });
    }
  }
  return result;
}

function getRelativeForLiuQin(palaceElement, yaoElement) {
  if (!FIVE_ELEMENT_INDEX.hasOwnProperty(palaceElement) || !FIVE_ELEMENT_INDEX.hasOwnProperty(yaoElement)) {
    return "未知";
  }
  if (palaceElement === yaoElement) return "兄弟";
  const palaceIdx = FIVE_ELEMENT_INDEX[palaceElement];
  const yaoIdx = FIVE_ELEMENT_INDEX[yaoElement];
  const diff = (yaoIdx - palaceIdx + 5) % 5;
  return ["兄弟", "子孙", "妻财", "官鬼", "父母"][diff];
}

function getWangShuaiSimple(yaoElement, monthElement) {
  if (!FIVE_ELEMENT_INDEX.hasOwnProperty(yaoElement) || !FIVE_ELEMENT_INDEX.hasOwnProperty(monthElement)) {
    return "平";
  }
  if (yaoElement === monthElement) return "旺";
  const y = FIVE_ELEMENT_INDEX[yaoElement];
  const m = FIVE_ELEMENT_INDEX[monthElement];
  if ((m + 1) % 5 === y) return "相";
  if ((y + 1) % 5 === m) return "休";
  if ((m + 2) % 5 === y) return "囚";
  return "死";
}

function initializeIChingTexts() {
  fetch(IChingDataUrlCompat())
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((rows) => {
      if (!Array.isArray(rows)) return;
      const map = new Map();
      for (const row of rows) {
        if (!row || !Array.isArray(row.combination) || row.combination.length !== 2) continue;
        const lower = row.combination[0];
        const upper = row.combination[1];
        const key = `${upper}-${lower}`;
        map.set(key, {
          scripture: row.scripture || "",
          lines: Array.isArray(row.lines) ? row.lines : []
        });
      }
      if (map.size) {
        ichingDataMap = map;
      }
    })
    .catch((e) => {
      console.warn("六十四卦文本加载失败，使用基础模式。", e);
    });
}

function IChingDataUrlCompat() {
  return ICHING_DATA_URL;
}

function getShichenFromHour(hour) {
  const branchIndex = Math.floor(((hour + 1) % 24) / 2);
  return {
    shichenName: SHICHEN_NAMES[branchIndex],
    shichenNumber: branchIndex + 1
  };
}

function buildTimeInfo(dateObj, source) {
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const second = dateObj.getSeconds();
  const shichen = getShichenFromHour(hour);
  return {
    source,
    sourceText: source === "now" ? "当前时间" : "手动时间",
    displayTime: `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`,
    hour,
    minute,
    second,
    shichenName: shichen.shichenName,
    shichenNumber: shichen.shichenNumber
  };
}

function toDateTimeLocal(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  const hh = String(dateObj.getHours()).padStart(2, "0");
  const mm = String(dateObj.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d}T${hh}:${mm}`;
}

async function copyText(text) {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) {}

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch (_) {
    return false;
  }
}

function formatDate(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  const hh = String(dateObj.getHours()).padStart(2, "0");
  const mm = String(dateObj.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
