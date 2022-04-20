const flicking = new Flicking("#flick", {
  renderOnlyVisible: true,
});

var posts = document.querySelectorAll(".flicking-panel");
Array.prototype.forEach.call(posts, function (post) {
  post.addEventListener("click", function () {
    post.firstElementChild.click();
  });
});

