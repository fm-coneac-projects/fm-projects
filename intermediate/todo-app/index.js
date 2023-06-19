const btnThemeSwitch = document.getElementById('btn-theme')
const btnFilterAll = document.getElementById("btnFilterAll");
const btnFilterActive = document.getElementById("btnFilterActive");
const btnFilterCompleted = document.getElementById("btnFilterCompleted");

const filters = {
    All: 0,
    Active: 1,
    Completed: 2
}

btnThemeSwitch.addEventListener('click', switchTheme);

const storeTheme = function (theme) {
    localStorage.setItem('theme', theme);
}

function switchTheme() {
    console.log('switch theme')
    if (btnThemeSwitch.classList.contains('img-theme-light')) {
        console.log('is light')
        btnThemeSwitch.classList.toggle('img-theme-light');
        // btnThemeSwitch.classList.add('img-theme-dark');
    }

    if (btnThemeSwitch.classList.contains('img-theme-dark')) {
        console.log('is dark')
        btnThemeSwitch.classList.toggle('img-theme-dark');
        // btnThemeSwitch.classList.add('img-theme-light');
    }
}

btnFilterAll.addEventListener('click', filter(filters.All));
btnFilterAll.addEventListener('click', filter(filters.Active));
btnFilterAll.addEventListener('click', filter(filters.Completed));

function filter(type) {
    switch (type) {
        case filters.All:
            btnFilterAll.classList.toggle("active");
            btnFilterActive.classList.toggle("active");
            btnFilterCompleted.classList.toggle("active");
            break;
        case filters.Active:
            break;
        case filters.Completed:
            break;
        default:
    }
}