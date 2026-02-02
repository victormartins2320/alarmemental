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

});
