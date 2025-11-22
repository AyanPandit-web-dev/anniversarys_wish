document.addEventListener('DOMContentLoaded', () => {
    let isButtonClicked = false;

    const wishBtn = document.getElementById('wishBtn');
    const wishModal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('closeBtn');

    const fireConfetti = () => {
        confetti({
            particleCount: 250,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff6f61', '#6a5acd', '#ffcc00', '#ff1493'],
            shapes: ['circle', 'star'],
            ticks: 300,
            gravity: 0.8,
            scalar: 1.5,
            drift: 0.1,
        });

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 75,
                    angle: 60 + (i * 30),
                    spread: 50,
                    origin: { x: Math.random(), y: 0.6 },
                    colors: ['#ff6f61', '#6a5acd'],
                    ticks: 200,
                    gravity: 0.5,
                });
            }, i * 300);
        }
    };

    const openModal = () => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
        wishModal.classList.remove('hidden');

        setTimeout(() => {
            overlay.classList.add('show');
            wishModal.classList.add('show');
            const title = wishModal.querySelector('h2');
            const paragraphs = wishModal.querySelectorAll('p');
            const button = wishModal.querySelector('button');

            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    title.style.transition = 'all 0.6s ease-out';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }, 300);
            }

            paragraphs.forEach((p, index) => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    p.style.transition = 'all 0.6s ease-out';
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, 400 + (index * 150));
            });

            if (button) {
                button.style.opacity = '0';
                button.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    button.style.transition = 'all 0.6s ease-out';
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1)';
                }, 800);
            }

            setTimeout(fireConfetti, 400);
        }, 100);
    };

    const closeModal = () => {
        const modalContent = wishModal.querySelector('div');
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
            if (overlay) {
                document.body.removeChild(overlay);
            }
            modalContent.style = '';
        }, 500);
    };

    wishBtn.addEventListener('click', function (e) {
        this.classList.add('button-clicked');
        const ripple = document.createElement('div');
        ripple.className = 'btn-ripple';
        ripple.style.left = (e.clientX - this.getBoundingClientRect().left) + 'px';
        ripple.style.top = (e.clientY - this.getBoundingClientRect().top) + 'px';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
            this.classList.remove('button-clicked');
            openModal();
        }, 600);
    });

    closeBtn.addEventListener('click', closeModal);

    wishModal.addEventListener('click', (e) => {
        if (e.target === wishModal) {
            closeModal();
        }
    });

    const emojis = ['❤️', '✨', '🎉', '💫', '🌟'];

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
        document.body.appendChild(element);

        setTimeout(() => {
            document.body.removeChild(element);
        }, 4000);
    }, 300);

    wishBtn.addEventListener('click', () => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.setProperty('--angle', (i * 15) + 'deg');
                sparkle.style.setProperty('--delay', (i * 0.1) + 's');
                document.body.appendChild(sparkle);

                setTimeout(() => {
                    document.body.removeChild(sparkle);
                }, 2000);
            }, i * 50);
        }
    });
});

// Enhanced floating animation style
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