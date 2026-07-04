/* ============================================
   Personal Site — Interactions + i18n
   ============================================ */

'use strict';

/* ---- i18n: apply translations ---- */
function applyLanguage(lang) {
  if (!i18n[lang]) return;
  const t = i18n[lang];

  // Elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
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
    const isOpen = btn.closest('.code-block')
      ? btn.closest('.code-block').classList.contains('open')
      : false;
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

  // Save preference
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
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

  /* ---- Smooth reveal on page load ---- */
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), 200);
    }
  });

});
