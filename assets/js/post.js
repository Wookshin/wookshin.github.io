window.addEventListener("load", () => {
    document.getElementsByClassName('up')[0].addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    });

    document.getElementsByClassName('down')[0].addEventListener('click', function () {
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth' });
        return false;
    });
}, false);

var isScrolling;

window.addEventListener("scroll", () => {
    window.clearTimeout( isScrolling );
    var elem = document.querySelector('.arrow');
    elem.style.display = 'block';
    isScrolling = setTimeout(function() {
        elem.style.display = 'none';
	}, 1500);
}, false);