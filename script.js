// ========================================
// TechSavant - Interactive JavaScript
// All client-side functionality
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU TOGGLE ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    
    // ==================== SMOOTH SCROLLING ====================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70; // Height of fixed header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ==================== ACTIVE NAVIGATION HIGHLIGHTING ====================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    
    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    
    // ==================== SCROLL REVEAL ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements we want to animate
    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    
    // ==================== FORM VALIDATION ====================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (nameValue === '') {
            nameInput.classList.add('error');
            nameError.textContent = 'Name is required';
            return false;
        } else if (nameValue.length < 2) {
            nameInput.classList.add('error');
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        } else {
            nameInput.classList.remove('error');
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        
        if (emailValue === '') {
            emailInput.classList.add('error');
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(emailValue)) {
            emailInput.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailInput.classList.remove('error');
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        
        if (messageValue === '') {
            messageInput.classList.add('error');
            messageError.textContent = 'Message is required';
            return false;
        } else if (messageValue.length < 10) {
            messageInput.classList.add('error');
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        } else {
            messageInput.classList.remove('error');
            messageError.textContent = '';
            return true;
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    
    // Clear error on input
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateName();
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateEmail();
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateMessage();
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // If all fields are valid
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Thank you! Your message has been received. We\'ll get back to you soon.';
            
            // Clear form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
            
            // Log form data (for demonstration - in real app would send to server)
            console.log('Form submitted successfully:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                timestamp: new Date().toISOString()
            });
        } else {
            // Show error message
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Please fix the errors above before submitting.';
            
            // Hide error message after 5 seconds
            setTimeout(function() {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
        }
    });
    
    
    // ==================== DARK MODE TOGGLE ====================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    
    // ==================== SCROLL TO TOP BUTTON ====================
    const scrollTopButton = document.getElementById('scrollTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ==================== SERVICE CARDS STAGGER ANIMATION ====================
    // Add staggered delay to service cards for animation effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    
    // ==================== PARALLAX EFFECT FOR HERO CIRCLES ====================
    const heroCircles = document.querySelectorAll('.bg-circle');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        heroCircles.forEach((circle, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    
    // ==================== TYPING EFFECT FOR HERO TITLE (Optional Enhancement) ====================
    // Uncomment to enable typing effect
    /*
    const heroTitle = document.querySelector('.hero-title');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
    */
    
    
    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(function() {
        highlightNavigation();
    }));
    
    
    // ==================== ACCESSIBILITY ENHANCEMENTS ====================
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add focus trap for mobile menu
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
    
    
    // ==================== CONSOLE MESSAGE ====================
    console.log('%c🚀 TechSavant Website', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cEmpowering Innovation Through Smart Tech Solutions', 'font-size: 14px; color: #0ea5e9;');
    console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 12px; color: #6b7280;');
    
});

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format date and time
 */
function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

/**
 * Validate form field
 */
function validateField(field, errorElement, validationRules) {
    const value = field.value.trim();
    
    for (let rule of validationRules) {
        if (!rule.test(value)) {
            field.classList.add('error');
            errorElement.textContent = rule.message;
            return false;
        }
    }
    
    field.classList.remove('error');
    errorElement.textContent = '';
    return true;
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 70) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== PAGE LOAD OPTIMIZATION ====================
// Preload critical resources
window.addEventListener('load', function() {
    // Mark page as fully loaded
    document.body.classList.add('loaded');
    
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});

// Service Worker Registration (Optional - for PWA features)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
*/
