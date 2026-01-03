# GitHub Pages 部署指南

## 自動部署（推薦）

本專案已配置 GitHub Actions 自動部署。當你推送程式碼到 `main` 分支時，會自動建置並部署到 GitHub Pages。

### 設定步驟

1. **在 GitHub 上建立儲存庫**
   - 建立一個新的 GitHub 儲存庫（例如：`LogicFlow`）

2. **推送程式碼**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/LogicFlow.git
   git push -u origin main
   ```

3. **啟用 GitHub Pages**
   - 前往儲存庫的 Settings > Pages
   - Source 選擇 "GitHub Actions"
   - 儲存設定

4. **等待部署完成**
   - 前往 Actions 標籤頁查看部署狀態
   - 部署完成後，網站會自動發布到：`https://YOUR_USERNAME.github.io/LogicFlow/`

## 手動部署

如果你想手動部署：

```bash
npm install
npm run build
```

然後將 `dist` 目錄的內容上傳到 GitHub Pages。

## 注意事項

- 確保 `vite.config.ts` 中的 `base` 設定與你的儲存庫名稱一致
- 如果儲存庫名稱不是 `LogicFlow`，請修改 `vite.config.ts` 中的 `base` 路徑
- 部署後可能需要幾分鐘才能看到更新

