// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle with null checks
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // AI Assistant with null checks
    const aiToggle = document.querySelector('.ai-toggle');
    const aiChat = document.querySelector('.ai-chat');

    if (aiToggle && aiChat) {
        aiToggle.addEventListener('click', () => {
            aiChat.style.display = aiChat.style.display === 'block' ? 'none' : 'block';
        });

        const generateBtn = document.querySelector('.ai-controls button');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                const ideas = [
                    "Bitcoin is hovering around $101,900, down roughly 0.5% today. It recently tested a low near $98,900, influenced by geopolitical tensions and liquidation events",
                    "Ethereum is trading at about $2,259, down approximately 0.6%, with recent volatility hitting nearly 10% amid global uncertainty",
                    "U.S. strikes on Iran triggered a market-wide slump, liquidating over $595 million in bullish bets, with Bitcoin falling below $100K before rebounding",
                    "Public firms amassed 12,400 BTC last week, while miners produced just 3,150 BTC, reinforcing a supply squeeze",
                    "The presale space is buzzing, with projects like Solaxy (a Solana L2) raising over $56 million, alongside growing interest post-EU MiCA moves",
                    "Spot Bitcoin ETF inflows are down over 26%, while ETF activity dropped to zero yesterday, signaling cautious institutional behavior",
                    "The total crypto market cap is around $3.11 trillion, with nearly 79% of coins in the red, indicating a bearish sentiment "
                ];
                const messagesContainer = document.querySelector('.ai-messages');
                if (messagesContainer) {
                    const newMessage = document.createElement('div');
                    newMessage.className = 'ai-message';
                    newMessage.innerHTML = `<p>${ideas[Math.floor(Math.random() * ideas.length)]}</p><br>`;
                    messagesContainer.appendChild(newMessage);
                }
            });
        }
    }

    // Post Form with null checks
    const postButton = document.querySelector('.post-form button');
    if (postButton) {
        postButton.addEventListener('click', (e) => {
            e.preventDefault();
            const textarea = document.querySelector('.post-form textarea');
            const postsContainer = document.querySelector('.trade-posts');

            if (textarea && textarea.value && postsContainer) {
                const newPost = document.createElement('div');
                newPost.className = 'trade-post';
                newPost.innerHTML = `
                    <div class="post-header">
                        <img src="./Assets/avatar/user.png" class="user-avatar">
                        <div class="post-info">
                            <h4>New User</h4>
                            <span class="post-time">Just now</span>
                        </div>
                        <span class="instrument-tag">NEW</span>
                    </div>
                    <div class="post-content">
                        <p>${textarea.value}</p>
                        <div class="post-stats">
                            <span>👍 0</span>
                            <span>💬 0</span>
                        </div>
                    </div>
                `;
                postsContainer.prepend(newPost);
                textarea.value = '';
            }
        });
    }

    // Particles animation with null check
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            particlesContainer.appendChild(particle);
        }
    }

    // Tab functionality with null checks
    const tabButtons = document.querySelectorAll('.tab-btn');
    const bonusCards = document.querySelectorAll('.bonus-card');

    if (tabButtons.length && bonusCards.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.getAttribute('data-category');
                bonusCards.forEach(card => {
                    card.style.display = (category === 'all' || card.getAttribute('data-category').includes(category))
                        ? 'block'
                        : 'none';
                });
            });
        });
    }

    // Smooth scrolling with null checks
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
                if (window.innerWidth <= 768 && navMenu) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });

    // Newsletter form with null check
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thanks for subscribing! We\'ll send you the best bonus offers.');
                emailInput.value = '';
            }
        });
    }

    // Bonus card claim buttons with null checks
    const claimButtons = document.querySelectorAll('.claim-btn');
    claimButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.bonus-card');
            if (card) {
                const brokerName = card.querySelector('h3')?.textContent.trim();
                if (brokerName) {
                    alert(`Redirecting to ${brokerName} to claim your bonus...`);
                    // window.location.href = 'your-referral-link-here';
                }
            }
        });
    });

    // Crypto price ticker with error handling
    async function fetchPrices() {
        try {
            const cryptoIds = {
                'bitcoin': 'BTC',
                'ethereum': 'ETH',
                'solana': 'SOL',
                'binancecoin': 'BNB',
                'ripple': 'XRP',
                'cardano': 'ADA',
                'litecoin': 'LTC',
            };

            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${Object.keys(cryptoIds).join(',')}&vs_currencies=usd&include_24hr_change=true`
            );

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            updatePriceGrid(data);
            updateTicker(data);
        } catch (error) {
            console.error('Error fetching prices:', error);
            // Fallback or error display
        }
    }

    function updatePriceGrid(data) {
        const priceContainer = document.getElementById('price-container');
        if (!priceContainer) return;

        priceContainer.innerHTML = '';
        const cryptoIds = {
            'bitcoin': 'BTC',
            'ethereum': 'ETH',
            'solana': 'SOL',
            'binancecoin': 'BNB',
            'ripple': 'XRP',
            'cardano': 'ADA',
            'litecoin': 'LTC',
        };

        for (const [id, symbol] of Object.entries(cryptoIds)) {
            const cryptoData = data[id];
            if (cryptoData) {
                const price = cryptoData.usd?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }) || 'N/A';

                const change24h = cryptoData.usd_24h_change?.toFixed(2) || '0';
                const changeClass = parseFloat(change24h) >= 0 ? 'positive' : 'negative';

                const cryptoElement = document.createElement('div');
                cryptoElement.className = 'price-card';
                cryptoElement.innerHTML = `
                    <div class="crypto-info">
                        <span class="crypto-symbol">${symbol}</span>
                        <span class="crypto-price">${price}</span>
                    </div>
                    <div class="crypto-change ${changeClass}">${change24h}%</div>
                `;
                priceContainer.appendChild(cryptoElement);
            }
        }
    }

    function updateTicker(data) {
        const tickerContent = document.getElementById('ticker-content');
        if (!tickerContent) return;

        let tickerHTML = '';
        const cryptoIds = {
            'bitcoin': 'BTC',
            'ethereum': 'ETH',
            'solana': 'SOL',
            'binancecoin': 'BNB',
            'ripple': 'XRP',
            'cardano': 'ADA',
            'litecoin': 'LTC',
        };

        for (const [id, symbol] of Object.entries(cryptoIds)) {
            const cryptoData = data[id];
            if (cryptoData) {
                const price = cryptoData.usd?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6
                }) || 'N/A';

                const change24h = cryptoData.usd_24h_change?.toFixed(2) || '0';
                const changeClass = parseFloat(change24h) >= 0 ? 'positive' : 'negative';

                tickerHTML += `
                    <span class="ticker-item">
                        <span class="ticker-symbol">${symbol}</span>
                        <span class="ticker-price">$${price}</span>
                        <span class="ticker-change ${changeClass}">${change24h}%</span>
                    </span>
                `;
            }
        }

        tickerContent.innerHTML = tickerHTML;
    }

    // Initialize price ticker
    fetchPrices();
    setInterval(fetchPrices, 60000);
});
