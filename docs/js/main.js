let calculatorTitle = document.querySelector(".calculator__title");  // 1st page selector
let speedupInput = document.getElementById("speedupInput");     // speedup page selector
let accordeon = document.querySelector('.questions__items');         // questions page selector
let table = document.querySelector(".referrals__table-contentSort"); // sorting page selector

const MULTIPLIER = 0.01;


// SCROLL-PAGE/////////////////////////////////
if (calculatorTitle) {
    let startTitle = document.querySelector(".start__title");
    let startText = document.querySelector(".start__text");
    let startItems = document.querySelectorAll(".start__item");
    let supportText = document.querySelector(".support__text");
    let formInput = document.querySelector(".formInput");

    let calculatorCheck = false;
    let startCheck = false;
    let startTextCheck = false;
    let startItemCheck = false;
    let supportTextCheck = false;
    let formInputCheck = false;

    function scroll() {
        let windowPos = window.innerHeight + window.scrollY;
        let calculatorTitlePos = windowPos - calculatorTitle.offsetTop;
        let startTitlePos = windowPos - startTitle.offsetTop;
        let startTextPos = windowPos - startText.offsetTop;
        let startItemPos = windowPos - startItems[0].offsetTop;
        let supportTextPos = windowPos - supportText.offsetTop;
        let formInputPos = windowPos - formInput.offsetTop;

        if (calculatorTitlePos >= 0 && calculatorCheck === false) {
            calculatorCheck = true;
            calculatorTitle.classList.add('calculator__title--fade');
        } else if (calculatorTitlePos < 0 && calculatorCheck === true) {
            calculatorCheck = false;
            calculatorTitle.classList.remove('calculator__title--fade');
        }

        if (startTitlePos >= 0 && startCheck === false) {
            startCheck = true;
            startTitle.classList.add('start__title--fade');
        } else if (startTitlePos < 0 && startCheck === true) {
            startCheck = false;
            startTitle.classList.remove('start__title--fade');
        }

        if (startTextPos >= 0 && startTextCheck === false) {
            startTextCheck = true;
            startText.classList.add('start__text--fade');
        } else if (startTextPos < 0 && startTextCheck === true) {
            startTextCheck = false;
            startText.classList.remove('start__text--fade');
        }

        if (supportTextPos >= 0 && supportTextCheck === false) {
            supportTextCheck = true;
            supportText.classList.add('support__text--fade');
        } else if (supportTextPos < 0 && supportTextCheck === true) {
            supportTextCheck = false;
            supportText.classList.remove('support__text--fade');
        }

        if (startItemPos >= 0 && startItemCheck === false) {
            startItemCheck = true;
            startItems.forEach((item) => {
                item.classList.add('start__item--fade');
            });
        } else if (startItemPos < 0 && startItemCheck === true) {
            startItemCheck = false;
            startItems.forEach((item) => {
                item.classList.remove('start__item--fade');
            });
        }

        if (formInputPos >= 0 && formInputCheck === false) {
            formInputCheck = true;
            formInput.classList.add('formInput--fade');
        } else if (formInputPos < 0 && formInputCheck === true) {
            formInputCheck = false;
            formInput.classList.remove('formInput--fade');
        }
    }

    scroll();

    window.addEventListener('resize', scroll);
    window.addEventListener('scroll', scroll);
}


// CARDS/////////////////////////////////
if (calculatorTitle) {
    let cards = document.querySelectorAll(".start__item");

    cards.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            for (let card of cards) {
                let rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        });
    });
}


// SWIPER/////////////////////////////////
if (calculatorTitle) {
    let topCrypto = document.querySelector('.top__crypto');

    new Swiper(topCrypto, {
        slidesPerView: 3,
        freeMode: true,
        grabCursor: true,
        autoplay: {
            delay: 5500,
            disableOnInteraction: false,
        },
    });
}


