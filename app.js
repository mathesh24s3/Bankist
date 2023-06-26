const section1El = document.querySelector(".section--1");
const headerElement = document.querySelector("header");
const navBarElement = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav--links");
const learnMoreBtnEl = document.querySelector(".btn--learn-more");
const sectionElements = document.querySelectorAll("section");
// section 1
const featureImgEls = document.querySelectorAll(".feature--img");
// section 2
const tabsBtnContainerEl = document.querySelector(
  ".operations-tabs--container"
);
const tabElements = document.querySelectorAll(".operations--tab");
const tabContentElements = document.querySelectorAll(".operations--content");
// section 3
const slideElements = document.querySelectorAll(".slide");
const dotsContainerEl = document.querySelector(".dots--container");
const swipeRightEl = document.querySelector(".swipe--right");
const swipeLeftEl = document.querySelector(".swipe--left");

const menuFade = function (e) {
  const targetElement = e.target;
  if (!targetElement.classList.contains("nav--link")) return;
  const logoElement = document.querySelector(".header--logo");
  const sibilingElements = targetElement
    .closest(".nav--links")
    .querySelectorAll(".nav--link");
  logoElement.style.opacity = this;
  sibilingElements.forEach((element) => {
    if (targetElement !== element) element.style.opacity = this;
  });
};

navLinks.addEventListener("mouseover", menuFade.bind(0.5));

navLinks.addEventListener("mouseout", menuFade.bind(1));

function goToSection(e) {
  const targetElement = e.target;
  if (!targetElement.classList.contains("nav--link")) {
    return;
  }
  const sectionElement = document.querySelector(
    `${targetElement.getAttribute("href").replace("#", ".")}`
  );
  const sectionElRecords = sectionElement.getBoundingClientRect();
  // sectionElement.scrollIntoView({ behavior: "smooth" });
  // console.log(sectionElement);
  // console.log(section1El.getBoundingClientRect());
  // console.log(window.scrollX, window.scrollY);
  window.scrollTo({
    left: window.scrollX + sectionElRecords.left,
    top: window.scrollY + sectionElRecords.top,
    behavior: "smooth",
  });
}

navLinks.addEventListener("click", goToSection);
learnMoreBtnEl.addEventListener("click", goToSection);

headerElement.style.marginTop =
  navBarElement.getBoundingClientRect().height + "px";

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) navBarElement.classList.add("sticky--nav");
//   else navBarElement.classList.remove("sticky--nav");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navBarElement.getBoundingClientRect().height}px`,
// });

// headerObserver.observe(headerElement);

// Section reveal on scroll
function sectionReveal(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.1,
});

sectionElements.forEach((sectionEl) => {
  sectionEl.classList.add("section--hidden");
  sectionObserver.observe(sectionEl);
});

// img reveal on scroll

function imgReveal(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy--img");
  });
}

const imgObserver = new IntersectionObserver(imgReveal, {
  root: null,
  threshold: 0.5,
});

featureImgEls.forEach((featureImgEl) => imgObserver.observe(featureImgEl));

// section 2 Tab component
const switchTabs = function (e) {
  const clickedEl = e.target.closest(".operations--tab");
  if (!clickedEl.classList.contains("operations--tab")) return;
  tabElements.forEach((tabEl) =>
    tabEl.classList.remove("operations-tab--active")
  );
  clickedEl.classList.add("operations-tab--active");
  const tabContentEl = document.querySelector(
    `.operations-content--${clickedEl.dataset.tab}`
  );
  tabContentElements.forEach((tabContEl) =>
    tabContEl.classList.remove("operations-content--active")
  );
  tabContentEl.classList.add("operations-content--active");
  console.log(e.target, clickedEl, tabContentEl, clickedEl.dataset.tab);
};

tabsBtnContainerEl.addEventListener("click", switchTabs);

// section 3 slider
let currentSlide = 0;

function createDots() {
  slideElements.forEach((_, i) => {
    const html = `<div class="dot dot--${i + 1}" data-dot = ${i}></div>`;
    dotsContainerEl.insertAdjacentHTML("beforeend", html);
  });
}

function activateDot(currSlide) {
  const dotElements = document.querySelectorAll(".dot");
  console.log(dotElements);
  dotElements.forEach((d) => {
    d.classList.remove("dot--active");
  });
  dotElements[currSlide].classList.add("dot--active");
}
createDots();

function goToSlide(currSlide) {
  console.log(currSlide);
  slideElements.forEach((sl, i) => {
    sl.style.transform = `translateX(${(i - currSlide) * 100}%)`;
    sl.classList.remove("slide--active");
  });
  slideElements[currSlide].classList.add("slide--active");
  activateDot(currSlide);
}

goToSlide(0);

dotsContainerEl.addEventListener("click", function (e) {
  const clickedDotEl = e.target;
  if (!clickedDotEl.classList.contains("dot")) return;
  currentSlide = +clickedDotEl.dataset.dot;
  goToSlide(currentSlide);
});

const nextSlide = function () {
  if (currentSlide === slideElements.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slideElements.length - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};


swipeRightEl.addEventListener("click", nextSlide);

swipeLeftEl.addEventListener("click", prevSlide);
