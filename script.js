/**
 * Portfolio Website JavaScript
 * Author: Arnav Deepaware
 * Description: Handles smooth scrolling, animations, and slider functionality
 */

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// This section has been removed as it was a duplicate of the previous IntersectionObserver implementation

/**
 * Involvement Section Slider
 * Handles sliding functionality for involvement cards
 */
let currentSlide = 0;
const involvementSlider = document.querySelector('.involvement-slider');
const slides = document.querySelectorAll('.involvement-item');
let slidesPerView = window.innerWidth > 768 ? 3 : 1; // Add this line

// Clone all slides for seamless loop
function setupInfiniteSlider() {
    // Clone first set of slides and append
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        involvementSlider.appendChild(clone);
    });
    
    // Clone second set of slides and append
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        involvementSlider.appendChild(clone);
    });
}

// Add after setupInfiniteSlider()
document.documentElement.style.setProperty('--total-slides', slides.length);

/**
 * Updates slider position based on direction
 * @param {number} direction - 1 for right, -1 for left
 */
function slideInvolvement(direction) {
    const totalSlides = slides.length;
    currentSlide += direction;
    
    involvementSlider.style.transition = 'transform 0.5s ease';
    updateSliderPosition();

    // Reset position when reaching clone boundary
    if (currentSlide >= totalSlides) {
        setTimeout(() => {
            currentSlide = 0;
            involvementSlider.style.transition = 'none';
            updateSliderPosition();
        }, 500);
    } else if (currentSlide < 0) {
        setTimeout(() => {
            currentSlide = totalSlides - 1;
            involvementSlider.style.transition = 'none';
            updateSliderPosition();
        }, 500);
    }
}

/**
 * Updates slider position and button states
 */
function updateSliderPosition() {
    const slideWidth = 100 / slidesPerView;
    const offset = -currentSlide * slideWidth;
    involvementSlider.style.transform = `translateX(${offset}%)`;
    
    // Keep buttons always active for infinite loop
    const leftButton = document.querySelector('.slider-arrow.left');
    const rightButton = document.querySelector('.slider-arrow.right');
    
    leftButton.style.opacity = '1';
    leftButton.style.cursor = 'pointer';
    rightButton.style.opacity = '1';
    rightButton.style.cursor = 'pointer';
}

// Handle window resize for responsive slider
window.addEventListener('resize', () => {
    const newSlidesPerView = window.innerWidth > 768 ? 3 : 1;
    if (slidesPerView !== newSlidesPerView) {
        currentSlide = 0;
        updateSliderPosition();
    }
});

// Initialize slider
setupInfiniteSlider();
updateSliderPosition();

// Reset transition after any direct position changes
involvementSlider.addEventListener('transitionend', () => {
    involvementSlider.style.transition = 'transform 0.5s ease';
});

// Optional: Auto-slide functionality
function autoSlide() {
    slideInvolvement(1);
}

// Start auto-sliding every 5 seconds
setInterval(autoSlide, 1000000);

/**
 * Intersection Observer for scroll animations
 * Adds 'visible' class to sections when they enter viewport
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

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

/**
 * Toggle visibility of hidden projects
 */
function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const btn = document.querySelector('.show-more-btn');
    const btnText = btn.querySelector('.show-more-text');
    
    hiddenProjects.forEach(project => {
        if (project.style.display === 'none' || project.style.display === '') {
            project.style.display = 'flex';
            btnText.textContent = 'Show Less';
            btn.classList.add('expanded');
        } else {
            project.style.display = 'none';
            btnText.textContent = 'Show More Projects';
            btn.classList.remove('expanded');
        }
    });
}