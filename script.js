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

    /* --- Checkout Link Tracking & Bot Prevention --- */
    // Tracks clicks on any link going to Cakto and prevents bots from triggering UTMify IC
    const checkoutLinks = document.querySelectorAll('a[href*="pay.cakto.com.br"]');
    
    // First, remove utmify-ic class to prevent premature bot tracking 
    checkoutLinks.forEach(link => {
        if (link.classList.contains('utmify-ic')) {
            link.classList.remove('utmify-ic');
        }
        link.dataset.isCheckout = 'true'; // mark for later
        
        link.addEventListener('click', (e) => {
            // Anti-bot click verification
            if (!e.isTrusted) return;
            
            console.log('InitiateCheckout fired via click');
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout');
            }
        });
    });

    // Strategy to add utmify-ic back ONLY when a real human interaction occurs
    let humanInteracted = false;
    const enableUtmifyTracking = () => {
        if (humanInteracted) return;
        humanInteracted = true;
        
        console.log("Human interaction detected, enabling UTMify checkouts");
        document.querySelectorAll('a[data-is-checkout="true"]').forEach(link => {
            link.classList.add('utmify-ic');
        });

        // Cleanup event listeners
        ['mousemove', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
            window.removeEventListener(evt, enableUtmifyTracking);
        });
    };

    // Attach passive listeners for human interaction
    ['mousemove', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        window.addEventListener(evt, enableUtmifyTracking, { once: true, passive: true });
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
