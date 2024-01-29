const menuBtn = document.getElementById('menuBtn');
const menuOver = document.getElementById("menuOver");
const container = document.getElementById("container");
const btnClose = document.getElementById('btnClose');

function showHideMenu() {
    container.classList.toggle('opacity');
    container.classList.toggle('no-opacity');

    menuOver.classList.toggle('hidden');
    menuOver.classList.toggle('visible');
}

menuBtn.addEventListener('click', () => {
    showHideMenu();
});

btnClose.addEventListener('click', () => {
    showHideMenu();
})