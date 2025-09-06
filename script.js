document.addEventListener('DOMContentLoaded', () => {
    // Create shooting star element
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    document.body.appendChild(shootingStar);

    // Track if button is clicked
    let isButtonClicked = false;

    // Update shooting star position and rotation based on mouse movement
    let lastX = 0;
    let lastY = 0;
    let lastAngle = 0;

    document.addEventListener('mousemove', (e) => {
        if (!isButtonClicked) {
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
            
            // Apply styles
            shootingStar.style.setProperty('--trail-length', `${finalLength}px`);
            shootingStar.style.opacity = opacity;
            
            // Add bright flash when very close to button
            if (distanceToButton < 30) {
                shootingStar.style.filter = `blur(1px) brightness(${200 - (distanceToButton * 5)}%)`;
            } else {
                shootingStar.style.filter = 'blur(1px)';
            }
            
            shootingStar.style.left = `${x}px`;
            shootingStar.style.top = `${y}px`;
            shootingStar.style.transform = `rotate(${smoothAngle}rad)`;
            
            lastX = x;
            lastY = y;
            lastAngle = smoothAngle;
        }
    });

    // Hide shooting star when button is clicked
    document.getElementById('wishBtn').addEventListener('click', () => {
        isButtonClicked = true;
        shootingStar.style.opacity = '0';
        setTimeout(() => shootingStar.remove(), 300);
    });

    const wishBtn = document.getElementById('wishBtn');
    const wishModal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('closeBtn');

    // Function to open modal with animation
    const openModal = () => {
        wishModal.classList.remove('hidden');
        wishModal.querySelector('div').classList.add('scale-100');
        wishModal.querySelector('div').classList.remove('scale-95');
    };

    // Function to close modal with animation
    const closeModal = () => {
        wishModal.querySelector('div').classList.add('scale-95');
        wishModal.querySelector('div').classList.remove('scale-100');
        setTimeout(() => {
            wishModal.classList.add('hidden');
        }, 300);
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

    // Add floating hearts animation
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-20px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animation = 'float-up 4s linear';
        heart.style.opacity = '0.7';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);

        setTimeout(() => {
            document.body.removeChild(heart);
        }, 4000);
    }, 500);
});

// Add floating hearts animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);