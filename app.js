(() => {
  'use strict';
  const chapters = Array.isArray(window.MEKTUP) ? window.MEKTUP : [];
  const reader = document.getElementById('reader');
  const wrapper = document.getElementById('chapters');
  const progress = document.getElementById('readProgress');
  const fill = document.getElementById('progressFill');
  const count = document.getElementById('pageCount');
  const footerLabel = document.getElementById('footerLabel');
  const status = document.getElementById('readingStatus');
  const arrow = document.getElementById('downArrow');
  const escapeHTML = input => String(input ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  const renderChapter = (chapter, index) => {
    const layoutWords = String(chapter.layout || 'letter').split(' ').filter(Boolean);
    const classNames = layoutWords.map(name => `chapter--${name.replace(/[^a-z-]/g, '')}`).join(' ');
    const root = document.createElement('section');
    root.className = `chapter ${classNames}`;
    root.id = `bolum-${index + 1}`;
    root.dataset.step = String(index + 1);
    root.setAttribute('aria-label', `${index + 1}. bölüm: ${chapter.title}`);
    const paragraphs = (chapter.paragraphs || []).map(p => `<p>${escapeHTML(p)}</p>`).join('');
    const quote = chapter.quote ? `<blockquote class="chapter-quote">${escapeHTML(chapter.quote)}</blockquote>` : '';
    const lines = chapter.lines?.length ? `<ul class="${layoutWords.includes('poem') ? 'poem-lines' : 'quote-list'}">${chapter.lines.map(line => `<li>${escapeHTML(line)}</li>`).join('')}</ul>` : '';
    const list = chapter.lines?.length && !layoutWords.includes('poem') ? lines.replace('quote-list', 'line-list') : lines;
    const note = chapter.note ? `<p class="chapter-note">${escapeHTML(chapter.note)}</p>` : '';
    const pageBody = layoutWords.includes('message') ? `<div class="quote-paper">${quote}</div>${note}${paragraphs}` : `${quote}${list}${paragraphs}${note}`;
    const ending = layoutWords.includes('ending') ? `<span aria-hidden="true" class="ending-heart">♡</span><button type="button" class="restart-button" id="restartButton">En baştan oku ↗</button>` : '';
    const ornament = layoutWords.includes('poem') ? `<span aria-hidden="true" class="poem-mark">✳</span>` : '';
    root.innerHTML = `<div class="chapter-inner"><div class="chapter-kicker">${escapeHTML(chapter.label)}</div><h2>${escapeHTML(chapter.title)}</h2>${pageBody}${ornament}${ending}</div>`;
    return root;
  };
  chapters.forEach((chapter, index) => wrapper.appendChild(renderChapter(chapter, index)));
  const pages = [document.getElementById('kapak'), ...wrapper.children];
  const pad = n => String(n).padStart(2, '0');
  const scrollToPage = (index, smooth = true) => {
    const page = pages[index];
    if (page) reader.scrollTo({ top: page.offsetTop, behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
  };
  document.getElementById('startButton').addEventListener('click', () => scrollToPage(1));
  document.getElementById('restartButton')?.addEventListener('click', () => scrollToPage(0));
  document.querySelector('.wordmark').addEventListener('click', e => { e.preventDefault(); scrollToPage(0); });

  let active = -1;
  let rafPending = false;
  function update() {
    rafPending = false;
    const scrollMid = reader.scrollTop + reader.clientHeight * .48;
    let current = 0;
    // Detect position without depending on a fixed page height: long messages scroll naturally.
    for (let i = 1; i < pages.length; i++) {
      if (pages[i].offsetTop <= scrollMid) current = i;
      else break;
    }
    if (current !== active) {
      active = current;
      const finished = current === pages.length - 1;
      count.textContent = `${pad(current)} / ${pad(chapters.length)}`;
      status.textContent = current === 0 ? 'bir mektup' : finished ? 'son sayfa' : 'okurken';
      footerLabel.textContent = current === 0 ? 'aşağı kaydır' : finished ? 'kalbimde kalanlar' : 'devam et';
      arrow.textContent = finished ? '♡' : '↓';
    }
    const total = Math.max(1, reader.scrollHeight - reader.clientHeight);
    const pct = Math.min(100, Math.max(0, reader.scrollTop / total * 100));
    fill.style.width = `${pct}%`;
    progress.setAttribute('aria-valuenow', String(Math.round(pct)));
  }
  reader.addEventListener('scroll', () => {
    if (!rafPending) { rafPending = true; requestAnimationFrame(update); }
  }, { passive: true });
  document.addEventListener('keydown', e => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key) && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName || '')) {
      e.preventDefault();
      scrollToPage(Math.min(pages.length - 1, Math.max(0, active + (['ArrowDown','PageDown'].includes(e.key) ? 1 : -1))));
    }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-inview'); observer.unobserve(entry.target); }
      });
    }, { root: reader, rootMargin: '0px 0px -40px 0px', threshold: 0.12 });
    wrapper.querySelectorAll('.chapter').forEach(el => observer.observe(el));
  } else wrapper.querySelectorAll('.chapter').forEach(el => el.classList.add('is-inview'));
  update();
})();
