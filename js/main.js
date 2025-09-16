// HERO SLIDER
const slides = document.querySelectorAll('.hero__slide');
let current = 0;

// Mobile Menu
// const hamburger = document.querySelector('.hamburger');
 
  const closeMenu = document.getElementById("closeMenu");
   const mobileMenu = document.getElementById("mobileMenu");

   
const hamburger = document.getElementById("hamburgerBtn");



  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });


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
let CARDS = () => Array.from(document.querySelectorAll('.diamond-card'));
// const dots = Array.from(document.querySelectorAll('.diamonds__dots .dot'));


//  const carousel = document.querySelector(".diamonds__carousel");
  const cards = document.querySelectorAll(".diamond-card");
  const dotsContainer = document.querySelector(".diamonds__dots");

  function updateDots() {
  dotsContainer.innerHTML = ""; // clear old dots
  let totalDots;

  if (window.innerWidth <= 768) {
    totalDots = Math.ceil(CARDS().length / 3); // group of 3 in mobile
  } else {
    totalDots = CARDS().length; // one per card in desktop
  }

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    // 🔥 Add event listener when creating the dot
    dot.addEventListener("click", () => moveTo(i));

    dotsContainer.appendChild(dot);
  }
}


  updateDots();
  window.addEventListener("resize", updateDots);

let currentIndex = Math.floor(CARDS().length / 2);

function updateCARDS() {
  const list = CARDS();
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

  // 🔥 Find all dots again
  const allDots = document.querySelectorAll(".diamonds__dots .dot");

  let activeDotIndex;
  if (window.innerWidth <= 768) {
    // group of 3 → figure out which "page" we are on
    activeDotIndex = Math.floor(currentIndex / 3);
  } else {
    // one per card
    activeDotIndex = currentIndex;
  }

  allDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeDotIndex);
  });
}

  // 🔥 Update dots
  // dots.forEach((dot, i) => {
  //   dot.classList.toggle('active', i === currentIndex);
  // });


function shiftLeft() {
  carousel.appendChild(carousel.firstElementChild);
  currentIndex = (currentIndex + 1) % CARDS().length;
  updateCARDS();
}

function shiftRight() {
  carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
  currentIndex = (currentIndex - 1 + CARDS().length) % CARDS().length;
  updateCARDS();
}

function moveTo(clickedIndex) {
  const list = CARDS();
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
  const idx = CARDS().indexOf(clicked);
  moveTo(idx);
});

// 🔥 Clicking a dot
dots.forEach((dot, i) => dot.addEventListener('click', () => moveTo(i)));

updateCARDS();



// document.addEventListener("DOMContentLoaded", () => {
//   const mobileMenu = document.getElementById("mobileMenu");
//   const closeMenu = document.getElementById("closeMenu");
//   const hamburger = document.getElementById("hamburgerBtn");

//   if (hamburger && mobileMenu && closeMenu) {
//     hamburger.addEventListener("click", () => {
//       mobileMenu.classList.add("active");
//     });

//     closeMenu.addEventListener("click", () => {
//       mobileMenu.classList.remove("active");
//     });
//   }
// });


