class PortfolioNav extends HTMLElement {
  constructor() {
    super();
    this.hover = new Audio('audio/hover.wav');
    this.click = new Audio('audio/click.wav');
    this.hover.preload = 'auto';
    this.click.preload = 'auto';
  }
  connectedCallback() {
    this.innerHTML = `
      <div class="topnav">
        <button data-section="about">ABOUT</button>
        <button data-section="projects">PROJECTS</button>
        <button data-section="experience">EXPERIENCE</button>
      </div>
    `;
    this.addEventListener('mouseenter', e => {
      if (e.target.tagName === 'BUTTON') {
        try { this.hover.currentTime = 0; this.hover.play(); } catch(_) {}
      }
    }, true);
    this.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        try { this.click.currentTime = 0; this.click.play(); } catch(_) {}
        PageRouter.showSection(e.target.dataset.section);
      }
    });
  }
}
customElements.define('portfolio-nav', PortfolioNav);

class TypeWriter {
  constructor(node, text, speed=25) {
    this.node = node;
    this.text = text || '';
    this.speed = speed;
    this.i = 0;
    this.f = null;
    this.last = 0;
  }
  start() {
    if (!this.node) return;
    this.node.textContent = '';
    const step = t => {
      if (!this.node) return;
      if (t - this.last > this.speed && this.i < this.text.length) {
        this.node.textContent += this.text[this.i++];
        this.last = t;
      }
      if (this.i < this.text.length) this.f = requestAnimationFrame(step);
    };
    this.f = requestAnimationFrame(step);
  }
  stop() {
    if (this.f) cancelAnimationFrame(this.f);
    this.f = null;
  }
  accelerate(n=5) { this.speed = n; }
}

const SectionTyper = (() => {
  const IGNORE_TAGS = ['SCRIPT','STYLE','BUTTON','INPUT','TEXTAREA','IMG','SVG','VIDEO','AUDIO'];
  const IGNORE_SELECTORS = ['.top','portfolio-nav','#title-about','#title-skills','#title-projects','#title-experience','#title-contact'];

  function skip(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return true;
    if (!node.nodeValue || !node.nodeValue.trim()) return true;
    const p = node.parentElement;
    if (!p) return true;
    if (IGNORE_TAGS.includes(p.tagName)) return true;
    for (let s of IGNORE_SELECTORS) if (p.closest(s)) return true;
    return false;
  }

  function wrap(node, d) {
    const t = node.nodeValue;
    const frag = document.createDocumentFragment();
    let delay = d;
    for (const ch of t) {
      if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); delay += 1; continue; }
      const span = document.createElement('span');
      span.className = 'tw-ch';
      span.textContent = ch;
      span.style.animationDelay = delay + 'ms';
      frag.appendChild(span);
      delay += 12;
    }
    node.replaceWith(frag);
    return delay;
  }

  function speedUp(el) {
    const chars = Array.from(el.querySelectorAll('.tw-ch'));
    if (!chars.length) return;
    let start = 0;
    for (let i = 0; i < chars.length; i++) {
      const op = getComputedStyle(chars[i]).opacity;
      if (op === '0') { start = i; break; }
      start = i + 1;
    }
    if (start >= chars.length) return;
    let fast = 0;
    for (let i = start; i < chars.length; i++) {
      const s = chars[i];
      s.style.animation = 'none';
      s.offsetHeight;
      s.style.animation = '';
      s.style.animationDelay = fast + 'ms';
      fast += 2;
    }
  }

  function typeSection(el) {
    if (!el) return;
    if (!el.dataset.originalHtml) el.dataset.originalHtml = el.innerHTML;
    else el.innerHTML = el.dataset.originalHtml;
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = w.nextNode())) if (!skip(n)) nodes.push(n);
    let d = 250;
    for (const node of nodes) d = wrap(node, d);
    setTimeout(() => speedUp(el), 1000);
  }

  return { typeSection };
})();

const PageRouter = (() => {
  const SECTIONS = ['about','skills','projects','experience','contact'];
  const TITLES = { about:'ABOUT', skills:'SKILLS', projects:'PROJECTS', experience:'EXPERIENCE', contact:'CONTACT' };
  const writers = {};

  function showSection(id) {
    SECTIONS.forEach(name => {
      const el = document.getElementById(name);
      if (!el) return;
      el.classList.toggle('active', name === id);
      if (name !== id && writers[name]) writers[name].stop();
    });

    const title = document.getElementById('title-' + id);
    if (title) {
      writers[id] = new TypeWriter(title, TITLES[id], 30 + Math.random() * 20);
      writers[id].start();
      setTimeout(() => { if (writers[id]) writers[id].accelerate(5); }, 1000);
    }

    const section = document.getElementById(id);
    if (id !== 'projects') SectionTyper.typeSection(section);

    try { history.replaceState({}, '', '#' + id); } catch(_) {}
  }

  return { showSection };
})();

window.addEventListener('DOMContentLoaded', () => {
  const hum = new Audio('audio/backgroundMusic.mp3');
  hum.loop = true;
  hum.volume = 0.3;

  function startAudio() {
    hum.play().catch(()=>{});
    document.removeEventListener('pointerdown', startAudio);
  }
  document.addEventListener('pointerdown', startAudio, { once: true });

  const first = location.hash ? location.hash.replace('#','') : 'about';
  PageRouter.showSection(first);
});
