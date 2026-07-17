document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Code editor tabs ---------- */
  const tabs = document.querySelectorAll('.editor-tab');
  const panes = document.querySelectorAll('.editor-pane');
  const gutter = document.getElementById('editorGutter');

  function buildGutter(pane) {
    if (!gutter || !pane) return;
    const lineCount = pane.innerHTML.split('\n').length;
    gutter.innerHTML = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  }

  function activateTab(target) {
    tabs.forEach((t) => {
      const active = t.dataset.target === target;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    panes.forEach((p) => p.classList.toggle('is-active', p.id === target));
    const activePane = document.getElementById(target);
    buildGutter(activePane);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.target));
  });

  const firstPane = document.querySelector('.editor-pane.is-active');
  buildGutter(firstPane);
});
