/* ===================================
   EL NIÑO 2026 — JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== SCROLL ANIMATION =====
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  // Animate children with stagger for grid containers
  document.querySelectorAll('.impact-cards, .modules-grid, .stats-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-answer').classList.remove('open');
        f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ===== HERO MOCKUP FALLBACK =====
  // If the mockup image fails, show a beautiful placeholder
  const mockupImg = document.getElementById('hero-mockup');
  if (mockupImg) {
    mockupImg.addEventListener('error', () => {
      mockupImg.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.className = 'mockup-placeholder';
      placeholder.innerHTML = buildMockupHTML();
      mockupImg.parentElement.appendChild(placeholder);
    });
    // Also check if image hasn't loaded yet
    if (mockupImg.complete && mockupImg.naturalWidth === 0) {
      mockupImg.dispatchEvent(new Event('error'));
    }
  }

  function buildMockupHTML() {
    const modules = [
      { num: '01', icon: '🌊', title: 'Entendendo o El Niño', color: '#1e4a8a' },
      { num: '02', icon: '💸', title: 'Impactos no Seu Bolso', color: '#1a3a6b' },
      { num: '03', icon: '🛍️', title: 'Compras Inteligentes', color: '#1e4a8a' },
      { num: '04', icon: '💧', title: 'Economia de Recursos', color: '#1a3a6b' },
      { num: '05', icon: '🛡️', title: 'Preparação p/ Emergências', color: '#1e4a8a' },
      { num: '06', icon: '👨‍👩‍👧‍👦', title: 'Plano Familiar', color: '#ea580c' },
    ];

    const cards = modules.map((m, i) => `
      <div style="
        background: ${m.color};
        border-radius: 10px;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        transform: ${i % 2 === 0 ? 'rotate(-1deg)' : 'rotate(0.5deg)'};
        transition: transform 0.3s ease;
        border: 1px solid rgba(255,255,255,0.1);
      ">
        <span style="font-size: 1.4rem;">${m.icon}</span>
        <div>
          <div style="font-size: 0.62rem; color: rgba(255,255,255,0.5); font-weight:700; letter-spacing:0.1em; text-transform:uppercase; font-family:'Outfit',sans-serif;">Módulo ${m.num}</div>
          <div style="font-size: 0.8rem; color: white; font-weight: 700; font-family:'Outfit',sans-serif; line-height:1.3;">${m.title}</div>
        </div>
      </div>
    `).join('');

    return `
      <div style="
        background: linear-gradient(135deg, #0f2447, #0a1628);
        border-radius: 20px;
        padding: 28px 24px;
        border: 2px solid rgba(255,255,255,0.08);
        box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        max-width: 420px;
        animation: float 6s ease-in-out infinite;
      ">
        <div style="text-align:center; margin-bottom:20px;">
          <div style="
            font-family:'Outfit',sans-serif;
            font-size: 1.1rem;
            font-weight: 900;
            color: white;
            letter-spacing: -0.01em;
          ">🌡️ EL NIÑO 2026</div>
          <div style="font-size:0.75rem; color: rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.12em; margin-top:4px;">Guia de Preparação Familiar</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${cards}
        </div>
        <div style="
          margin-top: 20px;
          background: linear-gradient(135deg, #ea580c, #f97316);
          border-radius: 10px;
          padding: 14px;
          text-align: center;
        ">
          <div style="font-family:'Outfit',sans-serif; font-size:0.8rem; color:white; font-weight:800; text-transform:uppercase; letter-spacing:0.08em;">✓ 6 Módulos · Acesso Imediato</div>
        </div>
      </div>
    `;
  }

  // ===== PARALLAX SUBTLE EFFECT =====
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroBg = document.querySelector('.hero::before');
        // Subtle parallax on hero elements
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && scrollY < window.innerHeight) {
          heroTitle.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // ===== MODULE CARD HOVER 3D =====
  document.querySelectorAll('.module-card, .impact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== TOPBAR HIDE ON SCROLL =====
  const topbar = document.getElementById('topbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 200) {
      topbar.style.transform = 'translateY(-100%)';
      topbar.style.transition = 'transform 0.3s ease';
    } else {
      topbar.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  });

  // ===== COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => counterObserver.observe(el));

  // ===== PRICE HIGHLIGHT PULSE =====
  const priceEl = document.getElementById('offer-price');
  if (priceEl) {
    setInterval(() => {
      priceEl.style.transform = 'scale(1.05)';
      priceEl.style.transition = 'transform 0.2s ease';
      setTimeout(() => {
        priceEl.style.transform = 'scale(1)';
      }, 200);
    }, 4000);
  }

  // ===== INITIAL HERO ANIMATION =====
  setTimeout(() => {
    const heroText = document.querySelector('.hero-text');
    if (heroText) heroText.classList.add('visible');
  }, 100);
  setTimeout(() => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) heroImage.classList.add('visible');
  }, 300);

});
