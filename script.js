const navigation = document.querySelector('.navigation');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const mobileViewport = window.matchMedia('(max-width: 767px)');

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuButton || !navLinks) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('is-open');
  const icon = menuButton.querySelector('span');
  if (icon) icon.textContent = '+';
  if (restoreFocus) menuButton.focus();
}

function syncNavigation() {
  if (!menuButton || !navLinks) return;
  const focusWillBeHidden = mobileViewport.matches && navLinks.contains(document.activeElement);
  closeMenu();
  menuButton.hidden = !mobileViewport.matches;
  if (focusWillBeHidden) menuButton.focus();
}

if (navigation && menuButton && navLinks) {
  navigation.classList.add('is-enhanced');
  syncNavigation();
  mobileViewport.addEventListener('change', syncNavigation);

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    navLinks.classList.toggle('is-open', expanded);
    const icon = menuButton.querySelector('span');
    if (icon) icon.textContent = expanded ? '−' : '+';
  });

  navigation.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });

  navLinks.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobileViewport.matches) return;
    closeMenu();
  });

  navigation.addEventListener('focusout', (event) => {
    if (!navigation.contains(event.relatedTarget)) closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target)) closeMenu();
  });
}

const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
      if (isCurrent) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -65%', threshold: [0, 0.2, 0.5] });
  sections.forEach((section) => sectionObserver.observe(section));
}

const revealItems = [...document.querySelectorAll('[data-reveal]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window && revealItems.length) {
  document.documentElement.classList.add('reveal-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8%', threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));
}