// CALCULATOR/////////////////////////////////
if (calculatorTitle) {
    let idInterval;
    let idIntervalDown;
    let idTimeoutDown;
    let idIntervalUp;
    let idTimeoutUp;
    let speedStart = false;

    let calcInput = document.querySelector(".formInput__input");
    let calculatorSpeed = document.querySelector(".calculator__profit-speed");
    let calculatorOutput = document.querySelector(".calculator__profit-output");
    let inputMinus = document.querySelector(".formInput__minus");
    let inputPlus = document.querySelector(".formInput__plus");
    let hour = document.getElementById("hour");
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let threeMonth = document.getElementById("threeMonth");

    function calculate(sign) {
        calculatorOutput.value = (0).toFixed(5);

        if (sign) {
            calcInput.value = (sign === "-" ? +calcInput.value - 1 : +calcInput.value + 1);
        }

        if (calcInput.value > 5000) {
            calcInput.value = 5000;
        }
        if (calcInput.value < 0 || calcInput.value === "") {
            calcInput.value = 0;
        }

        if (calcInput.value > 0) {
            calculatorSpeed.classList.add('calculator__profit-speed--fade');
        } else {
            calculatorSpeed.classList.remove('calculator__profit-speed--fade');
        }

        hour.value = (calcInput.value * MULTIPLIER).toFixed(2);
        day.value = (hour.value * 24).toFixed(2);
        month.value = (day.value * 30).toFixed(2);
        threeMonth.value = (month.value * 3).toFixed(2);

        clearInterval(idInterval);

        if (calcInput.value > 0 && speedStart) {
            idInterval = setInterval(() => {
                calculatorOutput.value = (+calculatorOutput.value + 0.00001).toFixed(5);
            }, 3600 / calcInput.value);
        }
    }

    calcInput.addEventListener("keydown", (event) => {
        if (isNaN(event.key) && event.key !== 'Backspace' && event.key !== 'ArrowUp'
            && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            event.preventDefault();
        }
    });

    calcInput.addEventListener("input", () => {
        speedStart = true;
        calculate();
    });

    inputMinus.addEventListener("mousedown", () => {
        speedStart = false;
        idTimeoutDown = setTimeout(() => {
            idIntervalDown = setInterval(() => {
                calculate("-");
            }, 10);
        }, 200);
    });

    inputMinus.addEventListener("mouseup", () => {
        clearInterval(idIntervalDown);
        clearTimeout(idTimeoutDown);
        speedStart = true;
        calculate("-");
    });

    inputPlus.addEventListener("mousedown", () => {
        speedStart = false;
        idTimeoutUp = setTimeout(() => {
            idIntervalUp = setInterval(() => {
                calculate("+");
            }, 10);
        }, 200);

    });

    inputPlus.addEventListener("mouseup", () => {
        clearInterval(idIntervalUp);
        clearTimeout(idTimeoutUp);
        speedStart = true;
        calculate("+");
    });
}


// SPEEDUP-COUNT/////////////////////////////////  !!!!!!!!!!!!!!!!!!!  ДОДЕЛАТЬ  !!!!!!!!!!!!!!!!!!!!!!!!!
if (speedupInput) {
    let speedupOutput = document.getElementById("speedupOutput");

    speedupOutput.value = (Math.round((speedupInput.value * MULTIPLIER) * 10000000) / 10000000).toFixed(5);

    speedupInput.addEventListener("input", (event) => {

        if (event.target.value > 5000) {
            event.target.value = 5000;
        }

        if (event.target.value < 0 || event.target.value === "") {
            event.target.value = 0;
        }

        if (event.target.value >= 0 && event.target.value < 5001) {
            speedupOutput.value = (Math.round((speedupInput.value * MULTIPLIER) * 10000000) / 10000000).toFixed(5);
        }
    });
}


// MODAL////////////////////////////////////////////////
let footerRules = document.querySelector('.footer__rules');
let modal = document.querySelector('.modal');
let contentBtn = document.querySelector('.main__content-btn');

footerRules.addEventListener("click", () => {
    modal.classList.add('modal--active');
});

if (contentBtn) {
    contentBtn.addEventListener("click", () => {
        modal.classList.add('modal--active');
    });
}

modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal") || e.target.classList.contains("modal__svg")) {
        modal.classList.remove('modal--active');
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
        modal.classList.remove('modal--active');
    }
});


// SCROLL-MENU/////////////////////////////////////////////
if (calculatorTitle) {
    let menu = document.querySelectorAll(".menu__item--scroll");

    menu.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            let elem = document.getElementById(e.target.getAttribute('href').slice(1));
            window.scrollBy({
                top: elem.getBoundingClientRect().top - 150,
                behavior: 'smooth'
            });
        });
    });
}


