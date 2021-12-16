if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
} else {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}
