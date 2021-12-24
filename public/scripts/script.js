const price = document.querySelector('input[name="max_price_product"]');
const output = document.querySelector('.price-output');

output.textContent = price.value;

window.onload = (evt) => {
    output.textContent = `до ${price.value} ₽`;
};

price.addEventListener('input', function (evt) {
    output.textContent = `до ${price.value} ₽`;
});