// ACCORDEON/////////////////////////////////
if (accordeon) {
    let accordeonTitles = accordeon.querySelectorAll('.questions__header');

    accordeonTitles.forEach.call(accordeonTitles, function (accordeonTitle) {
        accordeonTitle.addEventListener('click', function () {
            let currentText = accordeonTitle.parentElement.querySelector('.questions__text')
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


// TABLE-STATUS/////////////////////////////////
let payoutStatus = document.querySelectorAll('.payout-status');
let depositStatus = document.querySelectorAll('.deposit-status');
let historyStatus = document.querySelectorAll('.history-status');
let supportsStatus = document.querySelectorAll('.supports-status');
let cryptoColor = document.querySelectorAll('.top__crypto-color');

if (depositStatus) {
    depositStatus.forEach((item) => {
        if (item.innerText === 'Зачислено') {
            item.classList.add('deposit-status--green');
        }
    });
}

if (payoutStatus) {
    payoutStatus.forEach((item) => {
        if (item.innerText === 'Выплачено') {
            item.classList.add('payout-status--green');
        }
    });
}

if (historyStatus) {
    historyStatus.forEach((item) => {
        let itemText = item.innerText.split(" ")[0];
        if (itemText === '+') {
            item.classList.add('history-status--green');
        } else if (itemText === '-') {
            item.classList.add('history-status--red');
        }
    });
}

if (supportsStatus) {
    supportsStatus.forEach((item) => {
        if (item.innerText === 'Открыто') {
            item.classList.add('supports-status--green');
        } else if (item.innerText === 'Закрыто') {
            item.classList.add('supports-status--red');
        }
    });
}

if (cryptoColor) {
    cryptoColor.forEach((item) => {
        if (item.innerText[0] === '-') {
            item.classList.add('supports-status--red');
        }
    });
}


// COPY/////////////////////////////////
let cryptoWallet = document.querySelector('.crypto__content-wallet');
let referralsInput = document.querySelector('.referrals__form-input');

if (cryptoWallet) {
    let cryptoBtn = document.querySelector('.crypto__content-btn');

    cryptoBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(cryptoWallet.innerText);
        cryptoBtn.innerText = 'Кошелек скопирован'
    });
}

if (referralsInput) {
    let referralsBtn = document.querySelector('.referrals__form-btn');

    referralsBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(referralsInput.value);
        referralsBtn.innerText = 'Ссылка скопирована'
    });
}


// SELECT/////////////////////////////////
if (table) {
    let tbody = table.querySelector(".referrals__table-tbody");
    let select = document.querySelector(".referrals__formSort-select");
    let rows = [...tbody.rows];
    let sortDirection = "desc";
    let columnIndex = select.options.selectedIndex;

    function sortTable() {
        rows.sort((a, b) => {

            let aValue = a.cells[columnIndex].textContent;
            let bValue = b.cells[columnIndex].textContent;

            if (columnIndex === 3) {
                aValue = aValue.split(" ")[0];
                bValue = bValue.split(" ")[0];
            } else if (columnIndex === 4 || columnIndex === 5) {
                let dateTimeA = aValue.split(" ")
                let dateTimeB = bValue.split(" ")
                let dateA = dateTimeA[0].split(".")
                let dateB = dateTimeB[0].split(".")

                aValue = Date.parse(`${dateA[2]}-${dateA[1]}-${dateA[0]}T${dateTimeA[1]}`);
                bValue = Date.parse(`${dateB[2]}-${dateB[1]}-${dateB[0]}T${dateTimeB[1]}`);
            }

            if (columnIndex === 1) {                // сортировка по буквам
                aValue = aValue.toUpperCase();
                bValue = bValue.toUpperCase();

                if (sortDirection === "asc") {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return bValue > aValue ? 1 : -1;
                }

            } else {                                // сортировка по цифрам

                if (sortDirection === "asc") {
                    return aValue - bValue;
                } else {
                    return bValue - aValue;
                }

            }
        });

        tbody.remove();
        tbody = document.createElement("tbody");
        rows.forEach((row) => tbody.appendChild(row));
        table.appendChild(tbody);
    }

    sortTable();

    select.addEventListener("change", function (e) {
        columnIndex = e.target.options.selectedIndex;
        sortTable();
    });
}
