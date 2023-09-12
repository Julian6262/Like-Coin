// CALCULATOR
const multiplier = 0.0000121832359;
const multiplierDay = 86400;
const checkCalculator = document.querySelector('.calculator');

if (checkCalculator) {
    const calcOutput = document.getElementById("calc-value");
    const calcInput = document.getElementById("calc-input");
    const speedUp = document.getElementById("sp-up");
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const threeMonth = document.getElementById("threeMonth");
    const sixMonth = document.getElementById("sixMonth");

    function calculate() {
        speedUp.value = (Math.round((calcInput.value * multiplier) * 10000000) / 10000000).toFixed(7);
        day.value = (speedUp.value * multiplierDay).toFixed(2);
        month.value = (speedUp.value * multiplierDay * 30).toFixed(2);
        threeMonth.value = (speedUp.value * multiplierDay * 30 * 3).toFixed(2);
        sixMonth.value = (speedUp.value * multiplierDay * 30 * 6).toFixed(2);
    }

    calcOutput.value = calcInput.value;
    calculate();

    calcInput.addEventListener("input", (event) => {
        calcOutput.value = event.target.value;
        calculate();
    });

    calcOutput.addEventListener("input", (event) => {

        if (event.target.value > 50000) {
            event.target.value = 50000;
        }

        if (event.target.value < 1) {
            event.target.value = 1;
        }

        calcInput.value = event.target.value;
        calculate();
    });
}


// SPEEDUP-COUNT
const speedup = document.querySelector('.speedup');

if (speedup) {
    const speedupInput = document.getElementById("speedupInput");
    const speedupOutput = document.getElementById("speedupOutput");

    speedupOutput.value = (Math.round((speedupInput.value * multiplier) * 10000000) / 10000000).toFixed(7);

    speedupInput.addEventListener("input", (event) => {

        if (event.target.value > 50000) {
            event.target.value = 50000;
        }

        if (event.target.value < 1) {
            event.target.value = 1;
        }

        if (event.target.value > 99 && event.target.value < 50001) {
            speedupOutput.value = (Math.round((speedupInput.value * multiplier) * 10000000) / 10000000).toFixed(7);
        }
    });
}


// MODAL////////////////////////////////////////////////
const modal = document.querySelector('.modal');

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("footer__rules") || e.target.classList.contains("main__content-btn")) {
        modal.classList.add('modal--active');
    }

    if (e.target.classList.contains("modal") || e.target.classList.contains("modal__svg")) {
        modal.classList.remove('modal--active');
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
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


// ACCORDEON/////////////////////////////////
const checkQuestions = document.querySelector('.questions');

if (checkQuestions) {

    const accordeon = document.querySelector('.questions__items');
    const accordeonTitles = accordeon.querySelectorAll('.questions__header');

    accordeonTitles.forEach.call(accordeonTitles, function (accordeonTitle) {
        accordeonTitle.addEventListener('click', function () {
            const currentText = accordeonTitle.parentElement.querySelector('.questions__text')
            accordeonTitle.classList.toggle('questions__header--active');
            currentText.classList.toggle('questions__text--visible');

            if (currentText.classList.contains('questions__text--visible')) {
                currentText.style.maxHeight = currentText.scrollHeight + 'px';
            } else {
                currentText.style.maxHeight = null;
            }
        });
    });
}
