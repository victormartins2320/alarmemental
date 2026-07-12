// ================================================
//  Alarme Mental — Premium Script (Dark Neon & Dynamic Mobile Funnel)
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---- 2. Scroll reveal animations ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger effect for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 60;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12,
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- 3. Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- 4. Floating mobile CTA: Dynamic Funnel Navigation ----
  const floatingCta = document.getElementById('floating-cta');
  const floatingCtaBtn = document.getElementById('floating-cta-btn');

  const steps = [
    { id: 'hero', target: '#prova-visual', text: 'Ver Demonstração' },
    { id: 'prova-visual', target: '#identificacao', text: 'Identificar Padrões' },
    { id: 'identificacao', target: '#metodo', text: 'Ver como Funciona' },
    { id: 'metodo', target: '#entregaveis', text: 'Ver o que Recebo' },
    { id: 'entregaveis', target: '#beneficios', text: 'Ver Resultados Práticos' },
    { id: 'beneficios', target: '#comparacao', text: 'Ver Antes vs Depois' },
    { id: 'comparacao', target: '#area-membros', text: 'Ver Área de Membros' },
    { id: 'area-membros', target: '#garantia', text: 'Ver Garantia Risco Zero' },
    { id: 'garantia', target: '#oferta', text: 'Escolher Meu Plano' },
    { id: 'oferta', hide: true },
    { id: 'faq', hide: true },
    { id: 'cta-final', hide: true }
  ];

  const handleMobileFunnel = () => {
    if (!floatingCta || !floatingCtaBtn) return;

    if (window.innerWidth > 640) {
      floatingCta.classList.remove('show');
      return;
    }

    if (window.scrollY < 150) {
      floatingCta.classList.remove('show');
      return;
    }

    // Determine current active section on mobile screen
    const viewportHeight = window.innerHeight;
    let currentStep = null;

    for (let i = 0; i < steps.length; i++) {
      const el = document.getElementById(steps[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        // If section header/body falls within active viewport center
        if (rect.top <= viewportHeight * 0.55 && rect.bottom >= viewportHeight * 0.2) {
          currentStep = steps[i];
        }
      }
    }

    if (currentStep) {
      if (currentStep.hide) {
        floatingCta.classList.remove('show');
      } else {
        floatingCta.classList.add('show');
        floatingCtaBtn.setAttribute('href', currentStep.target);
        floatingCtaBtn.innerHTML = `<i class="fa-solid fa-arrow-down"></i> ${currentStep.text}`;
      }
    }
  };

  window.addEventListener('scroll', handleMobileFunnel, { passive: true });
  window.addEventListener('resize', handleMobileFunnel, { passive: true });

  // ---- 5. CTA click tracking ----
  document.querySelectorAll('[id$="-cta-btn"], [id^="hero-cta"], [id="floating-cta-btn"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof ttq !== 'undefined') {
        ttq.track('ClickButton', { content_name: 'CTA Click' });
      }
    });
  });

  // ---- 6. FAQ accordion exclusive toggle ----
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', function () {
      if (this.open) {
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== this && other.open) other.open = false;
        });
      }
    });
  });

});
