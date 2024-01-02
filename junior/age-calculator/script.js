const txtDay = document.getElementById('day');
const txtMonth = document.getElementById('month');
const txtYear = document.getElementById('year');
const btnCalculate = document.getElementById('btnCalculate');

const txtYears = document.getElementById('years-text');
const txtMonths = document.getElementById('months-text');
const txtDays = document.getElementById('days-text');

btnCalculate.addEventListener('click', calculate);

function calculate() {
    let day = parseInt(txtDay.value);
    let month = parseInt(txtMonth.value);
    let year = parseInt(txtYear.value);

    var countDownDate = new Date(year, month - 1, day).getTime();
    var nowDate = new Date().getTime();

    const oneDayMilisseconds = 1000 * 60 * 60 * 24;
    var diffMiliseconds = nowDate - countDownDate;

    const diffDays = Math.floor(diffMiliseconds / oneDayMilisseconds);
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30.44) % 12;
    const days = diffDays - (years * 365) - (Math.floor(months * 30.44));


    txtYears.innerText = years;
    txtMonths.innerText = months;
    txtDays.innerText = days;
}