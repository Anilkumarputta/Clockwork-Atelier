// animations.js
document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // 0. ACTIVE NAV LINK ON SCROLL
    // ========================================
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const navSections = navLinks
        .map((link) => {
            const hash = link.getAttribute('href');
            if (!hash || !hash.startsWith('#')) {
                return null;
            }
            const id = hash.slice(1);
            const section = document.getElementById(id);
            return section ? { section, link } : null;
        })
        .filter(Boolean);

    if (navSections.length) {
        let navTicking = false;
        // Keep scroll work lightweight using rAF
        const updateActiveNav = () => {
            const scrollPos = window.scrollY || window.pageYOffset;
            const offset = 80;
            navSections.forEach(({ section, link }) => {
                const top = section.getBoundingClientRect().top + window.scrollY - offset;
                const bottom = top + section.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            navTicking = false;
        };

        window.addEventListener('scroll', function() {
            if (navTicking) return;
            navTicking = true;
            window.requestAnimationFrame(updateActiveNav);
        }, { passive: true });

        updateActiveNav();
    }
    // ========================================
    // 1. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Reveal sections once as they enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateElements.forEach((el) => observer.observe(el));

    // ========================================
    // 2. BACK TO TOP BUTTON
    // ========================================
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        let backToTopTicking = false;
        // Toggle button visibility without heavy scroll work
        window.addEventListener('scroll', function() {
            if (backToTopTicking) return;
            backToTopTicking = true;
            window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
                backToTopTicking = false;
            });
        }, { passive: true });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 3. LIGHTBOX FOR PROJECT IMAGES
    // ========================================
    const projectImages = document.querySelectorAll('.project img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxDownload = document.querySelector('.lightbox-download');

    if (projectImages.length && lightbox) {
        projectImages.forEach((img) => {
            img.addEventListener('click', function() {
                const project = this.closest('.project');
                const title = project ? project.querySelector('p') : null;
                const meta = project ? project.querySelector('.project-meta') : null;
                const description = project ? project.getAttribute('data-desc') || '' : '';
                const captionParts = [];

                if (title) {
                    captionParts.push(title.textContent.replace(/\s+/g, ' ').trim());
                }
                if (meta) {
                    captionParts.push(meta.textContent.trim());
                }

                const caption = captionParts.length ? captionParts.join(' · ') : (this.alt || '');

                if (lightboxImage) {
                    lightboxImage.src = this.src;
                    lightboxImage.alt = this.alt || 'Project image';
                }
                if (lightboxCaption) lightboxCaption.textContent = caption;
                if (lightboxDescription) {
                    lightboxDescription.textContent = description || 'Material study with brass, steel, and hand-finished surfaces.';
                }
                if (lightboxDownload) {
                    lightboxDownload.href = this.src;
                    const fileName = this.src.split('/').pop() || 'project-image';
                    lightboxDownload.setAttribute('download', fileName);
                }

                // Open the lightbox and lock background scroll
                lightbox.classList.add('show');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
        });

        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            // Reset lightbox content for a clean next open
            lightbox.classList.remove('show');
            lightbox.setAttribute('aria-hidden', 'true');
            if (lightboxImage) lightboxImage.src = '';
            if (lightboxCaption) lightboxCaption.textContent = '';
            if (lightboxDescription) lightboxDescription.textContent = '';
            if (lightboxDownload) lightboxDownload.href = '#';
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    // ========================================
    // 4. RIPPLE EFFECT ON BUTTONS
    // ========================================
    const buttons = document.querySelectorAll('button, .social-button');

    buttons.forEach((button) => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========================================
    // 5. LOADER REMOVAL
    // ========================================
    const loader = document.getElementById('loader');

    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 500); // Show loader for at least 500ms
        });
    }

    // ========================================
    // 6. LAZY LOADING IMAGES (OPTIONAL ENHANCEMENT)
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window && lazyImages.length) {
        const imageObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observerInstance.unobserve(img);
                }
            });
        });

        lazyImages.forEach((img) => imageObserver.observe(img));
    }

    // ========================================
    // 7. PROJECT FILTER ARIA STATE
    // ========================================
    const filterInputs = document.querySelectorAll('input[name="project-filter"]');
    const filterLabels = document.querySelectorAll('.project-filters label');

    if (filterInputs.length && filterLabels.length) {
        const updateFilterAria = () => {
            filterLabels.forEach((label) => {
                const inputId = label.getAttribute('for');
                const input = inputId ? document.getElementById(inputId) : null;
                label.setAttribute('aria-selected', input && input.checked ? 'true' : 'false');
            });
        };

        filterInputs.forEach((input) => {
            input.addEventListener('change', updateFilterAria);
        });

        updateFilterAria();
    }

    // ========================================
    // 8. END
    // ========================================
});
