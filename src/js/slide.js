const slideContainer = document.querySelector(".slide");
const slides = document.querySelectorAll(".slide-img");
const dots = document.querySelectorAll(".slider-nav a");
let currentSlide = 0;

function changeSlide() {
  currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
  slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update active dot
  dots.forEach((dot, index) => {
    dot.style.opacity = index === currentSlide ? "1" : "0.75";
  });
}

// Auto-slide every 3 seconds
setInterval(changeSlide, 4000);
