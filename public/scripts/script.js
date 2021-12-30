const price = document.querySelector('input[name="max_price_product"]');
const submit = document.querySelector('.filters__submit input[name="submit"]');
const output = document.querySelector('.price-output');

const btn = document.querySelector('.header__btn');
const card__main__container = document.querySelector('.card__main__Container');
const basket = document.querySelector('.basket__container');
const Action = document.querySelector('.Action');
const amount = document.querySelector('.total-amount');
const itemm = document.querySelector('.itemm');

function counterYes(id) {
    let count = document.querySelectorAll('.count');
    let sum = 0;
    count.forEach(el => {
        sum += +el.innerHTML;
    });
    if (sum == 1) {
        itemm.innerHTML = `1 товар`;
    } else if (sum >= 2 && sum < 5) {
        itemm.innerHTML = `${sum} товара`;
    } else if (sum >= 5 && sum < 21) {
        itemm.innerHTML = `${sum} товаров`;
    } else {
        itemm.innerHTML = `0 товаров`;
    }
    let counter = 0;
    amount.innerHTML = counter;
    document.querySelectorAll('.amount__price').forEach(el => {
        if (id && el.classList[1] == id[0] && +id > 1) {
            counter += +el.innerHTML * +id[1];
        }
        counter += +el.innerHTML;
    });
    amount.innerHTML = `${counter}₽`;
}

function CreateCardInCart(commit, id, i) {
    let div = document.createElement('div');
    div.classList.add('Cart-Itemm');
    let xy = +commit.price_product * +getCookieValue(id[0])[2 + i];
    console.log(xy);
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
            <div class="btn"> Кол-во: </div>
            <div class="count"> ${getCookieValue(id[0])[2 + i]} </div>
        </div>
        <div class="prices">
            <div class="amount"> <span class="amount__price ${id[0 + i]}">${xy}</span>₽ </div>
            <div class="remove" onclick=removeProductFromCart(${commit.id_product})>Удалить</div>
        </div>
    </div>
    `;
    return div;
}

btn.addEventListener('click', (evt) => {
    basket.classList.add('basket__active');
    while (card__main__container.firstChild) {
        card__main__container.firstChild.remove();
    }
    counterYes();
    if (document.cookie) {
        let arr = document.cookie.split('; ');
        let i = 0;
        arr.forEach(async (id) => {
            id = id.split('=');
            if (!isNaN(+id[0])) {
                fetch('/api/product/' + id[0]).then((res) => {
                    return res.json();
                }).then((data) => {
                    card__main__container.appendChild(CreateCardInCart(data, id, i));
                    i += 1;
                    counterYes(id);
                });
            }
        });
    }
    const buttonClean = document.querySelector('.clean');
    buttonClean.addEventListener('click', (evt) => {
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        while (card__main__container.firstChild) {
            card__main__container.firstChild.remove();
        }
        counterYes();
    });
});
Action.onclick = (evt) => {
    basket.classList.remove('basket__active');
};
const btn2 = document.querySelector('.inp__forms button[type="submit"]');



window.onload = (evt) => {
    output.textContent = `до ${price.value} ₽`;
};
price.addEventListener('input', function (evt) {
    output.textContent = `до ${price.value} ₽`;
});

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)");
    return result ? result[0] : "";
}

function removeProductFromCart(id) {
    if (getCookieValue(id)) {
        let arr = getCookieValue(id).split('=');
        document.cookie = `${arr[0]}=; SameSite=Lax; Secure; path=/; Max-Age=0;`;
        basket.classList.remove('basket__active');
        return alert('Товар успешно удалён');
    }
}

function addProductToCart(id) {

    if (getCookieValue(id)) {
        let arr = getCookieValue(id).split('=');
        arr[1] = +arr[1] + 1;
        document.cookie = `${arr[0]}=${arr[1]}; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
        return alert('Товар успешно добавлен в корзину');
    }

    if (document.cookie.length > 0) {
        console.log(3);
        document.cookie = `${id}=1; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
        return alert('Товар успешно добавлен в корзину');
    }

    document.cookie = `${id}=1; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
    return alert('Товар успешно добавлен в корзину');
}