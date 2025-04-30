// Current chapter tracking
let currentChapter = 1;
const totalChapters = 7;

// Initialize the guide
document.addEventListener('DOMContentLoaded', function () {
    updateProgressTracker();
    setupEventListeners();
});

// Update progress tracker visuals
function updateProgressTracker() {
    const steps = document.querySelectorAll('.progress-step');

    steps.forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-chapter'));

        step.classList.remove('active', 'completed');

        if (stepNum === currentChapter) {
            step.classList.add('active');
        } else if (stepNum < currentChapter) {
            step.classList.add('completed');
        }
    });

    // Update sidebar menu
    const menuItems = document.querySelectorAll('#chapterMenu a');
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.getAttribute('data-chapter')) === currentChapter) {
            item.classList.add('active');
        }
    });

    // Show current chapter
    document.querySelectorAll('.chapter').forEach(chapter => {
        chapter.classList.remove('active');
    });
    document.getElementById(`chapter${currentChapter}`).classList.add('active');
}

// Setup all event listeners
function setupEventListeners() {
    // Progress tracker clicks
    document.querySelectorAll('.progress-step').forEach(step => {
        step.addEventListener('click', function () {
            currentChapter = parseInt(this.getAttribute('data-chapter'));
            updateProgressTracker();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Sidebar menu clicks
    document.querySelectorAll('#chapterMenu a').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            currentChapter = parseInt(this.getAttribute('data-chapter'));
            updateProgressTracker();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Next/previous buttons
    document.querySelectorAll('.nav-btn-primary').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.hasAttribute('data-next')) {
                currentChapter = parseInt(this.getAttribute('data-next'));
                updateProgressTracker();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    document.querySelectorAll('.nav-btn-secondary').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.hasAttribute('data-prev') && !this.disabled) {
                currentChapter = parseInt(this.getAttribute('data-prev'));
                updateProgressTracker();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}
