// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            
            // Toggle hamburger to X
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile nav when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-open');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.style.background = 'transparent';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.background = 'var(--color-teal-500)';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--color-slate-900-rgb')}, 0.98)`;
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--color-slate-900-rgb')}, 0.95)`;
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Scroll Animation for Fade In Effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.skill-category, .project-card-large, .cert-item, .edu-item, .timeline-item');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Timeline Animation on Scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    setTimeout(() => {
                        marker.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            marker.style.transform = 'scale(1)';
                        }, 300);
                    }, 200);
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Skill Item Hover Effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
    
    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card-large');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.boxShadow = 'none';
            });
        });
    });
    
    // Typing Animation for Hero Title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--color-teal-300)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Contact Info Click to Copy
    const contactItems = document.querySelectorAll('.contact-item, .contact-detail');
    contactItems.forEach(item => {
        const textElement = item.querySelector('span');
        if (textElement && (textElement.textContent.includes('@') || textElement.textContent.includes('+'))) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', function() {
                const text = textElement.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`Copied: ${text}`, 'success');
                }).catch(() => {
                    showNotification('Failed to copy', 'error');
                });
            });
        }
    });
    
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Dynamic Skills Progress Animation
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = 'skillPop 0.6s ease-out forwards';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
    
    // Experience Timeline Interactions
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
            this.style.boxShadow = '0 0 25px rgba(var(--color-teal-500-rgb), 0.6)';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    });
    
    // Project Content Sections Reveal Animation
    const projectSections = document.querySelectorAll('.project-achievements');
    const projectSectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    projectSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        projectSectionObserver.observe(section);
    });
    
    // Section Entrance Animations
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });
    
    const sectionsToAnimate = document.querySelectorAll('section');
    sectionsToAnimate.forEach(section => {
        section.classList.add('section-animate');
        sectionObserver.observe(section);
    });
});

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification--${type}`);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        padding: var(--space-16);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: var(--space-12);
        color: var(--color-text);
    `;
    
    const icon = notification.querySelector('i');
    icon.style.color = type === 'success' ? 'var(--color-success)' : 
                      type === 'error' ? 'var(--color-error)' : 
                      'var(--color-info)';
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--color-text-secondary);
        cursor: pointer;
        margin-left: auto;
        padding: var(--space-4);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes skillPop {
        0% {
            opacity: 0;
            transform: scale(0.5) rotateY(-90deg);
        }
        50% {
            transform: scale(1.1) rotateY(0deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
        }
    }
    
    .skill-item {
        opacity: 0;
        transform: scale(0.5);
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .section-animate {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .section-animate.section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes timelineSlide {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulseGlow {
        0%, 100% {
            box-shadow: 0 0 10px rgba(var(--color-teal-500-rgb), 0.3);
        }
        50% {
            box-shadow: 0 0 20px rgba(var(--color-teal-500-rgb), 0.6);
        }
    }
    
    .timeline-marker.animate-pulse {
        animation: pulseGlow 2s infinite;
    }
    
    /* Smooth scrolling enhancement */
    @media (prefers-reduced-motion: no-preference) {
        html {
            scroll-behavior: smooth;
        }
    }
`;
document.head.appendChild(style);