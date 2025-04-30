// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Reading progress tracker
const readingProgress = document.getElementById('readingProgress');
const blogContent = document.getElementById('blogContent');
const bonusClaim = document.getElementById('bonusClaim');

function updateReadingProgress() {
    const contentHeight = blogContent.offsetHeight;
    const contentPosition = blogContent.getBoundingClientRect();
    const contentStart = window.pageYOffset + contentPosition.top;
    const scrollDistance = window.pageYOffset - contentStart;
    const progressPercentage = (scrollDistance / (contentHeight - window.innerHeight)) * 100;

    // Update progress bar
    readingProgress.style.width = Math.min(100, Math.max(0, progressPercentage)) + '%';

    // Show bonus claim when scrolled to 90% of content
    if (progressPercentage >= 90) {
        bonusClaim.style.display = 'block';
    }
}

window.addEventListener('scroll', updateReadingProgress);
window.addEventListener('resize', updateReadingProgress);

// Initialize progress on load
document.addEventListener('DOMContentLoaded', updateReadingProgress);

// Bonus claim button
const claimBonusBtn = document.getElementById('claimBonusBtn');

claimBonusBtn.addEventListener('click', function () {
    // In a real implementation, this would redirect to a signup page or show a form
    //alert('Congratulations! Your $50 no-deposit bonus has been reserved. You will be redirected to our partner broker to complete your registration.');

    // You would typically redirect to a broker signup page here
    // window.location.href = 'https://broker.com/signup?bonus=50';
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
