// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Course filtering
const courseCategoryBtns = document.querySelectorAll('.course-category-btn');
const courseCards = document.querySelectorAll('.course-card');

courseCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        courseCategoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        // Filter course cards
        courseCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category').includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        }
    });
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Thanks for subscribing! You\'ll be notified about new courses.');
            emailInput.value = '';
        }
    });
}



mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.course-main > div[id$="container"]');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show corresponding content
        const tabName = btn.textContent.toLowerCase();
        if (tabName === 'curriculum') {
            document.querySelector('.course-lessons').style.display = 'block';
        } else if (tabName === 'resources') {
            document.querySelector('.resources-container').style.display = 'block';
        }
        // Add other tabs as needed
    });
});

// Mark lesson complete
document.querySelectorAll('.lesson-item').forEach(item => {
    item.addEventListener('click', function() {
        if(!this.classList.contains('completed-lesson')) {
            this.classList.add('completed-lesson');
            this.querySelector('.lesson-play').textContent = '✓';
            // Update progress via AJAX
        }
    });
});