// Filter exchanges
const filterButtons = document.querySelectorAll('.filter-btn');
const exchangeCards = document.querySelectorAll('.exchange-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filter exchange cards
        exchangeCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Replace YOUR_REF_CODE with actual referral codes
document.querySelectorAll('.claim-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const exchangeName = this.closest('.exchange-card').querySelector('.exchange-name').textContent;
        console.log(`Redirecting to ${exchangeName} with your referral link`);
    });
});