/* Dark Mode Toggle */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const button = document.getElementById('theme-toggle');
    button.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);

/* Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = anchor.getAttribute('href');
        }
    });
});

/* Scroll Animation */
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate="fade-in"], [data-animate="progress"]');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            element.classList.add('animate');
            if (element.dataset.animate === 'progress') {
                element.style.setProperty('--progress-width', element.dataset.value + '%');
            }
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

/* Project Filter */
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        button.classList.add('active');
        const category = button.dataset.category;
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.toggle('visible', category === 'all' || card.dataset.category === category);
        });
    });
});

/* Back-to-Top Button */
function toggleBackToTop() {
    const button = document.getElementById('back-to-top');
    button.classList.toggle('visible', window.scrollY > 300);
}

window.addEventListener('scroll', toggleBackToTop);
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Form Validation and localStorage */
const form = document.getElementById('contact-form');
if (form) {
    // Load saved form data
    const savedData = JSON.parse(localStorage.getItem('contactForm') || '{}');
    document.getElementById('name').value = savedData.name || '';
    document.getElementById('email').value = savedData.email || '';
    document.getElementById('message').value = savedData.message || '';

    // Save form data on input
    form.addEventListener('input', () => {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        localStorage.setItem('contactForm', JSON.stringify(formData));
    });

    // Validate and submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name').value.trim();
        const nameError = document.getElementById('name-error');
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        const email = document.getElementById('email').value.trim();
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        const message = document.getElementById('message').value.trim();
        const messageError = document.getElementById('message-error');
        if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters.';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        const formMessage = document.getElementById('form-message');
        if (isValid) {
            formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
            formMessage.style.color = 'green';
            form.reset();
            localStorage.removeItem('contactForm');
        } else {
            formMessage.textContent = 'Please fix the errors above.';
            formMessage.style.color = '#e74c3c';
        }
    });
}