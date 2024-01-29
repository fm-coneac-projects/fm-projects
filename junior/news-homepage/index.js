const menuBtn = document.getElementById('menuBtn');
const menuOver = document.getElementById("menuOver");
const container = document.getElementById("container");
menuBtn.addEventListener('click', () => {

    // menuBtn.classList.toggle('open');
    // menuBtn.classList.toggle('closed');

    container.classList.toggle('opacity');
    container.classList.toggle('no-opacity');

    menuOver.classList.toggle('hidden');
    menuOver.classList.toggle('visible');
});