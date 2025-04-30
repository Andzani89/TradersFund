// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
mobileMenuBtn.addEventListener('click', () => navMenu.classList.toggle('show'));

// Quiz Functionality
let currentQuestion = 0;
const questions = document.querySelectorAll('.quiz-question');
const questionCount = document.getElementById('question-count');

function showQuestion(index) {
    questions.forEach(q => q.classList.remove('active'));
    questions[index].classList.add('active');
    questionCount.textContent = `Question ${index + 1} of ${questions.length}`;
}

document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function () {
        // Remove previous feedback
        this.parentElement.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('correct', 'wrong');
        });

        // Example correct answers
        const correctAnswers = [
            'Hold On for Dear Life',
            'Proof of Work'
        ];

        if (this.textContent === correctAnswers[currentQuestion]) {
            this.classList.add('correct');
        } else {
            this.classList.add('wrong');
        }
    });
});

document.getElementById('next-question').addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

document.getElementById('prev-question').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

// Glossary Toggle
document.querySelectorAll('.term-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});

// Initialize Particles (same as index.html)
function initParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    width: ${Math.random() * 5 + 3}px;
                    height: ${Math.random() * 5 + 3}px;
                    animation-duration: ${Math.random() * 20 + 10}s;
                    animation-delay: ${Math.random() * 5}s;
                `;
        particles.appendChild(particle);
    }
}
initParticles();
