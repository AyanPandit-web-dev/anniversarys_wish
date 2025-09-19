document.addEventListener('DOMContentLoaded', () => {
    // Enhanced device detection function
    const isMobileDevice = () => {
        const hasTouchScreen = (
            ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ||
            ('msMaxTouchPoints' in navigator && navigator.msMaxTouchPoints > 0) ||
            (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
            ('orientation' in window)
        );
        
        const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        return hasTouchScreen || isSmallScreen || isMobileUA;
    };

    // Create shooting star and particle system for desktop devices
    let shootingStar;
    let particles = [];
    const maxParticles = 15;

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'star-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--random-scale', 0.5 + Math.random() * 0.5);
        particle.style.setProperty('--random-opacity', 0.3 + Math.random() * 0.7);
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
        
        return particle;
    }

    if (!isMobileDevice()) {
        shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        const glowEffect = document.createElement('div');
        glowEffect.className = 'glow-effect';
        shootingStar.appendChild(glowEffect);
        document.body.appendChild(shootingStar);
    }

    // Track if button is clicked
    let isButtonClicked = false;

    // Update shooting star position and rotation based on mouse movement
    let lastX = 0;
    let lastY = 0;
    let lastAngle = 0;

    // Only add mousemove listener for desktop devices
    if (!isMobileDevice()) {
        let lastParticleTime = 0;
        const particleInterval = 50; // Minimum time between particles
        
        document.addEventListener('mousemove', (e) => {
            if (!isButtonClicked && shootingStar) {
                const x = e.clientX;
                const y = e.clientY;
                
                // Get button position
                const button = document.getElementById('wishBtn');
                const buttonRect = button.getBoundingClientRect();
                const buttonCenterX = buttonRect.left + buttonRect.width / 2;
                const buttonCenterY = buttonRect.top + buttonRect.height / 2;
                
                // Calculate angle to button
                const dx = buttonCenterX - x;
                const dy = buttonCenterY - y;
                const targetAngle = Math.atan2(dy, dx);
                
                // Smooth angle transition
                const angleDiff = targetAngle - lastAngle;
                const smoothAngle = lastAngle + (angleDiff * 0.2); // Increased smoothing factor
                
                // Calculate movement speed
                const moveSpeedX = x - lastX;
                const moveSpeedY = y - lastY;
                const moveSpeed = Math.sqrt(moveSpeedX * moveSpeedX + moveSpeedY * moveSpeedY);
                
                // Calculate distance to button and normalize it
                const distanceToButton = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
                const normalizedDistance = distanceToButton / maxDistance;
                
                // Calculate trail length based on distance (longer when far, shorter when close)
                const minLength = 50; // Minimum length when very close
                const maxLength = 250; // Maximum length when far
                const baseLength = minLength + (normalizedDistance * (maxLength - minLength));
                
                // Add speed factor for dynamic effect
                const speedFactor = Math.min(moveSpeed * 2, 100);
                
                // Calculate final length and opacity
                const finalLength = baseLength + speedFactor;
                const proximityThreshold = 100; // Distance threshold for vanishing effect
                const opacity = distanceToButton < proximityThreshold 
                    ? Math.max(0.2, (distanceToButton / proximityThreshold) * 0.95)
                    : 0.95;
                
                // Apply enhanced styles
                shootingStar.style.setProperty('--trail-length', `${finalLength}px`);
                shootingStar.style.opacity = opacity;
                
                // Enhanced glow effect near button
                if (distanceToButton < 40) {
                    const glowIntensity = 200 - (distanceToButton * 4);
                    shootingStar.style.filter = `blur(0.5px) brightness(${glowIntensity}%)`;
                    shootingStar.style.boxShadow = `0 0 ${glowIntensity/2}px ${glowIntensity/4}px rgba(255,255,255,0.8)`;
                } else {
                    shootingStar.style.filter = 'blur(0.5px) brightness(120%)';
                    shootingStar.style.boxShadow = '';
                }
                
                // Apply position with smooth transition
                shootingStar.style.left = `${x}px`;
                shootingStar.style.top = `${y}px`;
                shootingStar.style.transform = `rotate(${smoothAngle}rad)`;
                
                lastX = x;
                lastY = y;
                lastAngle = smoothAngle;
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const isMobile = isMobileDevice();
        if (isMobile && shootingStar) {
            shootingStar.remove();
            shootingStar = null;
        } else if (!isMobile && !shootingStar) {
            shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            const glowEffect = document.createElement('div');
            glowEffect.className = 'glow-effect';
            shootingStar.appendChild(glowEffect);
            document.body.appendChild(shootingStar);
        }
    });

    // Hide shooting star when button is clicked (only for desktop)
    document.getElementById('wishBtn').addEventListener('click', () => {
        isButtonClicked = true;
        if (shootingStar) {
            shootingStar.style.opacity = '0';
            setTimeout(() => shootingStar.remove(), 300);
        }
    });

    const wishBtn = document.getElementById('wishBtn');
    const wishModal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('closeBtn');

    // Function to create confetti effects
    const fireConfetti = () => {
        // First burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#ff1493', '#ff69b4', '#ffffff'],
        });

        // Side bursts
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.65 },
                colors: ['#ff69b4', '#ff1493', '#ffffff'],
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.65 },
                colors: ['#ff69b4', '#ff1493', '#ffffff'],
            });
        }, 150);

        // Final burst with stars
        setTimeout(() => {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.7 },
                shapes: ['star'],
                colors: ['#FFD700', '#FFA500', '#ffffff'],
            });
        }, 300);
    };

    // Function to open modal with animation and confetti
    const openModal = () => {
        wishModal.classList.remove('hidden');
        wishModal.querySelector('div').classList.add('scale-100');
        wishModal.querySelector('div').classList.remove('scale-95');
        fireConfetti();
    };

    // Function to close modal with smooth animation
    const closeModal = () => {
        const modalContent = wishModal.querySelector('div');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(10px) scale(0.95)';
        modalContent.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            wishModal.style.opacity = '0';
            wishModal.style.transition = 'opacity 0.3s ease-out';
        }, 100);

        setTimeout(() => {
            wishModal.classList.add('hidden');
            // Reset styles for next opening
            modalContent.style = '';
            wishModal.style = '';
        }, 500);
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