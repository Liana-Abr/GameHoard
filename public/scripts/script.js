const price = document.querySelector('input[name="max_price_product"]');
const output = document.querySelector(".price-output");
const btn = document.querySelector(".header__btn");
const card__main__container = document.querySelector(".card__main__Container");
const basket = document.querySelector(".basket__container");
const Action = document.querySelector(".Action");
const amount = document.querySelector(".total-amount");
const itemm = document.querySelector(".itemm");

function cartSum() {
    let sum = 0;
    document.querySelectorAll(".count").forEach((el) => {
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
}

function counterYes(id) {
    let counter = 0;
    amount.innerHTML = counter;
    document.querySelectorAll(".amount__price").forEach((el) => {
        if (id && el.classList[1] == id[0] && +id > 1) {
            counter += +el.innerHTML * +id[1];
        }
        counter += +el.innerHTML;
    });
    amount.innerHTML = `${counter}₽`;
}

function CreateCardInCart(commit, id) {
    let div = document.createElement("div");
    div.classList.add("Cart-Itemm");
    let price = +commit.price_product * +id[1];
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
            <div class="count"> ${id[1]} </div>
        </div>
        <div class="prices">
            <div class="amount"> <span class="amount__price ${id[0]}">${price}</span>₽ </div>
            <div class="remove" onclick=removeProductFromCart(${commit.id_product})>Удалить</div>
        </div>
    </div>
    `;
    return div;
}

btn.addEventListener("click", async (evt) => {
    basket.classList.add("basket__active");
    while (card__main__container.firstChild) {
        card__main__container.firstChild.remove();
    }
    counterYes();
    if (document.cookie) {
        let arr = document.cookie.split("; ");
        arr.forEach(async (id) => {
            id = id.split("=");
            if (!isNaN(+id[0])) {
                await fetch("/api/product/" + id[0])
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        card__main__container.appendChild(
                            CreateCardInCart(data, id)
                        );
                        counterYes(id);
                        cartSum();
                    });
            }
        });
    }
    const buttonClean = document.querySelector(".clean");
    buttonClean.addEventListener("click", (evt) => {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/"
                );
        });
        while (card__main__container.firstChild) {
            card__main__container.firstChild.remove();
        }
        counterYes();
    });
});
Action.onclick = (evt) => {
    basket.classList.remove("basket__active");
};
const btn2 = document.querySelector('.inp__forms button[type="submit"]');

window.onload = (evt) => {
    output.textContent = `до ${price.value} ₽`;
};
price.addEventListener("input", function (evt) {
    output.textContent = `до ${price.value} ₽`;
});

function getCookieValue(name) {
    let result = document.cookie.match(
        "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return result ? result[0] : "";
}

function removeProductFromCart(id) {
    if (getCookieValue(id)) {
        let arr = getCookieValue(id).split("=");
        document.cookie = `${arr[0]}=; SameSite=Lax; Secure; path=/; Max-Age=0;`;
        basket.classList.remove("basket__active");
        return alert("Товар успешно удалён");
    }
}

function addProductToCart(id) {
    if (getCookieValue(id)) {
        let arr = getCookieValue(id).split("=");
        arr[1] = +arr[1] + 1;
        document.cookie = `${arr[0]}=${arr[1]}; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
        return alert("Товар успешно добавлен в корзину");
    }

    if (document.cookie.length > 0) {
        document.cookie = `${id}=1; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
        return alert("Товар успешно добавлен в корзину");
    }

    document.cookie = `${id}=1; SameSite=Lax; Secure; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
    return alert("Товар успешно добавлен в корзину");
}
