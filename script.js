// Global Variables
let currentPage = 0;
const totalPages = 8;
let confettiInterval;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    startTypewriterEffect();
    createFloatingElements();
});

function initializeWebsite() {
    // Set up initial page state
    showPage(0);
    updateProgressDots();
    
    // Add click handlers to progress dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index <= currentPage + 1 || index === 0) {
                goToPage(index);
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Preload images for smooth transitions
    preloadImages();
}

function handleKeyNavigation(e) {
    switch(e.key) {
        case 'ArrowRight':
            if (currentPage < totalPages - 1) nextPage();
            break;
        case 'ArrowLeft':
            if (currentPage > 0) prevPage();
            break;
        case 'Home':
            goHome();
            break;
        case 'End':
            if (currentPage === 6) showGallery();
            break;
    }
}

function preloadImages() {
    for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `pics/pic${i}.png`;
    }
}

// Navigation Functions
function nextPage() {
    if (currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        goToPage(currentPage - 1);
    }
}

function goToPage(pageNum) {
    if (pageNum < 0 || pageNum >= totalPages) return;
    
    const currentPageEl = document.getElementById(`page-${currentPage}`);
    const nextPageEl = document.getElementById(`page-${pageNum}`);
    
    // Add transition classes
    currentPageEl.classList.add('page-transition-exit');
    
    setTimeout(() => {
        currentPageEl.classList.remove('active', 'page-transition-exit');
        nextPageEl.classList.add('active', 'page-transition-enter');
        
        currentPage = pageNum;
        updateProgressDots();
        
        // Trigger page-specific animations
        triggerPageAnimations(pageNum);
        
        setTimeout(() => {
            nextPageEl.classList.remove('page-transition-enter');
        }, 600);
    }, 300);
}

function showPage(pageNum) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    document.getElementById(`page-${pageNum}`).classList.add('active');
    currentPage = pageNum;
    updateProgressDots();
    triggerPageAnimations(pageNum);
}

function updateProgressDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
        
        // Add visited state for dots behind current page
        if (index < currentPage) {
            dot.style.background = 'linear-gradient(45deg, #98fb98, #90ee90)';
        } else if (index === currentPage) {
            dot.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493)';
        } else {
            dot.style.background = '#ffb6c1';
        }
    });
}

function triggerPageAnimations(pageNum) {
    // Remove existing animations
    document.querySelectorAll('.journey-content, .gallery-header, .birthday-title').forEach(el => {
        el.style.animation = 'none';
    });
    
    // Force reflow
    void document.offsetHeight;
    
    // Add animations based on page
    switch(pageNum) {
        case 0:
            startTypewriterEffect();
            break;
        case 6:
            startConfetti();
            break;
        case 7:
            animateGalleryItems();
            break;
    }
    
    // Re-add content animations
    const content = document.querySelector(`#page-${pageNum} .journey-content`);
    if (content) {
        content.style.animation = 'fadeInUp 1s ease-out';
    }
}

// Typewriter Effect
function startTypewriterEffect() {
    const typewriterEl = document.querySelector('.typewriter');
    if (!typewriterEl) return;
    
    typewriterEl.style.width = '0';
    typewriterEl.style.borderRight = '3px solid #ff69b4';
    
    setTimeout(() => {
        typewriterEl.style.animation = 'typing 3s steps(30, end) both, blink-caret 1s step-end infinite 3s';
    }, 2000);
}

// Confetti Animation
function startConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    // Clear existing confetti
    container.innerHTML = '';
    
    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(container);
        }, i * 100);
    }
    
    // Continue creating confetti for 5 seconds
    confettiInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createConfettiPiece(container);
        }
    }, 500);
    
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 5000);
}

function createConfettiPiece(container) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    const shapes = ['💖', '🌟', '✨', '🎉', '💕', '🦋'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    confetti.textContent = randomShape;
    confetti.style.fontSize = '1rem';
    confetti.style.width = 'auto';
    confetti.style.height = 'auto';
    
    container.appendChild(confetti);
    
    // Remove confetti piece after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 5000);
}

// Gallery Functions
function showGallery() {
    goToPage(7);
}

function animateGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = `galleryItemIn 0.8s ease-out both`;
            item.style.animationDelay = (index * 0.1) + 's';
        }, 100);
    });
}

// Surprise Function
function surpriseMe() {
    const popup = document.getElementById('surprise-popup');
    popup.classList.add('show');
    
    // Add extra sparkles during surprise
    createSurpriseSparkles();
}

function closeSurprise() {
    const popup = document.getElementById('surprise-popup');
    popup.classList.remove('show');
}

function createSurpriseSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.width = '100%';
    sparkleContainer.style.height = '100%';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '999';
    
    document.body.appendChild(sparkleContainer);
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.animation = 'sparkleExplosion 2s ease-out forwards';
            sparkleContainer.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 50);
    }
    
    setTimeout(() => {
        if (sparkleContainer.parentNode) {
            sparkleContainer.parentNode.removeChild(sparkleContainer);
        }
    }, 3000);
}

