/* Menu Show/Hide */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remove menu mobile */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* Skills Accordion - Fixed */
document.addEventListener('DOMContentLoaded', function() {
    const skillsHeaders = document.querySelectorAll('.skills__header');
    
    // Initialize first section as open
    if (skillsHeaders.length > 0) {
        skillsHeaders[0].parentNode.classList.add('skills__open');
        skillsHeaders[0].parentNode.classList.remove('skills__close');
    }
    
    // Initialize other sections as closed
    for (let i = 1; i < skillsHeaders.length; i++) {
        skillsHeaders[i].parentNode.classList.add('skills__close');
        skillsHeaders[i].parentNode.classList.remove('skills__open');
    }
    
    skillsHeaders.forEach((header) => {
        header.addEventListener('click', function() {
            const skillsContent = this.parentNode;
            const isOpen = skillsContent.classList.contains('skills__open');
            
            // Close all sections first
            skillsHeaders.forEach(h => {
                h.parentNode.classList.remove('skills__open');
                h.parentNode.classList.add('skills__close');
            });
            
            // Open clicked section if it was closed
            if (!isOpen) {
                skillsContent.classList.remove('skills__close');
                skillsContent.classList.add('skills__open');
            }
        });
    });
});

/* Projects Filter */
const projectsContainer = document.querySelector('.projects__container');
const projectsFilter = document.querySelectorAll('.projects__item');

if (projectsFilter.length > 0) {
    projectsFilter.forEach((item) => {
        item.addEventListener('click', () => {
            const filterValue = item.getAttribute('data-filter');
            
            // Remove active class from all filter items
            projectsFilter.forEach((filter) => {
                filter.classList.remove('active-work');
            });
            
            // Add active class to clicked item
            item.classList.add('active-work');
            
            // Filter projects
            const projectItems = document.querySelectorAll('.projects__content');
            
            projectItems.forEach((project) => {
                if (filterValue === 'all') {
                    project.style.display = 'block';
                } else {
                    if (project.classList.contains(filterValue.replace('.', ''))) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });
        });
    });
}

/* Scroll Sections Active Link */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* Change Background Header */
function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 200) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* Show Scroll Up */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* Typing Animation - Fixed */
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const textToType = 'Yaswanth Sai Reddy';
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = isDeleting 
            ? textToType.substring(0, charIndex - 1)
            : textToType.substring(0, charIndex + 1);
        
        typingText.textContent = currentText;
        
        if (!isDeleting && charIndex < textToType.length) {
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeWriter, 50);
        } else if (!isDeleting && charIndex === textToType.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            setTimeout(() => {
                isDeleting = false;
                typeWriter();
            }, 500);
        }
    }
    
    // Start typing animation
    typeWriter();
}

/* Smooth Scrolling - Fixed */
document.addEventListener('DOMContentLoaded', function() {
    // Handle all anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('show-menu')) {
                    navMenu.classList.remove('show-menu');
                }
            }
        });
    });
});

/* Modal Functionality - Fixed */
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking on close button or outside modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    if (e.target.classList.contains('modal')) {
        e.target.style.opacity = '0';
        setTimeout(() => {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    }
});

/* Contact Form Handling */
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const inputs = this.querySelectorAll('.contact__input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Message sent successfully! Thank you for reaching out.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Remove focus from inputs
            inputs.forEach(input => {
                input.blur();
                // Remove any error states
                input.classList.remove('error');
                const errorMsg = input.parentNode.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

/* Notification System */
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/* Intersection Observer for Animations */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skills__content')) {
                const skillBars = entry.target.querySelectorAll('.skills__percentage');
                skillBars.forEach(bar => {
                    bar.style.animation = 'skills-bar 2s ease-in-out';
                });
            }
            
            // Trigger certification card animations
            if (entry.target.classList.contains('certification__card')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
            
            // Trigger project card animations
            if (entry.target.classList.contains('projects__content')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        }
    });
}, observerOptions);

/* Enhanced Form Validation */
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    // Remove existing error styling
    input.classList.remove('error');
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Validation rules
    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (type === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (input.tagName.toLowerCase() === 'textarea' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }
    
    if (!isValid) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #EF4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: block;
        `;
        input.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* Initialize Project Filter Classes */
function initializeProjectFilter() {
    const projectItems = document.querySelectorAll('.projects__content');
    
    projectItems.forEach((item) => {
        const title = item.querySelector('.projects__title').textContent;
        
        if (title.includes('Smart Blind Stick')) {
            item.classList.add('iot');
        } else if (title.includes('Patient Registration')) {
            item.classList.add('frontend');
        } else if (title.includes('Enterprise Management')) {
            item.classList.add('fullstack');
        } else if (title.includes('AI Chatbot') || title.includes('Object Detection')) {
            item.classList.add('ai');
        }
    });
}

/* Scroll Progress Indicator */
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }
}

/* Initialize everything when DOM is loaded */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filter classes
    initializeProjectFilter();
    
    // Initialize typing animation after a short delay
    setTimeout(() => {
        initTypingAnimation();
    }, 1000);
    
    // Initialize form validation
    const contactInputs = document.querySelectorAll('.contact__input');
    contactInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateInput(this);
            }
        });
    });
    
    // Initialize intersection observer
    const elementsToObserve = document.querySelectorAll(
        '.about__container, .skills__content, .certification__card, .projects__content, .experience__content, .contact__container'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
    
    // Initialize scroll progress bar
    const scrollProgressBar = document.createElement('div');
    scrollProgressBar.className = 'scroll-progress';
    scrollProgressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgressBar);
    
    // Add scroll progress update
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', requestTick);
});

/* Add required animation styles */
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification__content i {
        font-size: 1.2rem;
    }
    
    .contact__input.error {
        border-bottom-color: #EF4444 !important;
    }
    
    .modal {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal[style*="block"] {
        opacity: 1;
    }
`;
document.head.appendChild(animationStyles);

console.log('Portfolio website loaded successfully! 🚀');