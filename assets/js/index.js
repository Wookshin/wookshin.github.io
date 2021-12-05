function changeHandler(event) {
  console.log("changeHandler");
  var display = document.querySelector(".display");
  console.log(display);
  console.log(this);
  if (this.value === "list") {
    console.log("list");
    if (display.classList.contains("box")) {
      display.classList.remove("box");
    }
    if (!display.classList.contains("list")) {
      display.classList.add("list");
    }
  } else if (this.value === "box") {
    console.log("box");
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
  }
}

window.addEventListener(
  "load",
  () => {
    console.log("load");
    var radios = document.querySelectorAll('input[type=radio][name="display"]');

    Array.prototype.forEach.call(radios, function (radio) {
      radio.addEventListener("click", changeHandler);
    });

    var checkedRadio = document.querySelectorAll(
      'input[type=radio][name="display"]:checked'
    );

    checkedRadio[0].click();

    // <div onclick="location.href='url'">content</div>
    // $("div").click(function(){
    //     window.location=$(this).find("a").attr("href"); return false;
    //  });
  },
  false
);
