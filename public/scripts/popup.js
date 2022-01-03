const container = document.querySelector(".container");
const popup = document.querySelector(".popup__content");
const popup__tabs = document.querySelectorAll(".popup__tab");
const popup__container = document.querySelector(".popup__container");

const catalogue__tabs = [
    {
        tabs: [
            {
                name: "Warhammer 40000",
                url: "/catalogue/warhammer?podcat=w40k",
            },
            {
                name: "Warhammer Age of Sigmar",
                url: "/catalogue/warhammer?podcat=waof",
            },
            { name: "Коробочные Игры", url: "/catalogue/warhammer?podcat=bg" },
            {
                name: "Краски Citadel Colour",
                url: "/catalogue/warhammer?podcat=ccc",
            },
        ],
    },
    {
        tabs: [
            { name: "MTG", url: "/catalogue/ccg?podcat=mtg" },
            { name: "Gwent", url: "/catalogue/ccg?podcat=gwent" },
            { name: "Берсерк. Герои", url: "/catalogue/ccg?podcat=berserk" },
            { name: "Star Wars: Destiny", url: "/catalogue/ccg?podcat=swd" },
        ],
    },
    {
        tabs: [
            { name: "Dungeons&Dragons", url: "/catalogue/rpgames?podcat=dnd" },
            { name: "Pathfinder", url: "/catalogue/rpgames?podcat=pf" },
            { name: "Кориолис", url: "/catalogue/rpgames?podcat=kor" },
            { name: "Game of Thrones", url: "/catalogue/rpgames?podcat=got" },
        ],
    },
    {
        tabs: [
            { name: "Пазлы", url: "/catalogue/puzzles?podcat=puzzles" },
            {
                name: "Головоломки",
                url: "/catalogue/puzzles?podcat=brainteaser",
            },
        ],
    },
    {
        tabs: [
            { name: "Техника", url: "/catalogue/models?podcat=tech" },
            { name: "Авиация", url: "/catalogue/models?podcat=aviation" },
            { name: "Автомобили", url: "/catalogue/models?podcat=cars" },
        ],
    },
];

for (let i = 0; i < popup__tabs.length; i++) {
    popup__tabs[i].addEventListener("mouseenter", (evt) => {
        popup__container.style.visibility = "visible";
        popup__container.innerHTML = "";
        catalogue__tabs[i]["tabs"].forEach((el) => {
            popup__container.innerHTML += `<a href="${el.url}">${el.name}</a>`;
        });
    });
    popup__container.addEventListener("mouseleave", (evt) => {
        popup__container.style.visibility = "hidden";
    });
    popup.addEventListener("mouseleave", (evt) => {
        popup__container.style.visibility = "hidden";
    });
}
