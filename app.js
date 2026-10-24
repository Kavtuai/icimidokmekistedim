const chapters=window.LETTER.chapters;
const story=document.querySelector('#story');
const safe=(v)=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
// Titles are trusted editable content; <i> is intentionally supported for typographic emphasis.
const titleHtml=(v)=>safe(v).replaceAll('&lt;i&gt;','<i>').replaceAll('&lt;/i&gt;','</i>').replaceAll('\n','<br>');
chapters.forEach((c,i)=>{
 const section=document.createElement('section');section.className=`scene scene--${c.kind}`;section.id=i===0?'baslangic':`sayfa-${i+1}`;section.dataset.index=i;
 const number=c.number?`<span class="chapter-number">${safe(c.number)} <span class="chapter-line"></span></span>`:'';
 const tag=`<span class="eyebrow">${safe(c.tag)}</span>`;
 const heading=`<h1 class="scene-title">${titleHtml(c.title)}</h1>`;
 const highlight=c.highlight?`<p class="highlight">${safe(c.highlight)}</p>`:'';
 const body=`<p class="scene-body">${safe(c.body)}</p>`;
 const footer=c.footer?`<span class="scene-footer">${safe(c.footer)}</span>`:'';
 const ornament=c.kind==='cover'?'<div class="flower" aria-hidden="true"><span></span><span></span><span></span><span></span><b>✦</b></div>':c.kind==='pause'?'<div class="orbit" aria-hidden="true"><span>✳</span></div>':c.kind==='ending'?'<div class="final-line" aria-hidden="true"><span>♡</span></div>':'';
 section.innerHTML=`<div class="scene-backdrop" aria-hidden="true"></div><div class="scene-inner">${number}<div class="scene-content">${tag}${heading}${highlight}${body}${ornament}</div>${footer}</div>`;
 story.appendChild(section);
});
const scenes=[...document.querySelectorAll('.scene')],fill=document.querySelector('#progressFill'),counter=document.querySelector('#pageCounter'),caption=document.querySelector('#bottomCaption');
let active=0;
const update=(i)=>{active=i;fill.style.width=`${(i+1)/scenes.length*100}%`;counter.textContent=`${String(i+1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}`;caption.textContent=i===scenes.length-1?'son sayfa':i===0?'biraz aşağı kaydır':'okumaya devam et';document.body.classList.toggle('at-end',i===scenes.length-1)};
const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('is-visible');if(e.intersectionRatio>=.52)update(Number(e.target.dataset.index));}}},{root:story,threshold:[.15,.52,.8]});scenes.forEach(s=>observer.observe(s));update(0);
window.addEventListener('keydown',e=>{if(document.querySelector('#helpDialog').open)return;if(['ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();scenes[Math.min(active+1,scenes.length-1)].scrollIntoView({behavior:'smooth'});}if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();scenes[Math.max(active-1,0)].scrollIntoView({behavior:'smooth'});}});
const dialog=document.querySelector('#helpDialog');document.querySelector('#helpButton').addEventListener('click',()=>dialog.showModal());document.querySelector('#closeHelp').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
