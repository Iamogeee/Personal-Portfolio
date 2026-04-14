const revealTargets = Array.from(document.querySelectorAll(".reveal"));
const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupRevealOnScroll() {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.22, rootMargin: "0px 0px -30px 0px" }
  );

  revealTargets.forEach((item) => observer.observe(item));
}

function setupTiltCards() {
  if (reducedMotion) {
    return;
  }

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();
      const offsetX = event.clientX - bounds.left;
      const offsetY = event.clientY - bounds.top;
      const rotateY = ((offsetX / bounds.width) - 0.5) * 4;
      const rotateX = ((offsetY / bounds.height) - 0.5) * -4;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

setupRevealOnScroll();
setupTiltCards();
