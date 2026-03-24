/* =====================================================
   LAUGHING THROUGH THE STRUGGLES - ACADEMIC WEBSITE
   Interactive JavaScript Features
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initCountUp();
    initSections();
    initModal();
    initMobileMenu();
});

/* Navigation */
function initNavigation() {
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* Smooth Scroll */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* Scroll Animations */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.rq-card, .method-step, .form-card, .topic-card, .discussion-card, .contribution-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/* Count Up Animation */
function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCount(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCount(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(updateCount);
}

/* Expandable Sections */
function initSections() {
    // Open first finding section by default
    const firstContent = document.getElementById('rq1-content');
    if (firstContent) {
        firstContent.classList.add('active');
        const toggleIcon = firstContent.previousElementSibling.querySelector('.toggle-icon');
        if (toggleIcon) toggleIcon.textContent = '−';
    }
}

function toggleSection(contentId) {
    const content = document.getElementById(contentId);
    const header = content.previousElementSibling;
    const toggleIcon = header.querySelector('.toggle-icon');

    if (content.classList.contains('active')) {
        content.classList.remove('active');
        toggleIcon.textContent = '+';
    } else {
        content.classList.add('active');
        toggleIcon.textContent = '−';
    }
}

function toggleTheme(themeId) {
    const theme = document.getElementById(themeId);
    const header = theme.previousElementSibling;
    const toggle = header.querySelector('.theme-toggle');

    if (theme.classList.contains('active')) {
        theme.classList.remove('active');
        toggle.textContent = '+';
    } else {
        theme.classList.add('active');
        toggle.textContent = '−';
    }
}

/* Modal */
function initModal() {
    const modal = document.getElementById('imageModal');

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalPdf = document.getElementById('modalPdf');

    // Hide both initially
    modalImage.style.display = 'none';
    modalPdf.style.display = 'none';

    if (src.endsWith('.pdf')) {
        // For PDF files, use iframe
        modalPdf.src = src;
        modalPdf.style.display = 'block';
    } else {
        // For images
        modalImage.src = src;
        modalImage.style.display = 'block';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalPdf = document.getElementById('modalPdf');

    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear PDF src to stop loading
    setTimeout(() => {
        modalPdf.src = '';
    }, 300);
}

/* Mobile Menu */
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.getElementById('menuBtn');

    mobileMenu.classList.remove('active');
    menuBtn.classList.remove('active');
}

/* Utility Functions */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.toggleSection = toggleSection;
window.toggleTheme = toggleTheme;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeMobileMenu = closeMobileMenu;
