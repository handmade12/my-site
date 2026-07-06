/* ============================================
   Personal Site — Interactions + i18n
   ============================================ */

'use strict';

/* ---- i18n: apply translations ---- */
function applyLanguage(lang) {
  if (!i18n[lang]) return;
  const t = i18n[lang];

  // Elements with data-i18n (skip btn-code — handled separately)
  document.querySelectorAll('[data-i18n]:not(.btn-code)').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Update lang toggle button text
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.textContent = t.lang_btn;

  // Live translation for code-toggle buttons (not keyed via data-i18n)
  document.querySelectorAll('.btn-code').forEach(btn => {
    const targetEl = document.getElementById(btn.dataset.target);
    const isOpen = targetEl ? targetEl.classList.contains('open') : false;
    const icon = btn.querySelector('.icon');
    if (isOpen) {
      btn.innerHTML = (icon ? icon.outerHTML + ' ' : '') + t.btn_hide_code;
    } else {
      btn.innerHTML = (icon ? icon.outerHTML + ' ' : '') + t.btn_show_code;
    }
  });

  // Copy buttons
  document.querySelectorAll('.btn-copy').forEach(btn => {
    if (!btn.classList.contains('copied')) {
      btn.textContent = t.btn_copy;
    }
  });

  // Update <title>
  if (t.page_title) {
    document.title = t.page_title;
  }

  // Update <meta name="description">
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.meta_desc) {
    metaDesc.setAttribute('content', t.meta_desc);
  }

  // Save preference
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
}

/* ---- Hero typewriter effect ---- */
function typeWriter(el, html, speed = 35) {
  el.innerHTML = '';
  let pos = 0;

  function step() {
    if (pos >= html.length) {
      return;
    }

    if (html[pos] === '<') {
      const end = html.indexOf('>', pos) + 1;
      el.innerHTML += html.slice(pos, end);
      pos = end;
    } else {
      el.innerHTML += html[pos];
      pos++;
    }

    setTimeout(step, speed);
  }

  setTimeout(step, 600);
}

/* ---- i18n: detect & init ---- */
function getInitialLang() {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;
  const browserLang = navigator.language || navigator.userLanguage || '';
  return browserLang.startsWith('ru') ? 'ru' : 'en';
}

/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Language toggle ---- */
  let currentLang = getInitialLang();
  applyLanguage(currentLang);

  // Hero typewriter on initial load
  const heroTitle = document.querySelector('h1[data-i18n="hero_title"]');
  if (heroTitle && currentLang === 'ru') {
    typeWriter(heroTitle, i18n.ru.hero_title);
  } else if (heroTitle) {
    typeWriter(heroTitle, i18n.en.hero_title);
  }

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'ru' ? 'en' : 'ru';
      applyLanguage(currentLang);
      const navDesktop = document.getElementById('navDesktop');
      if (navDesktop) navDesktop.classList.remove('open');
      if (document.getElementById('menuToggle')) {
        document.getElementById('menuToggle').textContent = '☰';
      }
    });
  }

  /* ---- Project filter tabs ---- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('#arduino .project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      projectCards.forEach(card => {
        if (card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.classList.add('visible');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Apply initial filter on load
  const activeTab = document.querySelector('.filter-tab.active');
  if (activeTab) activeTab.click();

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('header');
  const headerScrolledClass = 'scrolled';

  const onScroll = () => {
    requestAnimationFrame(() => {
      header.classList.toggle(headerScrolledClass, window.scrollY > 50);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  const menuToggle = document.getElementById('menuToggle');
  const navDesktop = document.getElementById('navDesktop');

  if (menuToggle && navDesktop) {
    menuToggle.addEventListener('click', () => {
      navDesktop.classList.toggle('open');
      menuToggle.textContent = navDesktop.classList.contains('open') ? '✕' : '☰';
    });

    navDesktop.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navDesktop.classList.remove('open');
        menuToggle.textContent = '☰';
      });
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a');

  const onScrollSpy = () => {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  /* ---- Scroll-triggered animations ---- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  } else {
    const animateElements = () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', animateElements, { passive: true });
    animateElements();
  }

  /* ---- Code block toggle (i18n-aware) ---- */
  document.querySelectorAll('.btn-code').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const codeBlock = document.getElementById(targetId);
      if (!codeBlock) return;

      const isOpen = codeBlock.classList.toggle('open');
      btn.classList.toggle('active', isOpen);

      const t = i18n[currentLang];
      const icon = btn.querySelector('.icon') || document.createElement('span');
      if (!btn.querySelector('.icon')) {
        icon.className = 'icon';
        btn.prepend(icon);
      }
      icon.textContent = isOpen ? '▲' : '▼';
      const text = isOpen ? t.btn_hide_code : t.btn_show_code;
      btn.innerHTML = icon.outerHTML + ' ' + text;
    });
  });

  /* ---- Copy code button (i18n-aware) ---- */
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.target;
      const codeBlock = document.getElementById(targetId);
      if (!codeBlock) return;

      const codePre = codeBlock.querySelector('pre');
      if (!codePre) return;

      const codeText = codePre.textContent || codePre.innerText;
      const t = i18n[currentLang];

      try {
        await navigator.clipboard.writeText(codeText.trim());
        btn.textContent = t.btn_copied;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = t.btn_copy;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = codeText.trim();
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.textContent = t.btn_copied;
        setTimeout(() => {
          btn.textContent = t.btn_copy;
        }, 2000);
      }
    });
  });

  /* ---- Line numbers for code blocks ---- */
  function addLineNumbers() {
    document.querySelectorAll('.code-block pre').forEach(pre => {
      // Skip if already numbered
      if (pre.querySelector('.line-num')) return;

      const html = pre.innerHTML;
      const lines = html.split('\n');
      pre.innerHTML = lines.map((line, i) => {
        if (i === lines.length - 1 && line.trim() === '') return '';
        return `<span class="line-num">${i + 1}</span>${line}`;
      }).join('\n');
    });
  }
  addLineNumbers();

  // Re-add on code block open (content was hidden)
  document.querySelectorAll('.btn-code').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const codeBlock = document.getElementById(targetId);
      if (codeBlock && codeBlock.classList.contains('open')) {
        const pre = codeBlock.querySelector('pre');
        if (pre && !pre.querySelector('.line-num')) {
          const html = pre.innerHTML;
          const lines = html.split('\n');
          pre.innerHTML = lines.map((line, i) => {
            if (i === lines.length - 1 && line.trim() === '') return '';
            return `<span class="line-num">${i + 1}</span>${line}`;
          }).join('\n');
        }
      }
    });
  });

  /* ---- Smooth reveal on page load ---- */
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), 200);
    }
  });

});
