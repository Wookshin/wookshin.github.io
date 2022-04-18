window.addEventListener(
  "DOMContentLoaded",
  () => {
    document
      .getElementsByClassName("logo")[0]
      .addEventListener("click", function (event) {
        location.href = "/";
      });
  },
  false
);

function iconChangeHandler(event) {
  console.log("iconChangeHandler");

  if (event.target.matches(".fa-sun")) {
    event.target.style.display = "none";
    document.querySelector(".fa-moon").style.display = "inline";
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else if (event.target.matches(".fa-moon")) {
    event.target.style.display = "none";
    document.querySelector(".fa-sun").style.display = "inline";
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } 
}

window.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("DOMContentLoaded");

    var icons = document.querySelectorAll(".toggle");

    Array.prototype.forEach.call(icons, function (icon) {
      icon.addEventListener("click", iconChangeHandler);
    });

    localStorage.getItem("theme") === "light"
      ? document.querySelector(".fa-moon").click()
      : document.querySelector(".fa-sun").click();
  },
  false
);
