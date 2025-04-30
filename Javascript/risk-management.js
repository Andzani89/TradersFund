
// Enhanced Risk Calculator Functionality
document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculate-btn');

    // Calculate when button clicked or inputs change
    calculateBtn.addEventListener('click', calculatePosition);
    document.querySelectorAll('.calculator-form input, .calculator-form select').forEach(input => {
        input.addEventListener('input', calculatePosition);
    });

    function calculatePosition() {
        // Get input values
        const accountSize = parseFloat(document.getElementById('account-size').value);
        const riskPercent = parseFloat(document.getElementById('risk-percent').value);
        const entryPrice = parseFloat(document.getElementById('entry-price').value);
        const stopLoss = parseFloat(document.getElementById('stop-loss').value);
        const assetType = document.getElementById('risk-unit').value;

        // Validate inputs
        if (isNaN(accountSize) || accountSize <= 0) {
            alert('Please enter a valid account size');
            return;
        }

        if (isNaN(riskPercent) || riskPercent <= 0 || riskPercent > 100) {
            alert('Risk per trade must be between 0.1% and 100%');
            return;
        }

        if (isNaN(entryPrice) || entryPrice <= 0) {
            alert('Please enter a valid entry price');
            return;
        }

        if (isNaN(stopLoss) || stopLoss <= 0) {
            alert('Please enter a valid stop-loss price');
            return;
        }

        // Determine trade direction
        const isLong = entryPrice < stopLoss;

        // Calculate risk amount
        const riskAmount = accountSize * (riskPercent / 100);
        document.getElementById('risk-amount').textContent = `$${riskAmount.toFixed(2)}`;

        // Calculate risk per unit and position size
        let riskPerUnit, positionSize, positionValue, targetPrice;

        if (assetType === 'forex') {
            // Forex calculation (simplified pip value)
            const pipDifference = Math.abs(entryPrice - stopLoss);
            const pipValue = 10; // Simplified - real pip value varies by pair
            const lots = riskAmount / (pipDifference * pipValue);

            riskPerUnit = pipDifference * pipValue;
            positionSize = lots.toFixed(2);
            positionValue = (lots * 100000 * entryPrice).toFixed(2);

            document.getElementById('risk-per-unit').textContent = `${pipDifference.toFixed(4)} pips ($${riskPerUnit.toFixed(2)} per lot)`;
            document.getElementById('position-size').textContent = `${positionSize} lots`;
        }
        else {
            // Stocks and Crypto calculation
            riskPerUnit = Math.abs(entryPrice - stopLoss);
            positionSize = riskAmount / riskPerUnit;

            if (assetType === 'crypto') {
                positionSize = positionSize.toFixed(6);
                document.getElementById('risk-per-unit').textContent = `$${riskPerUnit.toFixed(6)} per coin`;
                document.getElementById('position-size').textContent = `${positionSize} coins`;
            } else {
                positionSize = Math.floor(positionSize);
                document.getElementById('risk-per-unit').textContent = `$${riskPerUnit.toFixed(2)} per share`;
                document.getElementById('position-size').textContent = `${positionSize} shares`;
            }

            positionValue = (positionSize * entryPrice).toFixed(2);
        }

        // Update position value
        document.getElementById('position-value').textContent = `$${positionValue}`;

        // Calculate potential loss
        const potentialLossPercent = ((riskAmount / accountSize) * 100).toFixed(2);
        document.getElementById('potential-loss').textContent = `$${riskAmount.toFixed(2)} (${potentialLossPercent}%)`;

        // Calculate take-profit at 1:2 risk-reward
        if (isLong) {
            targetPrice = entryPrice + (2 * (stopLoss - entryPrice));
        } else {
            targetPrice = entryPrice - (2 * (entryPrice - stopLoss));
        }

        // Calculate potential profit
        let potentialProfit;
        if (assetType === 'forex') {
            const profitPips = isLong ? (targetPrice - entryPrice) : (entryPrice - targetPrice);
            potentialProfit = positionSize * profitPips * 10; // Simplified pip value
        } else {
            potentialProfit = isLong
                ? positionSize * (targetPrice - entryPrice)
                : positionSize * (entryPrice - targetPrice);
        }

        const potentialProfitPercent = ((potentialProfit / accountSize) * 100).toFixed(2);
        document.getElementById('potential-profit').textContent = `$${potentialProfit.toFixed(2)} (${potentialProfitPercent}%)`;
    }

    // Initialize calculator
    calculatePosition();
});




// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});


if (riskUnit === 'forex') {
    // For forex, we'll calculate in lots (simplified)
    const pipDifference = Math.abs(entryPrice - stopLoss);
    const pipValue = 10; // Simplified - in reality this depends on currency pair and lot size
    const microLots = riskAmount / (pipDifference * pipValue);
    positionSize = `${microLots.toFixed(2)} micro lots`;
    riskPerUnit = `$${(pipDifference * pipValue).toFixed(2)} per lot`;
    positionValue = `$${(microLots * 1000 * entryPrice).toFixed(2)}`;
} else {
    // For stocks and crypto
    riskPerUnit = Math.abs(entryPrice - stopLoss);
    positionSize = Math.floor(riskAmount / riskPerUnit);

    if (riskUnit === 'crypto') {
        document.getElementById('risk-per-unit').textContent = `$${riskPerUnit.toFixed(4)} per coin`;
        document.getElementById('position-size').textContent = `${positionSize.toFixed(6)} ${'BTC'}`;
    } else {
        document.getElementById('risk-per-unit').textContent = `$${riskPerUnit.toFixed(2)} per share`;
        document.getElementById('position-size').textContent = `${positionSize} shares`;
    }

    positionValue = positionSize * entryPrice;
}

document.getElementById('risk-per-unit').textContent = riskUnit === 'forex' ?
    riskPerUnit : `$${riskPerUnit.toFixed(riskUnit === 'crypto' ? 4 : 2)} per ${riskUnit === 'crypto' ? 'coin' : 'share'}`;

document.getElementById('position-value').textContent = `$${positionValue.toFixed(2)}`;

// Calculate 1:2 risk-reward target
if (riskUnit === 'forex') {
    targetPrice = (entryPrice > stopLoss) ?
        (entryPrice - (2 * (entryPrice - stopLoss))).toFixed(4) :
        (entryPrice + (2 * (stopLoss - entryPrice))).toFixed(4);
} else {
    targetPrice = (entryPrice + (2 * (entryPrice - stopLoss))).toFixed(2);
}
document.getElementById('target-price').textContent = `$${targetPrice}`;
            

// Initialize calculator
calculatePosition();

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
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
        
