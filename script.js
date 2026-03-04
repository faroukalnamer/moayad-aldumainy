// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const navLinkItems = document.querySelectorAll('.nav-link');
const announcementBar = document.getElementById('announcementBar');
const announcementClose = document.getElementById('announcementClose');

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Scroll to top button visibility
    if (currentScroll > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNavLink();
});

// ============================================
// Mobile Menu Toggle
// ============================================
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Active Navigation Link Update
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Scroll to Top
// ============================================
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Lightbox Gallery
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');
const branchItems = document.querySelectorAll('.branch-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

branchItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.branch-img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Counter Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function setupScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.service-card, .brand-card, .gallery-item, .branch-item, .contact-card, .about-grid, .section-header'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// Hero Stats Counter Observer
// ============================================
function setupCounterObserver() {
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    let counted = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Service Card Tilt Effect
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setupScrollReveal();
    setupCounterObserver();
    updateActiveNavLink();
    setupAnnouncement();
});

// ============================================
// Announcement Bar
// ============================================
function setupAnnouncement() {
    if (!announcementBar || !announcementClose) return;

    const STORAGE_KEY = 'announcementClosedAt'; // store timestamp (ms)
    const HIDE_DAYS = 7;

    // Check if announcement was closed within the last HIDE_DAYS
    try {
        const closedAt = localStorage.getItem(STORAGE_KEY);
        if (closedAt) {
            const closedTs = parseInt(closedAt, 10);
            if (!isNaN(closedTs)) {
                const now = Date.now();
                const msInDay = 24 * 60 * 60 * 1000;
                if (now - closedTs < HIDE_DAYS * msInDay) {
                    announcementBar.style.display = 'none';
                    return;
                }
            }
        }
    } catch (e) {
        // ignore localStorage errors
    }

    // On close: save timestamp so announcement stays hidden for HIDE_DAYS
    announcementClose.addEventListener('click', () => {
        announcementBar.style.display = 'none';
        try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch (e) {
            // ignore
        }
    });

    // Small UX touch: allow clicking CTA to temporarily highlight the branch section
    const cta = document.querySelector('.announcement-cta');
    if (cta) {
        cta.addEventListener('click', () => {
            announcementBar.style.display = 'none';
            try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch (e) { }
        });
    }
}
