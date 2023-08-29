// MODAL////////////////////////////////////////////////
const modal = document.querySelector('.modal');

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("footer__rules")) {
        modal.classList.add('modal--active');
    }

    if (e.target.classList.contains("modal") || e.target.classList.contains("modal__svg")) {
        modal.classList.remove('modal--active');
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key == 'Escape') {
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
const multiplier = 0.0000121832359;
const multiplierDay = 86400;

const value = document.querySelector("#calc-value");
const input = document.querySelector("#calc-input");
const speedUp = document.querySelector("#sp-up");
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const threeMonth = document.querySelector("#threeMonth");
const sixMonth = document.querySelector("#sixMonth");

function calculate() {
    speedUp.value = (Math.round((input.value * multiplier) * 10000000) / 10000000).toFixed(7);
    day.value = (speedUp.value * multiplierDay).toFixed(2);
    month.value = (speedUp.value * multiplierDay * 30).toFixed(2);
    threeMonth.value = (speedUp.value * multiplierDay * 30 * 3).toFixed(2);
    sixMonth.value = (speedUp.value * multiplierDay * 30 * 6).toFixed(2);
}

value.value = input.value;

input.addEventListener("input", (event) => {
    value.value = event.target.value;
    calculate();
});

value.addEventListener("input", (event) => {

    if (event.target.value > 50000) {
        event.target.value = 50000;
    }

    if (event.target.value < 0) {
        event.target.value = 0;
    }

    input.value = event.target.value;
    calculate();
});



