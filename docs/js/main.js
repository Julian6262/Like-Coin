// MODAL////////////////////////////////////////////////
const modal = document.querySelector('.modal');

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("footer__rules")) {
        modal.classList.add('modal--active');
    }

    if (e.target.classList.contains("modal") || e.target.classList.contains("modal__svg")) {
        modal.classList.remove('modal--active');
    }
});



