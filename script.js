// ================================================
//  Alarme Mental — V4 Light Premium Script
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
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1,
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
    { id: 'hero', target: '#para-quem', text: 'Saiba mais' },
    { id: 'para-quem', target: '#entregaveis', text: 'Ver o que recebo' },
    { id: 'entregaveis', target: '#beneficios', text: 'Ver resultados' },
    { id: 'beneficios', target: '#area-membros', text: 'Ver plataforma' },
    { id: 'area-membros', target: '#garantia', text: 'Ver garantia' },
    { id: 'garantia', target: '#oferta', text: 'Escolher meu plano' },
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

    const viewportHeight = window.innerHeight;
    let currentStep = null;

    for (let i = 0; i < steps.length; i++) {
      const el = document.getElementById(steps[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
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

  // ---- 7. Downsell Modal Trigger & Lifecycle ----
  const basicBtn = document.getElementById('basic-checkout-btn');
  const downsellModal = document.getElementById('downsell-modal');
  const closeBtn = document.getElementById('downsell-close-btn');

  if (basicBtn && downsellModal) {
    // Open Modal
    basicBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downsellModal.style.display = 'flex';
      downsellModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    // Close Modal Function
    const closeModal = () => {
      downsellModal.style.display = 'none';
      downsellModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    // Close on X Click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close on Overlay Background Click
    downsellModal.addEventListener('click', (e) => {
      if (e.target === downsellModal) {
        closeModal();
      }
    });
  }

});
