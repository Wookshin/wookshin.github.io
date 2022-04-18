const arrowUp = document.querySelector(".arrow-up");
arrowUp.classList.add("visible");

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView(".top-navigation");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}