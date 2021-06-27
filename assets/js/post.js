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