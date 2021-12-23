const price = document.querySelector('input[name="price"]');
const output = document.querySelector('.price-output');

output.textContent = price.value;

window.onload = (evt) => {
    output.textContent = `от ${price.value} ₽`;
};

price.addEventListener('input', function (evt) {
    output.textContent = `от ${price.value} ₽`;
});
