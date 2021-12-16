window.addEventListener(
  "load",
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

  if (event.target.matches(".bi-sun-fill")) {
    event.target.style.display = "none";
    document.querySelector(".bi-moon").style.display = "inline";
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else if (event.target.matches(".bi-moon")) {
    event.target.style.display = "none";
    document.querySelector(".bi-sun-fill").style.display = "inline";
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else if (event.target.matches(".bi-card-list")) {
    event.target.style.display = "none";
    document.querySelector(".bi-box").style.display = "inline";
    localStorage.setItem("display", "box");

    var display = document.querySelector(".display");

    if (!display) return;

    if (display.classList.contains("list")) {
      display.classList.remove("list");
    }

    if (!display.classList.contains("box")) {
      display.classList.add("box");
    }

    var posts = document.querySelectorAll("div.display.box > div > .post");
    Array.prototype.forEach.call(posts, function (post) {
      post.addEventListener("click", function () {
        post.firstElementChild.click();
      });
    });
  } else if (event.target.matches(".bi-box")) {
    event.target.style.display = "none";
    document.querySelector(".bi-card-list").style.display = "inline";
    localStorage.setItem("display", "list");

    var display = document.querySelector(".display");

    if (!display) return;

    if (display.classList.contains("box")) {
      display.classList.remove("box");
    }
    if (!display.classList.contains("list")) {
      display.classList.add("list");
    }

    var posts = document.querySelectorAll("div.display.list > div > .post");
    Array.prototype.forEach.call(posts, function (post) {
      post.addEventListener("click", function () {
        console.log("click!");
        post.firstElementChild.click();
      });
    });
  }
}

window.addEventListener(
  "load",
  () => {
    console.log("load");

    var icons = document.querySelectorAll(".bi");

    Array.prototype.forEach.call(icons, function (icon) {
      icon.addEventListener("click", iconChangeHandler);
    });

    localStorage.getItem("theme") === "light"
      ? document.querySelector(".bi-moon").click()
      : document.querySelector(".bi-sun-fill").click();

    localStorage.getItem("display") === "list"
      ? document.querySelector(".bi-box").click()
      : document.querySelector(".bi-card-list").click();
  },
  false
);
