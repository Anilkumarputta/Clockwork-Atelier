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
    const revealAllAnimatedSections = () => {
        animateElements.forEach((el) => {
            if (!el.classList.contains('in-view')) {
                el.classList.add('in-view');
            }
        });
    };

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers/webviews: reveal content immediately.
        revealAllAnimatedSections();
    } else {
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

        // Failsafe for edge-case mobile browsers where observer callbacks may not fire.
        window.addEventListener('load', function() {
            setTimeout(revealAllAnimatedSections, 1600);
        }, { once: true });
    }

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
    const projectsGrid = document.querySelector('.projects');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxDownload = document.querySelector('.lightbox-download');

    if (projectsGrid && lightbox) {
        // Delegate image clicks so pagination/dynamic cards are supported.
        projectsGrid.addEventListener('click', function (event) {
            const img = event.target.closest('.project img');
            if (!img || !projectsGrid.contains(img)) return;

            const project = img.closest('.project');
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

            const caption = captionParts.length ? captionParts.join(' - ') : (img.alt || '');

            if (lightboxImage) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt || 'Project image';
            }
            if (lightboxCaption) lightboxCaption.textContent = caption;
            if (lightboxDescription) {
                lightboxDescription.textContent = description || 'Material study with brass, steel, and hand-finished surfaces.';
            }
            if (lightboxDownload) {
                lightboxDownload.href = img.src;
                const fileName = img.src.split('/').pop() || 'project-image';
                lightboxDownload.setAttribute('download', fileName);
            }

            // Open the lightbox and lock background scroll
            lightbox.classList.add('show');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });

        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
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
    // 8. HERO 3D PARALLAX (DESKTOP POINTERS)
    // ========================================
    const hero = document.querySelector('.hero');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hero && !prefersReducedMotion && supportsFinePointer) {
        let rafPending = false;
        let normalizedX = 0;
        let normalizedY = 0;

        const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

        const updateHeroDepth = () => {
            const maxTiltDeg = 7.5;
            const maxDepthPx = 18;
            const tiltX = (-normalizedY * maxTiltDeg).toFixed(2);
            const tiltY = (normalizedX * maxTiltDeg).toFixed(2);
            const depthX = (normalizedX * maxDepthPx).toFixed(2);
            const depthY = (normalizedY * maxDepthPx).toFixed(2);
            const glowX = (50 + normalizedX * 18).toFixed(2);
            const glowY = (35 + normalizedY * 14).toFixed(2);

            hero.style.setProperty('--hero-tilt-x', `${tiltX}deg`);
            hero.style.setProperty('--hero-tilt-y', `${tiltY}deg`);
            hero.style.setProperty('--hero-depth-x', `${depthX}px`);
            hero.style.setProperty('--hero-depth-y', `${depthY}px`);
            hero.style.setProperty('--hero-glow-x', `${glowX}%`);
            hero.style.setProperty('--hero-glow-y', `${glowY}%`);

            rafPending = false;
        };

        const queueDepthUpdate = () => {
            if (rafPending) return;
            rafPending = true;
            window.requestAnimationFrame(updateHeroDepth);
        };

        hero.addEventListener('mouseenter', () => {
            hero.classList.add('is-3d-active');
        });

        hero.addEventListener('mousemove', (event) => {
            const rect = hero.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
            normalizedX = clamp(x, -1, 1);
            normalizedY = clamp(y, -1, 1);
            queueDepthUpdate();
        });

        hero.addEventListener('mouseleave', () => {
            normalizedX = 0;
            normalizedY = 0;
            hero.classList.remove('is-3d-active');
            queueDepthUpdate();
        });
    }

    // ========================================
    // 9. END
    // ========================================
});
