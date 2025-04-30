document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        emailError.style.display = 'none';
        emailInput.classList.remove('error');
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return;
        }
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            form.style.display = 'none';
            successMessage.style.display = 'flex';
            
            // Reset form after 5 seconds (optional)
            setTimeout(() => {
                form.style.display = 'flex';
                successMessage.style.display = 'none';
                form.reset();
            }, 5000);
        }, 1000);
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});