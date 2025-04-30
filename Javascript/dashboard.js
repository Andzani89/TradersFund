// Copy functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function () {
        const link = this.closest('.link-card').querySelector('.referral-link');
        navigator.clipboard.writeText(link.textContent);

        // Visual feedback
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.background = 'var(--secondary)';

        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// Add your existing JavaScript here
