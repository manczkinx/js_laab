let slideIndex = 0;
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let slider = document.querySelector('.slider');
let interval;

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateDots();
}

function updateDots() {
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === slideIndex);
    });
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

function currentSlide(index) {
    showSlide(index - 1);
}

function autoSlide() {
    interval = setInterval(nextSlide, 3000);
}

function pauseSlider() {
    clearInterval(interval);
}

function resumeSlider() {
    autoSlide();
}

document.querySelectorAll('.slide img').forEach((img) => {
    img.addEventListener('click', () => {
        pauseSlider();
        document.getElementById('lightbox').style.display = 'block';
        document.getElementById('lightboxImage').src = img.src;
    });
});

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    resumeSlider();
}

document.addEventListener('DOMContentLoaded', () => {
    autoSlide();
    showSlide(slideIndex);
});
