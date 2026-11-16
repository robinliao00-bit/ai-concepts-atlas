# AI Concepts Atlas｜AI 概念圖鑑

一個可以持續擴充的 AI 知識卡片網站，使用 **HTML、CSS、JavaScript** 和 **AGENTS.md** 建立。

## 專案特色

- 6 個起始主題：AI Agent、RAG、Prompt Engineering、Token、Embedding、Hallucination
- 首頁分類篩選、關鍵字搜尋、主題詳細介紹、手機版排版
- 透過 `#topic/<id>` 分享單一知識卡片連結，適用 GitHub Pages
- **不用另外做 HTML 頁面**：只要在 `data/topics.js` 新增一筆符合規格的資料，就會有新卡片和詳細內容頁
- `AGENTS.md` 記載讓 AI 延伸專案的具體規則與測試方式

## 專案結構

```text
.
├── AGENTS.md
├── README.md
├── index.html
├── data/topics.js
├── assets/app.js
├── assets/styles.css
├── assets/favicon.svg
└── scripts/validate-content.mjs
```

## 本機瀏覽

直接用瀏覽器開啟 `index.html` 即可。此網站不需要安裝程式套件、不需要後端、不需要 API 金鑰。

若已安裝 Node.js，可先執行：

```bash
node scripts/validate-content.mjs
```

## 如何新增主題

1. 讓 AI 先讀取 `AGENTS.md`。
2. 告訴 AI：「請依照 AGENTS.md，新增一個 Fine-tuning 的知識卡片。」
3. AI 會依規格在 `data/topics.js` 新增一筆資料，而不修改首頁 HTML。
4. 執行驗證指令，重新整理網站，確認新卡片、搜尋、分類和詳細頁面正常顯示。

這個機制正是本作業的重點：**讓網頁開發從單次生成變成可重複的內容更新流程。**

## 上傳 GitHub 與發布 GitHub Pages

1. 登入 GitHub，建立新的 **Public** repository，例如 `ai-concepts-atlas`。
2. 把本專案內的檔案／資料夾上傳至 repository **根目錄**，不能只上傳 ZIP 檔。
3. 進入 repository → **Settings** → **Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**；Branch 選 `main`，Folder 選 `/(root)`；儲存。
5. 網站成功發布後，網址通常是 `https://你的帳號.github.io/ai-concepts-atlas/`（實際網址以 Pages 畫面顯示為準）。
6. 打開網頁連結，實際測試卡片、分類、搜尋與詳細內容。

### 建議繳交內容

- **專案簡介：** AI Concepts Atlas 是可擴充的 AI 概念圖鑑，透過統一資料格式管理每個知識主題。
- **GitHub Repository：** 貼上你實際建立的 GitHub repo 網址。
- **公開網頁：** 貼上 GitHub Pages 顯示的正式網址。
- **AGENTS.md：** 提供 repo 根目錄 `AGENTS.md` 的連結。
- **延伸說明：** 只需在 `data/topics.js` 新增符合 AGENTS.md 格式的物件，就能自動產生新的首頁卡片和主題詳細頁，無須重新設計版面或修改 HTML。

## 原創與使用

網站介面與中文知識卡片文字皆為本專案製作，未使用角色圖片或第三方網站內文。作為課堂作業時，請依需求自行確認內容、修改專案描述並上傳至自己的帳號；不要填入任何個人密碼或 API 金鑰。
