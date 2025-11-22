document.addEventListener('DOMContentLoaded', () => {
    let isButtonClicked = false;
    let namesRevealed = false;

    const wishBtn = document.getElementById('wishBtn');
    const wishModal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('closeBtn');
    const floatingNames = document.querySelectorAll('.floating-name');
    const namesDestination = document.getElementById('namesDestination');
    const settledName1 = document.getElementById('settledName1');
    const settledName2 = document.getElementById('settledName2');
    const sparkleCanvas = document.getElementById('sparkleCanvas');
    const ctx = sparkleCanvas ? sparkleCanvas.getContext('2d') : null;

    // Setup canvas
    if (sparkleCanvas && ctx) {
        sparkleCanvas.width = window.innerWidth;
        sparkleCanvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            sparkleCanvas.width = window.innerWidth;
            sparkleCanvas.height = window.innerHeight;
        });
    }

    // Enhanced Confetti with more particles and colors
    const fireConfetti = () => {
        const colors = ['#FFD700', '#FF006E', '#8A2BE2', '#00D9FF', '#FF4D8F', '#FFC700'];
        
        // Main burst
        confetti({
            particleCount: 350,
            spread: 120,
            origin: { y: 0.6 },
            colors: colors,
            shapes: ['circle', 'square', 'star'],
            ticks: 400,
            gravity: 0.9,
            scalar: 2,
            drift: 0.2,
            startVelocity: 50,
        });

        // Side bursts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    angle: 60 + (i * 20),
                    spread: 60,
                    origin: { x: Math.random(), y: 0.6 },
                    colors: colors,
                    ticks: 300,
                    gravity: 0.7,
                    scalar: 1.5,
                });
            }, i * 250);
        }

        // Continuous sparkle rain
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    spread: 360,
                    origin: { x: Math.random(), y: Math.random() * 0.5 },
                    colors: colors,
                    ticks: 200,
                    gravity: 0.5,
                    scalar: 1,
                });
            }, i * 400);
        }
    };

    // Canvas Sparkle Effect
    class Sparkle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 2;
            this.speedX = (Math.random() - 0.5) * 6;
            this.speedY = (Math.random() - 0.5) * 6;
            this.color = ['#FFD700', '#FF006E', '#8A2BE2', '#00D9FF', '#FF4D8F'][Math.floor(Math.random() * 5)];
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.98;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    let sparkles = [];

    function animateSparkles() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
        
        sparkles = sparkles.filter(sparkle => sparkle.life > 0);
        
        sparkles.forEach(sparkle => {
            sparkle.update();
            sparkle.draw(ctx);
        });
        
        requestAnimationFrame(animateSparkles);
    }

    if (ctx) {
        animateSparkles();
    }

    // Create Sparkle Burst at Position
    function createSparkleBurst(x, y, count = 50) {
        if (!ctx) return;
        
        for (let i = 0; i < count; i++) {
            sparkles.push(new Sparkle(x, y));
        }
    }

    // Floating Names Animation Handler
    function settleNames() {
        if (namesRevealed) return;
        namesRevealed = true;

        floatingNames.forEach((name, index) => {
            const rect = name.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            // Create sparkle trail during settlement
            const interval = setInterval(() => {
                createSparkleBurst(startX + (Math.random() - 0.5) * 100, startY + (Math.random() - 0.5) * 100, 10);
            }, 50);

            // Get destination position
            const destRect = namesDestination.getBoundingClientRect();
            const settleX = destRect.left + destRect.width / 2 - startX;
            const settleY = destRect.top + destRect.height / 2 - startY;

            // Set CSS variables for animation
            name.style.setProperty('--settle-x', `${settleX}px`);
            name.style.setProperty('--settle-y', `${settleY}px`);
            
            // Add settling class
            name.classList.add('settling');

            // Transfer text to settled position
            setTimeout(() => {
                clearInterval(interval);
                const settledName = index === 0 ? settledName1 : settledName2;
                settledName.textContent = name.textContent;
                namesDestination.classList.remove('hidden');
                
                // Hide floating names
                name.style.opacity = '0';
                
                // Massive sparkle burst at destination
                createSparkleBurst(destRect.left + destRect.width / 2, destRect.top + destRect.height / 2, 100);
            }, 2000);
        });
    }

    // Open Modal with Enhanced Animation
    const openModal = () => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
        wishModal.classList.remove('hidden');

        setTimeout(() => {
            overlay.classList.add('show');
            wishModal.classList.add('show');
            
            const modalContent = wishModal.querySelector('.modal-content');
            const title = wishModal.querySelector('.modal-title');
            const paragraphs = wishModal.querySelectorAll('.wish-text, .wish-highlight');
            const heartsRow = wishModal.querySelector('.hearts-row');
            const button = wishModal.querySelector('.modal-action');

            // Animate modal elements
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(-30px) scale(0.8)';
                setTimeout(() => {
                    title.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0) scale(1)';
                }, 300);
            }

            paragraphs.forEach((p, index) => {
                p.style.opacity = '0';
                p.style.transform = 'translateX(-30px)';
                setTimeout(() => {
                    p.style.transition = 'all 0.6s ease-out';
                    p.style.opacity = '1';
                    p.style.transform = 'translateX(0)';
                }, 500 + (index * 150));
            });

            if (heartsRow) {
                heartsRow.style.opacity = '0';
                heartsRow.style.transform = 'scale(0.5)';
                setTimeout(() => {
                    heartsRow.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    heartsRow.style.opacity = '1';
                    heartsRow.style.transform = 'scale(1)';
                }, 1100);
            }

            if (button) {
                button.style.opacity = '0';
                button.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    button.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1) translateY(0)';
                }, 1300);
            }

            setTimeout(fireConfetti, 400);
            
            // Create sparkles at random positions
            const sparkleInterval = setInterval(() => {
                const rect = modalContent.getBoundingClientRect();
                createSparkleBurst(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height,
                    5
                );
            }, 200);

            setTimeout(() => clearInterval(sparkleInterval), 3000);
        }, 100);
    };

    // Close Modal
    const closeModal = () => {
        const modalContent = wishModal.querySelector('.modal-content');
        const overlay = document.querySelector('.modal-overlay');

        modalContent.style.transform = 'scale(0.9) translateY(-20px)';
        modalContent.style.opacity = '0';
        modalContent.style.transition = 'all 0.5s ease-out';

        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.4s ease-out';
        }

        setTimeout(() => {
            wishModal.classList.add('hidden');
            wishModal.classList.remove('show');
            if (overlay) {
                document.body.removeChild(overlay);
            }
            // Reset modal content styles
            modalContent.style = '';
        }, 500);
    };

    // Button Click Handler with Ripple Effect
    wishBtn.addEventListener('click', function (e) {
        if (isButtonClicked) return;
        isButtonClicked = true;

        this.classList.add('button-clicked');
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'btn-ripple';
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        this.appendChild(ripple);

        // Create sparkle burst at click position
        createSparkleBurst(e.clientX, e.clientY, 30);

        setTimeout(() => {
            ripple.remove();
            this.classList.remove('button-clicked');
            
            // Settle the names first
            settleNames();
            
            // Open modal after names settle
            setTimeout(() => {
                openModal();
                isButtonClicked = false;
            }, 2500);
        }, 600);
    });

    // Close button handler
    closeBtn.addEventListener('click', closeModal);

    // Click outside modal to close
    wishModal.addEventListener('click', (e) => {
        if (e.target === wishModal) {
            closeModal();
        }
    });

    // Modal action button
    const modalActionBtn = wishModal.querySelector('.modal-action');
    if (modalActionBtn) {
        modalActionBtn.addEventListener('click', closeModal);
    }

    // Continuous floating emojis in background
    const backgroundEmojis = ['💕', '💖', '💗', '💓', '💝', '✨', '⭐', '🌟', '💫', '🎉'];
    
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = backgroundEmojis[Math.floor(Math.random() * backgroundEmojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.bottom = '-50px';
        emoji.style.fontSize = (Math.random() * 30 + 15) + 'px';
        emoji.style.animationDuration = (Math.random() * 4 + 4) + 's';
        emoji.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(emoji);

        setTimeout(() => {
            if (emoji.parentNode) {
                document.body.removeChild(emoji);
            }
        }, 8000);
    }, 400);

    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        wishBtn.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            const feedback = document.createElement('div');
            feedback.className = 'touch-feedback';
            feedback.style.left = (touch.clientX - 25) + 'px';
            feedback.style.top = (touch.clientY - 25) + 'px';
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                if (feedback.parentNode) {
                    document.body.removeChild(feedback);
                }
            }, 600);
        });
    }

    console.log('✨ Anniversary Wish Website Loaded! ✨');
});