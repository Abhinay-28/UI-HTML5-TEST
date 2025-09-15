// HERO SLIDER
const slides = document.querySelectorAll('.hero__slide');
let current = 0;

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-menu .close-btn');

if (hamburger && mobileMenu && closeBtn) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}

function updateSlides() {
  slides.forEach(slide => slide.classList.remove('active', 'left', 'right'));

  slides[current].classList.add('active');

  let leftIndex = (current - 1 + slides.length) % slides.length;
  let rightIndex = (current + 1) % slides.length;

  slides[leftIndex].classList.add('left');
  slides[rightIndex].classList.add('right');
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlides();
}

// Controls
document.querySelector('.hero__control.next').addEventListener('click', nextSlide);
document.querySelector('.hero__control.prev').addEventListener('click', prevSlide);

// Clicking on left or right slide also rotates
slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    if (slide.classList.contains('right')) {
      nextSlide();
    } else if (slide.classList.contains('left')) {
      prevSlide();
    }
  });
});

// Autoplay
// setInterval(nextSlide, 5000);

updateSlides();

// DIAMONDS CAROUSEL
const carousel = document.querySelector('.diamonds__carousel');
let cards = () => Array.from(document.querySelectorAll('.diamond-card'));
const dots = Array.from(document.querySelectorAll('.diamonds__dots .dot'));

let currentIndex = Math.floor(cards().length / 2);

function updateCards() {
  const list = cards();
  list.forEach((card, index) => {
    card.classList.remove('left', 'center', 'right');

    if (index < Math.floor(list.length / 2)) {
      card.classList.add('left');
    } else if (index === Math.floor(list.length / 2)) {
      card.classList.add('center');
    } else {
      card.classList.add('right');
    }
  });

  // 🔥 Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function shiftLeft() {
  carousel.appendChild(carousel.firstElementChild);
  currentIndex = (currentIndex + 1) % cards().length;
  updateCards();
}

function shiftRight() {
  carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
  currentIndex = (currentIndex - 1 + cards().length) % cards().length;
  updateCards();
}

function moveTo(clickedIndex) {
  const list = cards();
  if (clickedIndex < 0 || clickedIndex >= list.length) return;

  const diff = clickedIndex - currentIndex;

  if (diff > 0) {
    shiftLeft();  // always move left if same or ahead
  } else if (diff < 0) {
    shiftRight(); // always move right if behind
  } else {
    // 🔥 same index clicked → still slide (choose a default, here left)
    shiftLeft();
  }
}

// 🔥 Clicking a card
carousel.addEventListener('click', (e) => {
  const clicked = e.target.closest('.diamond-card');
  if (!clicked) return;
  const idx = cards().indexOf(clicked);
  moveTo(idx);
});

// 🔥 Clicking a dot
dots.forEach((dot, i) => dot.addEventListener('click', () => moveTo(i)));

updateCards();



