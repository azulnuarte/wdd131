document.addEventListener("DOMContentLoaded", function () {
        const lazyImages = document.querySelectorAll('img.lazy');

        const lazyLoad = (image) => {
            const src = image.getAttribute('data-src');
            if (src) {
                image.src = src;
                image.classList.remove('lazy'); 
            }
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoad(entry.target);
                    observer.unobserve(entry.target); 
                }
            });
        });

        lazyImages.forEach(image => {
            observer.observe(image); 
        });
    });

