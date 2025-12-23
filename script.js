// ============================================
// Scroll Snap Section Detection & Navigation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    const navLinks = document.querySelectorAll('.nav-link');

    // Update active dot based on scroll position
    const updateActiveDot = () => {
        const scrollPosition = container.scrollTop;
        const windowHeight = window.innerHeight;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Check if we're within this section
            if (scrollPosition >= sectionTop - windowHeight / 3 &&
                scrollPosition < sectionTop + sectionHeight - windowHeight / 3) {
                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }

                // Update nav links
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLinks[index]) {
                    navLinks[index].classList.add('active');
                }
            }
        });
    };

    // Smooth scroll to section when clicking dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            if (sections[index]) {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Listen for scroll events
    container.addEventListener('scroll', updateActiveDot);

    // Initial check
    updateActiveDot();

    // ============================================
    // Intersection Observer for fade-in animations
    // ============================================

    const observerOptions = {
        root: container,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInElements = document.querySelectorAll(
        '.research-card, .project-card, .about-text, .about-image'
    );

    fadeInElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));

    // ============================================
    // Parallax effect for ocean elements based on scroll
    // ============================================

    const bubbles = document.querySelectorAll('.bubble');
    const seaCreatures = document.querySelectorAll('.sea-creature');
    const fishSchool = document.querySelector('.fish-school');
    
    container.addEventListener('scroll', () => {
        const scrollPercent = container.scrollTop / (container.scrollHeight - window.innerHeight);
        
        // Adjust bubble opacity based on scroll (fewer bubbles in deep water)
        bubbles.forEach((bubble, index) => {
            const baseOpacity = 0.4 - (scrollPercent * 0.3);
            bubble.style.opacity = Math.max(0.03, baseOpacity - (index * 0.02));
        });

        // Adjust sea creature visibility based on scroll depth
        seaCreatures.forEach((creature) => {
            const baseOpacity = 0.06 - (scrollPercent * 0.04);
            creature.style.color = `rgba(255, 255, 255, ${Math.max(0.02, baseOpacity)})`;
        });

        // Adjust fish school
        if (fishSchool) {
            const schoolOpacity = 0.08 - (scrollPercent * 0.06);
            fishSchool.querySelectorAll('span').forEach(fish => {
                fish.style.background = `rgba(255, 255, 255, ${Math.max(0.02, schoolOpacity)})`;
            });
        }

        // Adjust light rays based on scroll (less light in deep water)
        const lightRays = document.querySelector('.light-rays');
        if (lightRays) {
            lightRays.style.opacity = Math.max(0.1, 0.6 - (scrollPercent * 0.5));
        }
    });

    // ============================================
    // Keyboard navigation
    // ============================================

    document.addEventListener('keydown', (e) => {
        const currentScrollTop = container.scrollTop;
        let currentSectionIndex = 0;
        
        // Find current section based on scroll position
        sections.forEach((section, index) => {
            if (currentScrollTop >= section.offsetTop - 100) {
                currentSectionIndex = index;
            }
        });

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentSectionIndex < sections.length - 1) {
                sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSectionIndex > 0) {
                sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // ============================================
    // Dynamic year for footer
    // ============================================

    const footerYear = document.querySelector('.footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }

    // ============================================
    // Smooth reveal for hero elements
    // ============================================

    const heroElements = document.querySelectorAll('.greeting, .hero-title, .hero-subtitle, .scroll-indicator');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });

    console.log('🌊 Website loaded successfully!');
});

// ============================================
// Smooth scroll polyfill for older browsers
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScroll = (target) => {
        const targetPosition = target.offsetTop;
        const container = document.querySelector('.container');
        const startPosition = container.scrollTop;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = progress * (2 - progress);
            
            container.scrollTop = startPosition + distance * ease;
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };
}
