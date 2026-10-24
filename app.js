(() => {
  'use strict';
  const chapters = Array.isArray(window.MEKTUP) ? window.MEKTUP : [];
  const container = document.getElementById('chapters');
  const progress = document.getElementById('readProgress');
  const fill = document.getElementById('progressFill');
  const count = document.getElementById('pageCount');
  const footerLabel = document.getElementById('footerLabel');
  const arrow = document.getElementById('downArrow');
  if (!container || !chapters.length) return;

  const escapeHTML = input => String(input ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  const createChapter = (chapter, index) => {
    const layoutWords = String(chapter.layout || 'letter').split(/\s+/).filter(Boolean);
    const safeClasses = layoutWords.map(name => `chapter--${name.replace(/[^a-z-]/g, '')}`).join(' ');
    const root = document.createElement('section');
    root.className = `chapter ${safeClasses}`;
    root.id = `bolum-${index + 1}`;
    root.dataset.step = String(index + 1);
    root.setAttribute('aria-label', `${index + 1}. bölüm: ${chapter.title}`);
    const paragraphs = (chapter.paragraphs || []).map(p => `<p>${escapeHTML(p)}</p>`).join('');
    const quote = chapter.quote ? `<blockquote class="chapter-quote">${escapeHTML(chapter.quote)}</blockquote>` : '';
    const lines = chapter.lines?.length ? `<ul class="${layoutWords.includes('poem') ? 'poem-lines' : 'line-list'}">${chapter.lines.map(line => `<li>${escapeHTML(line)}</li>`).join('')}</ul>` : '';
    const note = chapter.note ? `<p class="chapter-note">${escapeHTML(chapter.note)}</p>` : '';
    const body = layoutWords.includes('message')
      ? `<div class="quote-paper">${quote}</div>${note}${paragraphs}`
      : `${quote}${lines}${paragraphs}${note}`;
    const finish = layoutWords.includes('ending')
      ? '<span aria-hidden="true" class="ending-heart">♡</span><button type="button" class="restart-button">En baştan oku ↗</button>'
      : '';
    root.innerHTML = `<div class="chapter-inner"><h2>${escapeHTML(chapter.title)}</h2>${body}${finish}</div>`;
    return root;
  };

  chapters.forEach((chapter, index) => container.appendChild(createChapter(chapter, index)));
  const sections = [...container.querySelectorAll('.chapter')];
  const pad = n => String(n).padStart(2, '0');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  container.querySelector('.restart-button')?.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'instant'});
  });

  let ticking = false;
  function update() {
    ticking = false;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const max = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
    const percent = Math.min(100, Math.max(0, (scrollTop / max) * 100));
    fill.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', String(Math.round(percent)));

    let current = 0;
    const midpoint = scrollTop + viewportHeight * .46;
    for (let i = 1; i < sections.length; i++) {
      if (sections[i].offsetTop <= midpoint) current = i;
      else break;
    }
    count.textContent = `${pad(current + 1)} / ${pad(chapters.length)}`;
    const finished = current === sections.length - 1;
    footerLabel.textContent = finished ? 'son sayfa' : 'aşağı kaydır';
    arrow.textContent = finished ? '♡' : '↓';
  }
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onScroll, {passive: true});
  update();

  // Sections are always readable. Reveal animation is optional, never hides text.
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      }
    }, {root: null, threshold: 0.08});
    sections.forEach(section => observer.observe(section));
  }
})();
