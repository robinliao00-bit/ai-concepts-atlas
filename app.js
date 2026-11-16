/* Presentation logic. New knowledge topics belong in data/topics.js, not here. */
(() => {
  'use strict';
  const topics = window.AI_ATLAS_TOPICS || [];
  const categories = window.AI_ATLAS_CATEGORIES || [];
  const categoryLabels = Object.fromEntries(categories.map((c) => [c.id, c.label]));
  const state = { category: 'all', query: '' };
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  function renderFilters() {
    $('filter-list').innerHTML = categories.map((cat) => `<button class="filter-button" type="button" data-category="${escapeHtml(cat.id)}" aria-pressed="${cat.id === state.category}">${escapeHtml(cat.label)}</button>`).join('');
    $('filter-list').querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        state.category = button.dataset.category;
        renderFilters();
        renderCards();
      });
    });
  }

  function filteredTopics() {
    const query = state.query.trim().toLocaleLowerCase();
    return topics.filter((topic) => {
      if (state.category !== 'all' && topic.category !== state.category) return false;
      const searchable = [topic.title, topic.english, topic.summary, ...topic.tags].join(' ').toLocaleLowerCase();
      return !query || searchable.includes(query);
    });
  }

  function renderCards() {
    const list = filteredTopics();
    $('result-count').textContent = `共 ${list.length} 個概念 · TOTAL ${list.length.toString().padStart(2, '0')}`;
    $('card-grid').innerHTML = list.map((topic) => {
      const index = topics.indexOf(topic) + 1;
      return `<article class="topic-card" data-category="${escapeHtml(topic.category)}">
        <a class="card-link" href="#topic/${encodeURIComponent(topic.id)}" aria-label="閱讀 ${escapeHtml(topic.title)} 詳細介紹">
          <div class="card-meta"><span class="category-tag" data-category="${escapeHtml(topic.category)}">${escapeHtml(categoryLabels[topic.category])}</span><span class="card-number">N° ${String(index).padStart(2, '0')}</span></div>
          <div class="card-illustration" aria-hidden="true"><span class="illustration-letter">${escapeHtml(topic.symbol)}</span><span class="mini-orbit"></span></div>
          <h3 class="card-title">${escapeHtml(topic.title)}</h3><p class="card-description">${escapeHtml(topic.summary)}</p>
          <div class="card-bottom"><span>${escapeHtml(topic.level)} <span aria-hidden="true">·</span> ${topic.minutes} MIN READ</span><span class="card-arrow" aria-hidden="true">↗</span></div>
        </a></article>`;
    }).join('');
    $('empty-state').hidden = list.length > 0;
  }

  function renderDetail(topic) {
    $('breadcrumb-current').textContent = topic.title;
    const sections = topic.sections.map((section, i) => `
      <section class="detail-section" aria-labelledby="detail-section-${i}">
        <h2 id="detail-section-${i}">${escapeHtml(section.heading)}</h2>
        ${section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
        ${section.bullets ? `<ul>${section.bullets.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>` : ''}
      </section>`).join('');
    $('detail-content').innerHTML = `
      <div class="detail-hero" data-category="${escapeHtml(topic.category)}">
        <span class="detail-stamp" aria-hidden="true">${escapeHtml(topic.symbol)}</span>
        <div class="detail-kicker"><span>${escapeHtml(categoryLabels[topic.category])}</span><span aria-hidden="true">/</span><span>${escapeHtml(topic.level)} · ${topic.minutes} MIN READ</span></div>
        <h1 id="detail-title">${escapeHtml(topic.title)}</h1><p class="detail-english">${escapeHtml(topic.english)}</p>
        <p class="detail-summary">${escapeHtml(topic.oneLiner)}</p>
        <div class="detail-tags">${topic.tags.map((tag) => `<span class="detail-tag"># ${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
      <div class="detail-body"><div>${sections}<div class="detail-footer"><a class="back-link" href="#topics">← 回到概念列表</a><span class="updated-date">最後更新：${escapeHtml(topic.updated)}</span></div></div>
        <aside class="detail-aside" aria-label="重點整理"><span class="aside-label">THE TAKEAWAYS / 03</span><h3>讀完，記住這三件事。</h3><ul>${topic.keyPoints.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul></aside></div>`;
  }

  function showView(view) {
    $('home-view').hidden = view !== 'home';
    $('detail-view').hidden = view !== 'detail';
    $('not-found-view').hidden = view !== 'notFound';
  }

  function route() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash.startsWith('topic/')) {
      const topic = topics.find((item) => item.id === hash.slice(6));
      if (topic) {
        renderDetail(topic);
        showView('detail');
        document.title = `${topic.title}｜AI Concepts Atlas`;
      } else {
        showView('notFound');
        document.title = '找不到概念｜AI Concepts Atlas';
      }
      window.scrollTo(0, 0);
      return;
    }
    showView('home');
    document.title = 'AI Concepts Atlas｜AI 概念圖鑑';
    const section = hash === 'about' ? 'about' : hash === 'topics' ? 'topics' : null;
    if (section) {
      requestAnimationFrame(() => $(section).scrollIntoView({ behavior: 'auto', block: 'start' }));
    } else if (hash === 'home' || hash === '') {
      window.scrollTo(0, 0);
    }
  }

  $('search-input').addEventListener('input', (event) => { state.query = event.target.value; renderCards(); });
  $('clear-filters').addEventListener('click', () => {
    state.category = 'all'; state.query = ''; $('search-input').value = '';
    renderFilters(); renderCards(); $('search-input').focus();
  });
  document.addEventListener('keydown', (event) => {
    const tag = document.activeElement?.tagName;
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(tag) && !$('home-view').hidden) {
      event.preventDefault(); $('search-input').focus();
    }
  });
  renderFilters(); renderCards(); route();
  window.addEventListener('hashchange', route);
})();
