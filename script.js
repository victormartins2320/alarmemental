document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once the animation has triggered
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 2. Smooth scrolling for internal anchor links (fallback/enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Floating CTA Visibility
    const floatingCta = document.getElementById('floating-cta');
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            if (window.scrollY > 800) {
                floatingCta.style.display = 'block';
                setTimeout(() => floatingCta.classList.add('visible'), 10);
            } else {
                floatingCta.classList.remove('visible');
                setTimeout(() => {
                    if (!floatingCta.classList.contains('visible')) {
                        floatingCta.style.display = 'none';
                    }
                }, 400);
            }
        }
    });
});
