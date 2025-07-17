// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Enrollment Modal Functions
function openEnrollmentModal() {
    document.getElementById('enrollmentModal').style.display = 'block';
}

function closeEnrollmentModal() {
    document.getElementById('enrollmentModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('enrollmentModal');
    if (event.target === modal) {
        closeEnrollmentModal();
    }
}

// Close modal when clicking X
document.querySelector('.close').onclick = function() {
    closeEnrollmentModal();
}

// Book Demo Function
function bookDemo() {
    // You can integrate this with your booking system
    alert('Demo booking functionality will be integrated with your CRM system. For now, please call +91 9876543210 to book a free demo class.');
}

// Enroll Course Function
function enrollCourse(courseType) {
    openEnrollmentModal();
    
    // Pre-select the course in the modal
    const courseSelect = document.querySelector('#enrollmentModal select');
    if (courseSelect) {
        switch(courseType) {
            case 'jee':
                courseSelect.value = 'jee';
                break;
            case 'neet':
                courseSelect.value = 'neet';
                break;
            case 'foundation':
                courseSelect.value = 'foundation';
                break;
        }
    }
}

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you within 24 hours.');
    
    // Reset form
    this.reset();
    
    // Here you would integrate with your backend/CRM system
    console.log('Form submitted:', data);
});

// Enrollment Form Submission
document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert('Enrollment submitted successfully! Our counselor will contact you within 2 hours to complete the admission process.');
    
    // Close modal and reset form
    closeEnrollmentModal();
    this.reset();
    
    // Here you would integrate with your backend/CRM system
    console.log('Enrollment submitted:', data);
});

// Scroll Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.about-card, .course-card, .result-card');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Active Navigation Link
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
            const count = parseInt(counter.innerText);
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        // Set data-target if not already set
        if (!counter.getAttribute('data-target')) {
            counter.setAttribute('data-target', counter.innerText);
        }
        
        updateCount();
    });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
});

observer.observe(heroSection);

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

// Add validation to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

// Phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        this.value = value;
    });
});

// Auto-hide success messages
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Add CSS for success message animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-link.active {
        color: #ffd700 !important;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Testimonial auto-rotation (if implemented)
function initTestimonialRotation() {
    const testimonials = document.querySelectorAll('.result-card');
    if (testimonials.length > 3) {
        let currentIndex = 0;
        
        setInterval(() => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        }, 5000);
    }
}

// Call after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialRotation();
});

// Advanced CTA tracking
function trackCTAClick(ctaName, location) {
    // Integration with analytics
    console.log(`CTA Clicked: ${ctaName} at ${location}`);
    
    // You can integrate with Google Analytics, Facebook Pixel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'CTA',
            event_label: ctaName,
            event_location: location
        });
    }
}

// Add tracking to all CTA buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const ctaText = this.textContent.trim();
        const section = this.closest('section')?.id || 'unknown';
        trackCTAClick(ctaText, section);
    });
});
