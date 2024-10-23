document.addEventListener("DOMContentLoaded", function () {
        const lazyImages = document.querySelectorAll('img.lazy');

        const lazyLoad = (image) => {
            const src = image.getAttribute('data-src');
            if (src) {
                image.src = src;
                image.classList.remove('lazy'); // Remove the lazy class after loading
            }
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoad(entry.target);
                    observer.unobserve(entry.target); // Stop observing the image after it's loaded
                }
            });
        });

        lazyImages.forEach(image => {
            observer.observe(image); // Start observing each lazy image
        });
    });

