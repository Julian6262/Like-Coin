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


// SCROLL/////////////////////////////////////////////
const menu = document.querySelectorAll(".menu__item--scroll");

menu.forEach((item) => {

    item.addEventListener("click", (e) => {

        e.preventDefault();
        let elem = document.getElementById(e.target.getAttribute('href').slice(1));

        document.body.scrollBy({
            top: elem.getBoundingClientRect().top - 50,
            behavior: 'smooth'
        });


    });
});


// CALCULATOR
const value = document.querySelector("#calc-value");
const input = document.querySelector("#calc-input");

value.value = input.value;

input.addEventListener("input", (event) => {
    value.value = event.target.value;
});
value.addEventListener("input", (event) => {

    event11 = event.target.value;
    console.log(event11);
    console.log(typeof event11);

    if (typeof event11) {
        if (event.target.value > 50000) {
            event.target.value = 50000;
        }
        if (event.target.value < 100) {
            event.target.value = 100;
        }
    }


    input.value = event.target.value;

});
