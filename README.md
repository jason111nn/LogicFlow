# LogicFlow - 數位邏輯互動學習平台

一個專注於數位邏輯觀念強化的互動學習平台，提供即時回饋、互動式練習和智能截圖功能。

## 🌟 核心特色

- **動態出題系統**：每次練習都會隨機生成新題目，確保每次練習都是全新的挑戰
- **模組化設計**：每個章節都有獨立的題目生成器，方便擴充
- **純靜態部署**：完全運行於瀏覽器，可部署於 GitHub Pages
- **進度追蹤**：使用 LocalStorage 自動保存學習進度

## 功能特色

### 🎯 核心功能
- **互動式練習模式**：選擇題與填充題兩種模式
- **即時回饋**：答題後立即顯示正確答案與解析
- **提示系統**：提供引導性提示，不直接給答案
- **詳細解析**：點擊解答按鈕查看完整解題過程
- **進度追蹤**：自動記錄各章節的答題進度與正確率

### 📚 學習章節
- **布林代數與第摩根定理**
  - 布林代數基本運算
  - 第摩根定理
  - 邏輯閘互換
  - 布林代數化簡
  - 布林代數表示（SOP, POS）
  - 代數演算法
  - 卡諾圖（K-Map）互動化簡
  - 組合邏輯電路化簡

- **數字系統**
  - 十、二、八、十六進位表示法
  - 數字表示法之互換
  - 補數（1's, 2's, 9's, 10's Complement）
  - 二進碼十進數 (BCD) 及字元編碼 (ASCII, Gray Code)

### 🎨 系統控制
- **題型切換**：選擇題 / 填充題模式
- **字體縮放**：動態調整全局文字大小（12-24px）
- **深色模式**：減輕長時間使用的眼睛負擔
- **智能截圖**：一鍵截圖，自動隱藏導覽列並顯示進度

### 📊 統計功能
- 練習結束後顯示統計圖表
- 正確率、答題數、耗時統計
- 使用 Chart.js 呈現視覺化數據

### 🎮 互動功能
- **卡諾圖互動化簡**：可點擊網格進行圈選練習
- **邏輯閘視覺化**：Canvas 繪製清晰的邏輯閘圖形
- **進度暫存**：使用 localStorage 保存學習進度

## 技術棧

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Chart.js + react-chartjs-2
- **Screenshot**: html2canvas

## 安裝與執行

### 前置需求
- Node.js 18+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 專案結構

```
LogicFlow/
├── src/
│   ├── components/          # React 組件
│   │   ├── Sidebar.tsx      # 側邊導覽選單
│   │   ├── PracticeArea.tsx # 練習區域
│   │   ├── QuestionDisplay.tsx # 題目顯示
│   │   ├── StatisticsModal.tsx # 統計圖表
│   │   ├── ScreenshotButton.tsx # 截圖功能
│   │   ├── KMap.tsx         # 卡諾圖互動組件
│   │   └── LogicGate.tsx    # 邏輯閘繪製組件
│   ├── store/               # Zustand 狀態管理
│   │   ├── progressStore.ts # 進度管理
│   │   └── settingsStore.ts # 設定管理
│   ├── types/               # TypeScript 類型定義
│   │   ├── chapters.ts      # 章節結構
│   │   └── questions.ts     # 題目類型
│   ├── utils/               # 工具函數
│   │   └── questionGenerator.ts # 題目生成器
│   ├── App.tsx              # 主應用組件
│   ├── main.tsx             # 應用入口
│   └── index.css            # 全局樣式
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 使用說明

### 開始練習
1. 點擊左上角的漢堡選單圖示
2. 選擇想要練習的章節
3. 開始答題，系統會即時記錄進度

### 使用提示與解答
- **提示按鈕**：點擊後顯示引導性提示
- **解答按鈕**：點擊後顯示詳細解析彈窗

### 截圖功能
1. 點擊「截圖」按鈕
2. 系統會自動隱藏導覽列
3. 顯示當前進度條
4. 自動下載截圖檔案

### 切換題型
在側邊選單的「系統控制」區域，可以切換選擇題或填充題模式。

### 調整字體大小
使用側邊選單中的字體縮放拉桿，即時調整全局文字大小。

## 設計理念

### 響應式設計
- 使用 `vw` 和 `vh` 單位確保在不同螢幕比例下的穩定性
- 文字使用 `px` 單位，與字體縮放功能連動

### 使用者體驗
- 即時回饋避免重新整理後進度消失
- 深色模式保護眼睛
- 進度暫存增加學習成就感

## 未來規劃

- [ ] 更多題庫內容
- [ ] 動態電路模擬功能
- [ ] 使用者帳號系統
- [ ] 學習路徑建議
- [ ] 社群分享功能

## 授權

MIT License

## 貢獻

歡迎提交 Issue 或 Pull Request！

