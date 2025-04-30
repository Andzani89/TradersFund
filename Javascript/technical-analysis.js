// TA Navigation
const taNavButtons = document.querySelectorAll('.ta-nav-btn');
const taSections = document.querySelectorAll('.ta-section');

taNavButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        taNavButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        // Hide all sections
        taSections.forEach(section => section.classList.remove('active'));
        // Show selected section
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        // Update chart placeholder text
        updateChartPlaceholder(sectionId);
    });
});

// Indicator Controls
const indicatorButtons = document.querySelectorAll('.indicator-btn');
const indicatorSections = document.querySelectorAll('[id$="-indicator"]');

indicatorButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        indicatorButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        // Hide all indicator sections
        indicatorSections.forEach(section => section.style.display = 'none');
        // Show selected indicator
        const indicatorId = this.getAttribute('data-indicator') + '-indicator';
        document.getElementById(indicatorId).style.display = 'block';
    });
});

// Update chart placeholder based on section
function updateChartPlaceholder(sectionId) {
    const placeholder = document.querySelector('.chart-placeholder');
    const titles = {
        'candlesticks': 'Candlestick Patterns',
        'chart-patterns': 'Chart Patterns',
        'indicators': 'Technical Indicators',
        'support-resistance': 'Support & Resistance',
        'trend-analysis': 'Trend Analysis',
        'volume': 'Volume Analysis'
    };

    const descriptions = {
        'candlesticks': 'View live candlestick pattern examples',
        'chart-patterns': 'See chart pattern formations in action',
        'indicators': 'Apply indicators to price charts',
        'support-resistance': 'Identify key support/resistance levels',
        'trend-analysis': 'Analyze trend direction and strength',
        'volume': 'Study volume-price relationships'
    };

    if (placeholder) {
        placeholder.querySelector('h3').textContent = titles[sectionId];
        placeholder.querySelector('p').textContent = descriptions[sectionId];
    }
}

// Initialize first section
updateChartPlaceholder('candlesticks');


//Change Images
// Preload images for better performance
const imagePaths = [
    './Assets/Images/bydfi.png',
    'city1.jpg',
    'animal1.jpg',
    'food1.jpg',
    'travel1.jpg'
];

