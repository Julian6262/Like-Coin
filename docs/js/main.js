// CALCULATOR
const multiplier = 0.0000121832359;
const multiplierDay = 86400;

if (document.querySelector('.calculator')) {
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
if (document.querySelector('.speedup')) {
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

if (menu) {
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
}


// ACCORDEON/////////////////////////////////
if (document.querySelector('.questions')) {

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


// TABLE-STATUS/////////////////////////////////
const payoutStatus = document.querySelectorAll('.payout-status');
const depositStatus = document.querySelectorAll('.deposit-status');
const historyStatus = document.querySelectorAll('.history-status');
const supportsStatus = document.querySelectorAll('.supports-status');

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


// COPY/////////////////////////////////
const cryptoWallet = document.querySelector('.crypto__content-wallet');
const cryptoBtn = document.querySelector('.crypto__content-btn');
const referralsInput = document.querySelector('.referrals__form-input');
const referralsBtn = document.querySelector('.referrals__form-btn');

if (cryptoWallet) {
    cryptoBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(cryptoWallet.innerText);
        cryptoBtn.innerText = 'Кошелек скопирован'
    });
}

if (referralsInput) {
    referralsBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(referralsInput.value);
        referralsBtn.innerText = 'Ссылка скопирована'
    });
}


// SELECT/////////////////////////////////
const table = document.querySelector(".referrals__table-contentSort");

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
