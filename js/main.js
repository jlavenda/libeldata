function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('active'));
    if (!isOpen) { answer.classList.add('open'); btn.classList.add('active'); }
  }


  // DYNAMIC HERO HEIGHT
  function ajustarHero() {
    const carousel = document.querySelector('.carousel-section');
    const hero = document.querySelector('.hero');
    if (carousel && hero) {
      const alturaReal = window.innerHeight - carousel.offsetHeight;
      hero.style.minHeight = alturaReal + 'px';
    }
  }
  ajustarHero();
  window.addEventListener('resize', ajustarHero);

  // SCROLL ANIMATIONS
  function initAnimations() {
    const animEls = document.querySelectorAll('[data-anim]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    animEls.forEach((el, i) => {
      // For hero elements already in view, animate with short delay
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        const delay = parseInt(el.dataset.delay || 0) + (i * 80);
        setTimeout(() => el.classList.add('visible'), delay + 100);
      } else {
        observer.observe(el);
      }
    });
  }

  // Run after page fully loaded
  if (document.readyState === 'complete') {
    initAnimations();
  } else {
    window.addEventListener('load', initAnimations);
  }

  function showPanel(idx) {
    document.querySelectorAll('.service-item').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
    const panels = document.querySelectorAll('.service-panel');
    const current = [...panels].find(p => p.classList.contains('active'));
    const next = panels[idx];
    if (current && current !== next) {
      current.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      current.style.opacity = '0';
      current.style.transform = 'translateY(8px)';
      setTimeout(() => {
        current.classList.remove('active');
        current.style.transform = '';
        next.style.opacity = '0';
        next.style.transform = 'translateY(-8px)';
        next.classList.add('active');
        setTimeout(() => {
          next.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          next.style.opacity = '1';
          next.style.transform = 'translateY(0)';
        }, 20);
      }, 300);
    } else if (!current) {
      next.classList.add('active');
      next.style.opacity = '1';
    }
  }
  let atBottom = false;
  const icon = document.getElementById('floatIcon');
  function updateBtn() {
    atBottom = window.scrollY > (document.body.scrollHeight - window.innerHeight) * 0.5;
    // At top → show down arrow; scrolled → show up arrow
    icon.innerHTML = atBottom
      ? '<path d="M18 15l-6-6-6 6"/>'
      : '<path d="M6 9l6 6 6-6"/>';
  }
  window.addEventListener('scroll', updateBtn);
  updateBtn();
  function scrollToggle() {
    window.scrollTo({ top: atBottom ? 0 : document.body.scrollHeight, behavior: 'smooth' });
  }