document.addEventListener('DOMContentLoaded', () => {
    // Track if button is clicked
    let isButtonClicked = false;
    
    // Utility function for mobile detection
    const isMobileDevice = () => window.innerWidth <= 768;

    document.getElementById('wishBtn').addEventListener('click', () => {
        isButtonClicked = true;
    });

    const wishBtn = document.getElementById('wishBtn');
    const wishModal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('closeBtn');

    // Enhanced confetti celebration effects
    const fireConfetti = () => {
        const particleMultiplier = isMobileDevice() ? 0.7 : 1;
        
        // Initial burst with hearts and stars
        confetti({
            particleCount: Math.floor(200 * particleMultiplier),
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#ff1493', '#ff69b4', '#ffffff', '#FFD700'],
            shapes: ['circle', 'star', 'square'],
            ticks: 250,
            gravity: 0.7,
            scalar: 1.4,
            drift: 0.2,
            disableForReducedMotion: true
        });

        // Cascading side bursts
        const burstCount = isMobileDevice() ? 3 : 4;
        for(let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                // Left burst
                confetti({
                    particleCount: Math.floor(50 * particleMultiplier),
                    angle: 60,
                    spread: 60,
                    origin: { x: 0, y: 0.65 },
                    colors: ['#ff69b4', '#ff1493', '#ffffff', '#FFD700'],
                    ticks: 200,
                    gravity: 0.5,
                    drift: 0.3,
                    scalar: 1.2,
                    disableForReducedMotion: true
                });
                // Right burst
                confetti({
                    particleCount: Math.floor(50 * particleMultiplier),
                    angle: 120,
                    spread: 60,
                    origin: { x: 1, y: 0.65 },
                    colors: ['#ff69b4', '#ff1493', '#ffffff', '#FFD700'],
                    ticks: 200,
                    gravity: 0.5,
                    drift: 0.3,
                    scalar: 1.2,
                    disableForReducedMotion: true
                });
            }, i * 250);
        }

        // Magical sparkle bursts
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(150 * particleMultiplier),
                spread: 140,
                origin: { y: 0.7 },
                shapes: ['star'],
                colors: ['#FFD700', '#FFA500', '#ffffff', '#ff69b4'],
                ticks: 220,
                gravity: 0.3,
                scalar: 1.5,
                drift: 0.2,
                disableForReducedMotion: true
            });
        }, 800);

        // Final celebratory shower
        setTimeout(() => {
            confetti({
                particleCount: Math.floor(250 * particleMultiplier),
                spread: 180,
                origin: { y: 0.5 },
                colors: ['#ff69b4', '#ff1493', '#FFD700', '#ffffff'],
                ticks: 280,
                gravity: 0.5,
                drift: 0.1,
                scalar: 1.4,
                shapes: ['circle', 'star', 'square'],
                disableForReducedMotion: true
            });
        }, 1200);
    };

    // Function to open modal with spectacular transition and confetti
    const openModal = () => {
        // Create and animate overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
        
        // Show modal
        wishModal.classList.remove('hidden');
        
        // Trigger animations in sequence
        setTimeout(() => {
            overlay.classList.add('show');
            wishModal.classList.add('show');
            
            // Animate content elements with staggered timing
            const title = wishModal.querySelector('h2');
            const paragraphs = wishModal.querySelectorAll('p');
            const button = wishModal.querySelector('button');
            
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(-20px)';
                title.classList.add('shimmer-text');
                setTimeout(() => {
                    title.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                    title.classList.add('animate-title');
                }, 300);
            }
            
            // Animate paragraphs with staggered delay
            paragraphs.forEach((p, index) => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    p.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, 500 + (index * 200));
            });
            
            // Animate button
            if (button) {
                button.style.opacity = '0';
                button.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    button.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1)';
                }, 800);
            }
            
            // Fire confetti with slight delay for better timing
            setTimeout(fireConfetti, 400);
        }, 100);
    };

    // Function to close modal with spectacular fade-out animation
    const closeModal = () => {
        const modalContent = wishModal.querySelector('div');
        const overlay = document.querySelector('.modal-overlay');
        
        // Animate content out
        modalContent.style.transform = 'scale(0.9) translateY(-20px)';
        modalContent.style.opacity = '0';
        modalContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Fade out overlay
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.7s ease-out';
        }
        
        // Clean up after animations
        setTimeout(() => {
            wishModal.classList.add('hidden');
            wishModal.classList.remove('show');
            if (overlay) {
                document.body.removeChild(overlay);
            }
            // Reset styles for next opening
            modalContent.style = '';
        }, 800);
    };

    // Event listeners
    wishBtn.addEventListener('click', function(e) {
        // Add button click animation class
        this.classList.add('button-clicked');
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'btn-ripple';
        ripple.style.left = (e.clientX - this.getBoundingClientRect().left) + 'px';
        ripple.style.top = (e.clientY - this.getBoundingClientRect().top) + 'px';
        this.appendChild(ripple);
        
        // Remove ripple and class after animation completes
        setTimeout(() => {
            ripple.remove();
            this.classList.remove('button-clicked');
            openModal();
        }, 600);
    });
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    wishModal.addEventListener('click', (e) => {
        if (e.target === wishModal) {
            closeModal();
        }
    });

    // Add floating hearts and sprinkler animations
    const emojis = ['❤️', '✨', '🎉', '💫', '🌟', '💖', '🎊'];
    const emojiInterval = isMobileDevice() ? 500 : 300; // Slower on mobile for better performance
    
    setInterval(() => {
        const element = document.createElement('div');
        element.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        element.style.position = 'fixed';
        element.style.left = Math.random() * 100 + 'vw';
        element.style.bottom = '-20px';
        element.style.fontSize = (Math.random() * 20 + 10) + 'px';
        element.style.animation = 'float-up 4s ease-out';
        element.style.opacity = '0.8';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '1000';
        element.style.filter = 'drop-shadow(0 0 3px rgba(255,255,255,0.5))';
        element.style.willChange = 'transform, opacity'; // Performance hint
        document.body.appendChild(element);

        setTimeout(() => {
            if (document.body.contains(element)) {
                document.body.removeChild(element);
            }
        }, 4000);
    }, emojiInterval);

    // Add sprinkler effect on button click with enhanced sparkles
    wishBtn.addEventListener('click', () => {
        const sparkleCount = isMobileDevice() ? 40 : 50;
        const sparkleDelay = isMobileDevice() ? 30 : 40;
        
        for(let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.setProperty('--angle', (i * (360 / sparkleCount)) + 'deg');
                sparkle.style.setProperty('--delay', (i * 0.1) + 's');
                
                // Add random color variations for enhanced effect
                const colors = [
                    'radial-gradient(circle, #fff 0%, rgba(255,255,255,0.9) 40%, rgba(255,215,0,0.7) 70%, rgba(255,255,255,0) 100%)',
                    'radial-gradient(circle, #fff 0%, rgba(255,255,255,0.9) 40%, rgba(255,105,180,0.7) 70%, rgba(255,255,255,0) 100%)',
                    'radial-gradient(circle, #fff 0%, rgba(255,255,255,0.9) 40%, rgba(255,192,203,0.7) 70%, rgba(255,255,255,0) 100%)'
                ];
                sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                document.body.appendChild(sparkle);

                setTimeout(() => {
                    if (document.body.contains(sparkle)) {
                        document.body.removeChild(sparkle);
                    }
                }, 2500);
            }, i * sparkleDelay);
        }
    });
});

// Add enhanced floating animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
        }
        10% {
            transform: translateY(-10vh) rotate(45deg) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-50vh) rotate(180deg) scale(1.2);
            opacity: 0.9;
        }
        80% {
            transform: translateY(-80vh) rotate(270deg) scale(1);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.8);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);