/*
 * The content catalog is the only file that needs editing for a new topic.
 * Read AGENTS.md before adding or changing entries.
 * Keep this script dependency-free for GitHub Pages.
 */
window.AI_ATLAS_CATEGORIES = [
  { id: 'all', label: '全部概念' },
  { id: 'foundation', label: '基礎概念' },
  { id: 'application', label: '實際應用' },
  { id: 'practice', label: '使用技巧' }
];

window.AI_ATLAS_TOPICS = [
  {
    id: 'ai-agent',
    title: 'AI Agent',
    english: 'Autonomous AI Agent',
    category: 'application',
    level: '入門',
    minutes: 4,
    symbol: '↗',
    summary: '不只是回答問題，而是能按照目標規劃步驟、使用工具並檢查結果的 AI 系統。',
    oneLiner: '從「回答問題」進一步走向「完成任務」。',
    tags: ['工具使用', '任務規劃', '自動化'],
    sections: [
      { heading: '它是什麼？', paragraphs: ['一般聊天機器人主要依照輸入產生回答。AI Agent 則把語言模型放進一個可執行任務的系統，通常能依照目標決定下一步、呼叫工具、讀取結果，再繼續行動。', 'Agent 並不代表完全不需要人類。當任務牽涉金錢、資料刪除或對外發布時，適當的人類確認很重要。'] },
      { heading: '它怎麼運作？', paragraphs: ['一個常見流程是：接收目標 → 規劃下一步 → 呼叫工具 → 觀察結果 → 判斷是否完成。這個循環可以重複多次。'], bullets: ['目標：清楚定義要完成什麼。', '工具：搜尋、讀寫檔案、執行程式等能力。', '回饋：根據工具結果修正後續行動。'] },
      { heading: '生活中的例子', paragraphs: ['假設你要整理一份報告，Agent 可以先搜尋指定資料、分類重點、建立草稿，再依照你的檢查意見修改；但資料來源和最後提交仍需要確認。'] }
    ],
    keyPoints: ['Agent 是由模型、工具、執行流程等組成的系統。', '能呼叫工具不等於一定能可靠地完成所有任務。', '重要操作應設計權限與人類確認機制。'],
    updated: '2026-11-16'
  },
  {
    id: 'rag',
    title: 'RAG',
    english: 'Retrieval-Augmented Generation',
    category: 'application',
    level: '入門',
    minutes: 4,
    symbol: '◈',
    summary: '讓 AI 先從指定資料裡找出相關內容，再根據檢索結果整理回答。',
    oneLiner: '先找資料，再回答問題。',
    tags: ['知識庫', '檢索', '文件問答'],
    sections: [
      { heading: '它是什麼？', paragraphs: ['RAG 的全名是 Retrieval-Augmented Generation，中文常譯為「檢索增強生成」。它讓模型在作答之前，先參考另外找出的文件或知識片段。', '與重新訓練模型不同，RAG 可以透過更新資料庫來改變系統能檢索到的資訊。'] },
      { heading: '簡單流程', paragraphs: ['先準備文件並建立可搜尋的索引；當使用者提問時，系統找出相關片段，把片段連同問題提供給語言模型生成答案。'], bullets: ['建立資料：整理文件，必要時切成小段。', '檢索：找出與問題相關的內容。', '生成：用檢索片段輔助回答，最好附上資料來源。'] },
      { heading: '要注意什麼？', paragraphs: ['RAG 不是準確度保證書。如果檢索找錯資料、文件過時或模型誤讀內容，仍可能生成錯誤答案。因此需要測試檢索品質與回答是否忠於來源。'] }
    ],
    keyPoints: ['RAG = 檢索 + 生成。', '資料可以更新，不必每次重新訓練模型。', '檢索結果的品質會影響最後回答。'],
    updated: '2026-11-16'
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    english: 'Prompt Design',
    category: 'practice',
    level: '入門',
    minutes: 3,
    symbol: '✳',
    summary: '透過清楚的任務描述、背景與輸出要求，幫助 AI 更貼近你的需求。',
    oneLiner: '把需求說清楚，讓輸出更可控。',
    tags: ['提示詞', '任務描述', '輸出格式'],
    sections: [
      { heading: '它是什麼？', paragraphs: ['Prompt Engineering 是設計模型輸入的方法。重點不只是找出神奇關鍵字，而是提供足夠的任務背景、必要限制和你希望的成果形式。'] },
      { heading: '一個實用公式', paragraphs: ['試試看：目標 + 背景 + 限制 + 輸出格式 + 判斷標準。例如，與其只說「幫我摘要」，不如說「把這篇文章整理成三段，每段包含一個重點與一個例子」。'], bullets: ['目標：要解決什麼問題？', '限制：長度、語言、資料來源有哪些要求？', '格式：表格、條列或短文？'] },
      { heading: '常見誤解', paragraphs: ['好的 Prompt 可以改善溝通，但不能代替正確資料、工具驗證或模型能力。重要任務仍需要人工檢查。'] }
    ],
    keyPoints: ['先講清楚任務，再指定輸出格式。', '提供背景與例子通常比堆疊口號有用。', '提示詞設計無法保證模型永遠正確。'],
    updated: '2026-11-16'
  },
  {
    id: 'token',
    title: 'Token',
    english: 'Units of Model Text',
    category: 'foundation',
    level: '入門',
    minutes: 3,
    symbol: 'Tₙ',
    summary: '語言模型處理文字時使用的基本單位，可能是一個字、一部分單字或符號。',
    oneLiner: '模型讀的不是整段句子，而是一串 token。',
    tags: ['語言模型', '文字處理', '上下文'],
    sections: [
      { heading: '它是什麼？', paragraphs: ['Token 是模型將文字切分後處理的單位。英文可能被切成單字或子字；中文常見一個字對應一個或多個 token，但實際結果取決於模型使用的 tokenizer。'] },
      { heading: '為什麼重要？', paragraphs: ['模型有上下文長度限制，通常以 token 數量表示。API 服務也常依輸入和輸出 token 計價，因此 token 會影響可處理的文字量與使用成本。'] },
      { heading: '直覺例子', paragraphs: ['對人類來說，「人工智慧」是一個詞；對不同 tokenizer 來說，它可能會切成不同的 token 組合。不要把 token 直接視為字數。'] }
    ],
    keyPoints: ['Token 不一定等於一個字或一個單字。', '不同模型的 tokenizer 可能不同。', '上下文長度與使用量常以 token 計算。'],
    updated: '2026-11-16'
  },
  {
    id: 'embedding',
    title: 'Embedding',
    english: 'Vector Representation',
    category: 'foundation',
    level: '進階入門',
    minutes: 4,
    symbol: '⊞',
    summary: '把文字等資料轉成數值向量，讓電腦更容易比較它們的相似程度。',
    oneLiner: '用數字表示語意的相近程度。',
    tags: ['向量', '語意搜尋', 'RAG'],
    sections: [
      { heading: '它是什麼？', paragraphs: ['Embedding 是一種數值表示方法，會把文字、圖片或其他資料映射成向量。相似的內容通常會在特定向量空間中呈現較接近的表示，但實際效果取決於模型與資料。'] },
      { heading: '跟搜尋有什麼關係？', paragraphs: ['一般關鍵字搜尋偏重字面是否相同；向量搜尋則可比較表示的相似度，因此有機會找出用不同措辭表達的相關內容。'], bullets: ['把文件轉成向量並建立索引。', '把查詢也轉成向量。', '比對相似度，取回可能相關的文件。'] },
      { heading: '常見用途', paragraphs: ['語意搜尋、推薦系統、文件群集以及許多 RAG 系統都會使用 Embedding。它不是直接等於理解，也不能保證搜尋結果正確。'] }
    ],
    keyPoints: ['Embedding 把內容轉成可比較的向量。', '可以輔助語意搜尋與相似度比對。', '向量接近不必然代表事實正確。'],
    updated: '2026-11-16'
  },
  {
    id: 'hallucination',
    title: 'Hallucination',
    english: 'AI Hallucination',
    category: 'practice',
    level: '入門',
    minutes: 3,
    symbol: '?!',
    summary: 'AI 可能產生看似合理、實際卻不正確或缺乏根據的回答。',
    oneLiner: '說得流暢，不代表說得正確。',
    tags: ['可靠性', '事實查核', '模型限制'],
    sections: [
      { heading: '它是什麼？', paragraphs: ['Hallucination（常稱「幻覺」）指模型輸出缺乏根據或與事實不符的內容，例如編造不存在的書名、資料或引用。它不是有意識地說謊，而是模型生成過程可能出現的錯誤。'] },
      { heading: '怎麼降低風險？', paragraphs: ['你可以要求模型指出來源、允許它回答不知道，並搭配可靠資料庫或外部驗證。但任何單一方法都無法保證完全消除錯誤。'], bullets: ['核對可追溯的原始來源。', '對數字、日期、引文多做一次檢查。', '重要情境保留人工審查。'] },
      { heading: '記住一件事', paragraphs: ['文句自然、條理清楚是表達品質，不等於證據品質。判斷回答是否可靠，還是要看其資料與推論能否被檢查。'] }
    ],
    keyPoints: ['模型可能生成錯誤卻流暢的文字。', '提供資料來源有幫助，但仍要驗證。', '高風險決策不能只依賴單一 AI 回答。'],
    updated: '2026-11-16'
  }
];
