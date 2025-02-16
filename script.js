document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Updated slider functionality
let currentSlide = 0;
    const slider = document.querySelector('.involvement-slider');
    const slides = document.querySelectorAll('.involvement-item');
    const slidesPerView = window.innerWidth > 768 ? 3 : 1;
    const maxSlide = Math.max(0, slides.length - slidesPerView);

    function slideInvolvement(direction) {
        currentSlide = Math.max(0, Math.min(currentSlide + direction, maxSlide));
        updateSliderPosition();
    }

    function updateSliderPosition() {
        const slideWidth = 100 / slidesPerView;
        const offset = -currentSlide * slideWidth;
        slider.style.transform = `translateX(${offset}%)`;
        
        // Update button states
        const leftButton = document.querySelector('.slider-arrow.left');
        const rightButton = document.querySelector('.slider-arrow.right');
        
        leftButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
        leftButton.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
        
        rightButton.style.opacity = currentSlide === maxSlide ? '0.5' : '1';
        rightButton.style.cursor = currentSlide === maxSlide ? 'not-allowed' : 'pointer';
    }

    // Initialize slider
    window.addEventListener('resize', () => {
        const newSlidesPerView = window.innerWidth > 768 ? 3 : 1;
        if (slidesPerView !== newSlidesPerView) {
            currentSlide = 0;
            updateSliderPosition();
        }
    });

    // Initial setup
    updateSliderPosition();

// Add this to your existing JavaScript
let experienceCurrentSlide = 0;
const experienceSlider = document.querySelector('.experience-slider');
const experienceSlides = document.querySelectorAll('.experience-card');
const experienceSlidesPerView = window.innerWidth > 768 ? 3 : 1;
const experienceMaxSlide = Math.max(0, experienceSlides.length - experienceSlidesPerView);

function slideExperience(direction) {
    experienceCurrentSlide = Math.max(0, Math.min(experienceCurrentSlide + direction, experienceMaxSlide));
    updateExperienceSliderPosition();
}

function updateExperienceSliderPosition() {
    const slideWidth = 100 / experienceSlidesPerView;
    const offset = -experienceCurrentSlide * slideWidth;
    experienceSlider.style.transform = `translateX(${offset}%)`;
    
    // Update button states
    const leftButton = document.querySelector('.experience-container .slider-arrow.left');
    const rightButton = document.querySelector('.experience-container .slider-arrow.right');
    
    leftButton.style.opacity = experienceCurrentSlide === 0 ? '0.5' : '1';
    leftButton.style.cursor = experienceCurrentSlide === 0 ? 'not-allowed' : 'pointer';
    
    rightButton.style.opacity = experienceCurrentSlide === experienceMaxSlide ? '0.5' : '1';
    rightButton.style.cursor = experienceCurrentSlide === experienceMaxSlide ? 'not-allowed' : 'pointer';
}

// Update experience slider on window resize
window.addEventListener('resize', () => {
    const newExperienceSlidesPerView = window.innerWidth > 768 ? 3 : 1;
    if (experienceSlidesPerView !== newExperienceSlidesPerView) {
        experienceCurrentSlide = 0;
        updateExperienceSliderPosition();
    }
});

// Initialize experience slider
updateExperienceSliderPosition();