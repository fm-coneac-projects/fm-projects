const btnThemeSwitch = document.getElementById('btn-theme')

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