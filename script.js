document.addEventListener('DOMContentLoaded', () => {

    /* --- Smooth Scroll for specific anchors --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // If it's just a hash that doesn't correspond to an ID, ignore
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Checkout Link Tracking Event --- */
    // Tracks clicks on any link going to Cakto
    const checkoutLinks = document.querySelectorAll('a[href*="pay.cakto.com.br"]');
    checkoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('InitiateCheckout fired');
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout');
            }
            // Optional: Add other pixels here if needed
        });
    });

    /* --- Intersection Observer for Animations --- */
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    /* --- Countdown Timer --- */
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        const interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration; // Reset or stop
            }
        }, 1000);
    }

    const fifteenMinutes = 60 * 15;
    const display = document.querySelector('#countdown');
    if (display) {
        startTimer(fifteenMinutes, display);
    }
    /* --- Floating CTA Visibility --- */
    const floatingCta = document.querySelector('#floating-cta');
    if (floatingCta) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }
});