// Add sparkle explosion animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleExplosion {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

function goHome() {
    goToPage(0);
}

// Create Additional Floating Elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Add more dynamic floating elements
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingHeart(container);
        }
    }, 3000);
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            createFloatingSparkle(container);
        }
    }, 2000);
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.fontSize = '1.2rem';
    heart.style.animation = 'floatUp 8s linear forwards';
    heart.style.pointerEvents = 'none';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

function createFloatingSparkle(container) {
    const sparkle = document.createElement('div');
    const sparkles = ['✨', '🌟', '💫', '⭐'];
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.position = 'absolute';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.fontSize = '1rem';
    sparkle.style.animation = 'sparkleFloat 4s ease-in-out forwards';
    sparkle.style.pointerEvents = 'none';
    
    container.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 4000);
}

// Add additional animations
const additionalAnimations = document.createElement('style');
additionalAnimations.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        25% {
            opacity: 1;
            transform: scale(1.2) rotate(90deg);
        }
        75% {
            opacity: 1;
            transform: scale(0.8) rotate(270deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(additionalAnimations);

// Image Loading with Cute Loading Animation
function handleImageLoad() {
    const images = document.querySelectorAll('.journey-image, .gallery-item img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            console.log('Successfully loaded image:', this.src);
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.addEventListener('error', function() {
            console.log('Failed to load image:', this.src);
            console.log('Full path attempted:', window.location.origin + '/' + this.src);
            this.src = 'https://via.placeholder.com/400x300/ffb6c1/ffffff?text=💖+Beautiful+Memory+💖';
        });
        
        // Set initial state for loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'all 0.5s ease';
    });
}

// Call image loading setup
handleImageLoad();

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && currentPage > 0) {
            // Swipe right - go back
            prevPage();
        } else if (swipeDistance < 0 && currentPage < totalPages - 1) {
            // Swipe left - go forward
            nextPage();
        }
    }
}

// Special Effects for Birthday Page
function createBirthdayEffects() {
    // Add special birthday sparkles
    const birthdayContainer = document.getElementById('page-6');
    if (!birthdayContainer) return;
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = '🎉';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.animation = 'birthdaySparkle 3s ease-out forwards';
        sparkle.style.pointerEvents = 'none';
        
        birthdayContainer.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 3000);
    }, 1000);
}

// Add birthday sparkle animation
const birthdayStyle = document.createElement('style');
birthdayStyle.textContent = `
    @keyframes birthdaySparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(birthdayStyle);

// Gallery Interaction
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Create a modal-like zoom effect
            createImageModal(this.querySelector('img').src, index);
        });
    });
});

function createImageModal(imageSrc, index) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="${imageSrc}" alt="Memory ${index + 1}">
            <div class="modal-message">
                <h4>Beautiful Memory #${index + 1} 💖</h4>
                <p>Every picture tells a story of our friendship ✨</p>
            </div>
            <button class="close-modal" onclick="closeImageModal()">Close 💕</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Add modal styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .image-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background: linear-gradient(135deg, #ffeef8, #f8e8ff);
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        animation: modalSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border: 3px solid #ff69b4;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 400px;
        border-radius: 15px;
        margin-bottom: 20px;
        box-shadow: 0 8px 25px rgba(255, 182, 193, 0.4);
    }
    
    .modal-message h4 {
        font-family: 'Dancing Script', cursive;
        font-size: 1.8rem;
        color: #ff1493;
        margin-bottom: 10px;
    }
    
    .modal-message p {
        color: #8b5a96;
        font-weight: 500;
        margin-bottom: 20px;
    }
    
    .close-modal {
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        border: none;
        color: white;
        padding: 12px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        font-family: 'Quicksand', sans-serif;
    }
    
    .close-modal:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(255, 20, 147, 0.4);
    }
    
    @keyframes modalSlideIn {
        0% {
            transform: scale(0.5) translateY(-50px);
            opacity: 0;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(modalStyle);

// Page-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    // Start birthday effects when page 6 is reached
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'page-6' && mutation.target.classList.contains('active')) {
                createBirthdayEffects();
            }
        });
    });
    
    const page6 = document.getElementById('page-6');
    if (page6) {
        observer.observe(page6, { attributes: true, attributeFilter: ['class'] });
    }
});

// Smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add cute cursor trail effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        createCursorSparkle(e.clientX, e.clientY);
    }
});

function createCursorSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '0.8rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'cursorSparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add cursor sparkle animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorSparkle {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(cursorStyle);

// Performance optimization - pause animations when page is not visible
document.addEventListener('visibilitychange', function() {
    const floatingElements = document.querySelectorAll('.floating-elements > *');
    
    if (document.hidden) {
        floatingElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        floatingElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}
