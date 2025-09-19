document.addEventListener('DOMContentLoaded', () => {
    // Track if button is clicked
    let isButtonClicked = false;

    document.getElementById('wishBtn').addEventListener('click', () => {
        isButtonClicked = true;
    });

    const wishBtn = document.getElementById('wishBtn');
    const wishModal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('closeBtn');

    // Enhanced confetti celebration effects
    const fireConfetti = () => {
        // Initial burst with hearts and stars
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#ff1493', '#ff69b4', '#ffffff'],
            shapes: ['circle', 'star'],
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2,
            drift: 0.1,
        });

        // Cascading side bursts
        for(let i = 0; i < 3; i++) {
            setTimeout(() => {
                // Left burst
                confetti({
                    particleCount: 40,
                    angle: 60,
                    spread: 50,
                    origin: { x: 0, y: 0.65 },
                    colors: ['#ff69b4', '#ff1493', '#ffffff'],
                    ticks: 150,
                    gravity: 0.6,
                    drift: 0.2,
                    scalar: 1.1,
                });
                // Right burst
                confetti({
                    particleCount: 40,
                    angle: 120,
                    spread: 50,
                    origin: { x: 1, y: 0.65 },
                    colors: ['#ff69b4', '#ff1493', '#ffffff'],
                    ticks: 150,
                    gravity: 0.6,
                    drift: 0.2,
                    scalar: 1.1,
                });
            }, i * 200);
        }

        // Magical sparkle bursts
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 120,
                origin: { y: 0.7 },
                shapes: ['star'],
                colors: ['#FFD700', '#FFA500', '#ffffff', '#ff69b4'],
                ticks: 180,
                gravity: 0.4,
                scalar: 1.3,
                drift: 0.2,
            });
        }, 600);

        // Final celebratory shower
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 160,
                origin: { y: 0.5 },
                colors: ['#ff69b4', '#ff1493', '#FFD700', '#ffffff'],
                ticks: 220,
                gravity: 0.6,
                drift: 0.1,
                scalar: 1.2,
                shapes: ['circle', 'star'],
            });
        }, 900);
    };

    // Function to open modal with spectacular transition and confetti
    const openModal = () => {
        // Create and animate overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
        
        // Prepare modal content for animation
        const modalContent = wishModal.querySelector('div');
        modalContent.style.transform = 'scale(0.8) translateY(20px)';
        modalContent.style.opacity = '0';
        
        // Trigger animations in sequence
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            wishModal.classList.remove('hidden');
            
            requestAnimationFrame(() => {
                modalContent.style.transform = 'scale(1) translateY(0)';
                modalContent.style.opacity = '1';
                modalContent.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                // Trigger title animation
                const title = modalContent.querySelector('h2');
                if (title) {
                    title.style.animation = 'titlePulse 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
                
                // Fire confetti with slight delay for better timing
                setTimeout(fireConfetti, 200);
            });
        });
    };

    // Function to close modal with spectacular fade-out animation
    const closeModal = () => {
        const modalContent = wishModal.querySelector('div');
        const overlay = document.querySelector('.modal-overlay');
        
        // Animate content out
        modalContent.style.transform = 'scale(0.9) translateY(-20px)';
        modalContent.style.opacity = '0';
        modalContent.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Fade out overlay
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s ease-out';
        }
        
        // Clean up after animations
        setTimeout(() => {
            wishModal.classList.add('hidden');
            if (overlay) {
                document.body.removeChild(overlay);
            }
            // Reset styles for next opening
            modalContent.style = '';
        }, 600);
    };

    // Event listeners
    wishBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    wishModal.addEventListener('click', (e) => {
        if (e.target === wishModal) {
            closeModal();
        }
    });

    // Add floating hearts and sprinkler animations
    const emojis = ['❤️', '✨', '🎉', '💫', '🌟', '💖', '🎊'];
    
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
        document.body.appendChild(element);

        setTimeout(() => {
            document.body.removeChild(element);
        }, 4000);
    }, 300);

    // Add sprinkler effect on button click
    wishBtn.addEventListener('click', () => {
        for(let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.setProperty('--angle', (i * 12) + 'deg');
                sparkle.style.setProperty('--delay', (i * 0.1) + 's');
                document.body.appendChild(sparkle);

                setTimeout(() => {
                    document.body.removeChild(sparkle);
                }, 2000);
            }, i * 50);
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