const catalogue = document.querySelector('a[href="/catalogue"]');
const popup = document.querySelector('.popup');

catalogue.addEventListener('click', (evt) => {
    evt.preventDefault();
    catalogue.classList.toggle('active');
    if (catalogue.classList.contains('active')) {
        popup.style = `
        visibility: visible;
        opacity: 1;
        top: 50px;  
        `;
        // top: ${catalogue.offsetHeight}px;                   
        // left: ${catalogue.offsetLeft}px;
    } else if (!catalogue.classList.contains('active')) {
        popup.style = `
        visibility: hidden;
        opacity: 0;
        top: 30px; 
        `;
    }
});