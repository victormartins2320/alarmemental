// ================================================
//  Alarme Mental — Premium Script
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
    entries.forEach((entry, i) => {
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

  // ---- 4. Floating mobile CTA ----
  const floatingCta = document.getElementById('floating-cta');
  let lastScroll = 0;

  const handleFloatingCta = () => {
    if (window.innerWidth > 640) {
      floatingCta.classList.remove('show');
      return;
    }
    const current = window.scrollY;
    if (current > 600) {
      floatingCta.classList.add('show');
    } else {
      floatingCta.classList.remove('show');
    }
    lastScroll = current;
  };

  window.addEventListener('scroll', handleFloatingCta, { passive: true });

  // ---- 5. Progress bar animation (method section) ----
  const progressFill = document.querySelector('.mcb-progress-fill');
  if (progressFill) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFill.style.width = '33%';
          progressObserver.unobserve(entry.target);
        } else {
          progressFill.style.width = '0%';
        }
      });
    }, { threshold: 0.5 });
    progressObserver.observe(progressFill);
    progressFill.style.width = '0%';
  }

  // ---- 6. CTA click tracking ----
  document.querySelectorAll('[id$="-cta-btn"], [id^="hero-cta"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof ttq !== 'undefined') {
        ttq.track('ClickButton', { content_name: 'CTA Click' });
      }
    });
  });

  // ---- 7. FAQ accordion animation ----
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', function () {
      if (this.open) {
        // Close others
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== this && other.open) other.open = false;
        });
      }
    });
  });

});
