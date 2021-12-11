const catalogue = document.querySelector('a[href="/catalogue"]');
const catalogue_popup = document.querySelector('.catalogue__popup');

catalogue.addEventListener('click', (evt) => {
    evt.preventDefault();
    catalogue.classList.toggle('active');
    if (catalogue.classList.contains('active')) {
        catalogue_popup.style = `
        visibility: visible;
        opacity: 1;
        top: ${catalogue.offsetHeight}px;                   
        left: ${catalogue.offsetLeft}px;`;
    } else if (!catalogue.classList.contains('active')) {
        catalogue_popup.style = `
        visibility: hidden;
        opacity: 0;`;
    }
});