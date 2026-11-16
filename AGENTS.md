# AGENTS.md — AI Concepts Atlas

> This file is the authoritative instruction manual for AI coding assistants working on this repository. Read it before creating, changing, or deleting project files.

## 1. Project mission

Build a beginner-friendly, Traditional Chinese knowledge website explaining AI concepts in concise, original language. The website is intentionally **content-driven**: a new topic should appear as both a home-page card and a detail view without hand-writing a new HTML page.

**Success means:** consistent presentation, factually cautious explanations, working navigation, and a repeatable workflow for adding topics.

**Audience:** students and self-learners who are new to AI. Avoid unexplained jargon.

## 2. Technical constraints

- The site is **static**, hosted on GitHub Pages.
- Use native **HTML + CSS + JavaScript only**. No build step, framework, server, database, paid API, or dependency is required.
- Keep all links and assets relative so the site works at `https://USERNAME.github.io/REPOSITORY/`.
- Navigate to topics with hash URLs: `#topic/<id>` (example: `#topic/rag`). This avoids GitHub Pages 404 errors for detail pages.
- Primary language: **Traditional Chinese (`zh-Hant`)**. English terminology may be shown as a companion label.
- Do not introduce dependencies or external services without the owner's approval.

## 3. Repository structure and ownership

```text
ai-concepts-atlas/
├── AGENTS.md                 # AI development rules; source of truth
├── README.md                 # Human-facing setup and publishing guide
├── index.html                # Static semantic HTML structure
├── data/
│   └── topics.js             # ALL topic records + category definitions
├── assets/
│   ├── app.js                # Filters, cards, routing, detail rendering
│   ├── styles.css            # Shared design system and responsive styles
│   └── favicon.svg           # Locally created site icon
└── scripts/
    └── validate-content.mjs  # Offline data validator (Node.js optional)
```

**Ownership rule:** for a request such as "add a topic about fine-tuning," modify **only** `data/topics.js` unless there is an explicit requirement to change behavior, structure, or style. Never copy/paste a topic into `index.html`; card and detail content are generated automatically.

## 4. Visual design system

- Personality: friendly, editorial, airy, and slightly playful, not an enterprise dashboard.
- Main background `#f6f4ef`, primary text `#22243a`, accent `#d9f36c`.
- Reuse established CSS custom properties from `assets/styles.css`. Do not invent unrelated themes for new topics.
- All topics use the **same card layout and same detail-page template**.
- Category styles: `foundation` (lavender), `application` (green), `practice` (sand).
- Keep touch-friendly buttons, visible keyboard focus, semantic headings, readable contrast, and small-screen responsiveness.
- Do not depend on external photos, fonts, icon libraries, or copyrighted character artwork.

## 5. Content schema — REQUIRED for every new record

All topics are objects inside `window.AI_ATLAS_TOPICS` in `data/topics.js`:

```js
{
  id: 'fine-tuning',              // unique ASCII lowercase kebab-case URL slug
  title: 'Fine-tuning',           // visible heading
  english: 'Model Fine-tuning',  // secondary English label
  category: 'application',       // foundation | application | practice
  level: '入門',                   // 入門 | 進階入門
  minutes: 4,                    // positive integer reading-time estimate
  symbol: '◎',                   // short text symbol, no image dependency
  summary: '一句話介紹這個概念。',    // shown on the home card
  oneLiner: '讀完應記住的一句話。',   // shown in detail-page hero
  tags: ['模型', '資料', '訓練'],     // 2–4 search-friendly tags
  sections: [
    { heading: '它是什麼？', paragraphs: ['至少一段原創解說。'] },
    { heading: '怎麼運作？', paragraphs: ['解釋概念的過程。'], bullets: ['可選的補充重點。'] },
    { heading: '什麼時候使用？', paragraphs: ['生活化例子與限制。'] }
  ],
  keyPoints: ['重點一。', '重點二。', '重點三。'], // exactly 3
  updated: '2026-11-16' // YYYY-MM-DD; date of actual edit
}
```

Content requirements:

1. Keep the `id` unique and stable; changing an existing slug breaks links.
2. Use one of the **existing** categories; request permission before adding a category, because this affects filtering and visual design.
3. Include **at least three** `sections`, each with a heading and one or more non-empty paragraphs.
4. Include **exactly three** `keyPoints`, and 2–4 distinct tags.
5. Explain the concept using accessible language, with at least one concrete example across the sections.
6. Give an accurate, non-exaggerated description; state limits and avoid pretending uncertain claims are settled facts.
7. Write original text. Do not copy encyclopedia or website paragraphs. When introducing time-sensitive or niche claims, verify and document an appropriate source before publication.
8. `minutes` must be a reasonable reading-time estimate; `updated` must reflect the date the entry was edited.
9. No secrets, personally identifiable information, harmful instructions, or user-submitted private data in the public repository.

## 6. How to add a new topic — follow this exact workflow

1. Read this `AGENTS.md`, then inspect 1–2 existing examples in `data/topics.js`.
2. Check whether the proposed topic already exists under a similar name; expand an existing entry rather than duplicate it.
3. Choose a **unique kebab-case `id`** and one of the existing categories.
4. Append one record matching section 5 **to `window.AI_ATLAS_TOPICS`**. Preserve existing entries and their URLs.
5. Do **not** edit HTML cards, routes, or navigation for an ordinary content addition.
6. Run `node scripts/validate-content.mjs` if Node.js is installed.
7. Open `index.html` locally. Check: new card appears, category filter works, search finds the title/tag, the card opens `#topic/<id>`, the back link works, and the detail page displays all sections.
8. Check a narrow/mobile viewport and verify no horizontal scrolling or unreadable text.
9. Report to the user which topic was added, which file changed, which checks passed, and any unverified claims.

## 7. How to update an existing topic

- Locate the record by `id` in `data/topics.js`.
- Update only the necessary text fields and `updated` date; preserve the `id` and unchanged topic data.
- If changing a factual explanation, check consistency among `summary`, `oneLiner`, `sections`, and `keyPoints`.
- Re-run validation and verify that the original hash URL still resolves.

## 8. Code and accessibility rules

- Preserve semantic HTML and keyboard usability. Interactive controls must remain actual links, buttons, or inputs.
- User-visible topic strings inserted into HTML must be escaped using the existing `escapeHtml` helper in `assets/app.js`.
- Never add `innerHTML` rendering of unescaped topic text.
- Keep the site usable with the existing offline files; do not require fetching a JSON file over HTTP for local usage.
- Respect `prefers-reduced-motion`; preserve visible focus indicators and responsive breakpoints.
- Make small, focused changes; do not rewrite the whole site for a one-topic content request.
- The website must stay deployable directly from the GitHub repository root.

## 9. Definition of done (acceptance checklist)

A content addition is DONE only when all items are true:

- [ ] Record follows schema and passes `node scripts/validate-content.mjs`.
- [ ] Existing topics, IDs, and hash links remain intact.
- [ ] New home card appears automatically (without editing `index.html`).
- [ ] Search, category filter, detail view, and back navigation work.
- [ ] Content is understandable, original, and appropriately qualified.
- [ ] Responsive layout and keyboard navigation still work.
- [ ] Any incomplete validation is stated honestly in the final report.

## 10. Example AI task

**User request:** "新增一個介紹 Fine-tuning 的頁面，給沒有技術背景的學生看。"

**Expected AI behavior:** Read this file → check `data/topics.js` for duplicates → append a complete `fine-tuning` topic object in the required format → run the validator → verify the new `#topic/fine-tuning` route and card → summarize the change. No extra HTML page or duplicated layout should be made.
