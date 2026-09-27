const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});

menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);


document.querySelectorAll(".acc-item").forEach((item, _, all) => {
  item.querySelector(".acc-head").addEventListener("click", () => {
    all.forEach((other) => {
      const isTarget = other === item;

      other.classList.toggle("open", isTarget);

      other
        .querySelector(".acc-head")
        .setAttribute("aria-expanded", isTarget);
    });
  });
});


const countUp = (el) => {
  const target = Number(el.dataset.to);
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / 1800, 1);

    el.textContent = Math.round(
      target * (1 - Math.pow(1 - p, 3))
    );

    if (p < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("in");

      entry.target
        .querySelectorAll(".count")
        .forEach(countUp);

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));



/* =========================
   TESTIMONIAL SLIDER
========================= */

const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;

const show = (index) => {
  slides[current].classList.remove("active");

  current = index;

  slides[current].classList.add("active");
};


// NEXT
nextBtn.addEventListener("click", () => {
  const next = (current + 1) % slides.length;
  show(next);
});


// PREVIOUS
prevBtn.addEventListener("click", () => {
  const previous =
    (current - 1 + slides.length) % slides.length;

  show(previous);
});



const form = document.getElementById("newsletter");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  document.getElementById("newsletter-note").textContent =
    "Thanks! You're on the list.";

  form.reset();
});
let startX = 0;
let isDragging = false;

slides.forEach((slide) => {
  slide.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    slide.style.cursor = "grabbing";
  });

  slide.addEventListener("mouseup", (e) => {
    if (!isDragging) return;

    const difference = e.clientX - startX;
    isDragging = false;
    slide.style.cursor = "grab";

    if (difference < -50) {
      // drag left → next
      show((current + 1) % slides.length);
    }

    if (difference > 50) {
      // drag right → previous
      show((current - 1 + slides.length) % slides.length);
    }
  });

  slide.addEventListener("mouseleave", () => {
    isDragging = false;
    slide.style.cursor = "grab";
  });
});
slides.forEach((slide) => {
  slide.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slide.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const difference = endX - startX;

    if (difference < -50) {
      show((current + 1) % slides.length);
    }

    if (difference > 50) {
      show((current - 1 + slides.length) % slides.length);
    }
  });
});


const nav = document.getElementById("nav");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    nav.classList.add("hide");
  } else {
    nav.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});