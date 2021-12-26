const price = document.querySelector('input[name="max_price_product"]');
const submit = document.querySelector('.filters__submit input[name="submit"]');
const output = document.querySelector('.price-output');

// const catalogue__products = document.querySelector('.catalogue__products');
// const radios__time = document.querySelectorAll('.filters__time input[type="radio"]');
// const radios__people = document.querySelectorAll('.filters__people input[type="radio"]');
// const radios__age = document.querySelectorAll('.filters__age input[type="radio"]');
// radios__time.forEach(el1 => {
//     el1.addEventListener('click', (evt) => {
//         radios__time.forEach(el2 => {
//             el2.classList.remove('active__inp1');
//         });
//         el1.classList.add('active__inp1');
//     });
// });
// radios__people.forEach(el1 => {
//     el1.addEventListener('click', (evt) => {
//         radios__people.forEach(el2 => {
//             el2.classList.remove('active__inp2');
//         });
//         el1.classList.add('active__inp2');
//     });
// });
// radios__age.forEach(el1 => {
//     el1.addEventListener('click', (evt) => {
//         radios__age.forEach(el2 => {
//             el2.classList.remove('active__inp3');
//         });
//         el1.classList.add('active__inp3');
//     });
// });

const btn = document.querySelector('.header__btn');
const card__main__container = document.querySelector('.card__main__Container');
const basket = document.querySelector('.basket__container');
const Action = document.querySelector('.Action');
const amount = document.querySelector('.total-amount');
const itemm = document.querySelector('.itemm');

function counterYes() {
    let count = document.querySelectorAll('.Cart-Itemm').length;
    if (count == 1) {
        itemm.innerHTML = `1 товар`;
    } else if (count >= 2 && count < 5) {
        itemm.innerHTML = `${count} товара`;
    } else if (count >= 5 && count < 21) {
        itemm.innerHTML = `${count} товаров`;
    }
    let counter = 0
    amount.innerHTML = counter;
    document.querySelectorAll('.amount__price').forEach(el => {
        counter += +el.innerHTML;
    });
    amount.innerHTML = `${counter}₽`;
}

btn.addEventListener('click', (evt) => {
    basket.classList.add('basket__active');
    console.log(document.cookie);
    if (document.cookie) {
        while (card__main__container.firstChild) {
            card__main__container.firstChild.remove();
        }
        let arr = document.cookie.split(',');
        arr.forEach(async (id) => {
            let res = await fetch('/api/product/' + id);
            let commit = await res.json();
            let div = document.createElement('div');
            div.classList.add('Cart-Itemm');
            div.innerHTML = `
            <div class="first__container">
                <div class="image-box">
                    <img src="/images/${commit.image_product}" height="120px">
                </div>
                <div class="about">
                    <h1 class="title"> ${commit.name_product} </h1>
                    <h3 class="subtitle"> ${commit.name_product} </h3>
                </div> 
            </div>
            <div class="second__container">
                <div class="counter">
                    <div class="btn"> + </div>
                    <div class="count"> 1 </div>
                    <div class="btn"> - </div>
                </div>
                <div class="prices">
                    <div class="amount"> <span class="amount__price">${commit.price_product}</span>₽ </div>
                    <div class="remove">Удалить</div>
                </div>
            </div>
            `;
            card__main__container.appendChild(div);
            counterYes();
        });
    }
});
Action.onclick = (evt) => {
    basket.classList.remove('basket__active');
};

const btn2 = document.querySelector('.inp__forms button[type="submit"]');




output.textContent = price.value;

window.onload = (evt) => {
    output.textContent = `до ${price.value} ₽`;
};

price.addEventListener('input', function (evt) {
    output.textContent = `до ${price.value} ₽`;
});

function addProductToCart(id) {
    console.log(1);
    console.log(document.cookie);
    if (document.cookie.length > 0) {
        console.log(3);
        document.cookie += `,${id}; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
        return alert('Товар успешно добавлен в корзину');
    }
    console.log(2);
    document.cookie = `${id}; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
    return alert('Товар успешно добавлен в корзину');
}