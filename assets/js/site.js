const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.getElementById('site-nav');
const scrollTopBtn = document.querySelector('[data-scroll-top]');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
}

const onScroll = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('is-visible', window.scrollY > 700);
};
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12, rootMargin: '0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

document.querySelectorAll('[data-contact-form]').forEach(form => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim() || 'Consulta desde el sitio';
    const message = String(data.get('message') || '').trim();
    const body = ['Nombre: ' + name, 'Email: ' + email, '', message].join('\n');
    window.location.href = 'mailto:contacto@marchi.cl?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
});
