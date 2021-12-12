const catalogue = document.querySelector('a[href="/catalogue"]');
const popup = document.querySelector('.popup');
const popup__tabs = document.querySelectorAll('.popup__tab');
const popup__container = document.querySelector('.popup__container');

const catalogue__tabs = [
    {
        tabs: [
            { name: "Warhammer 40000", url: "/catalogue/:warhammer?p=w40k" },
            { name: "Warhammer Age of Sigmar", url: "/catalogue/:warhammer?p=waof" },
            { name: "Коробочные Игры", url: "/catalogue/:warhammer?p=bg" },
            { name: "Краски Citadel Colour", url: "/catalogue/:warhammer?p=ccc" }
        ]
    }, {
        tabs: [
            { name: "MTG", url: "/catalogue/:ccg?p=mtg" },
            { name: "Gwent", url: "/catalogue/:ccg?p=gwent" },
            { name: "Берсерк. Герои", url: "/catalogue/:ccg?p=berserk" },
            { name: "Star Wars: Destiny", url: "/catalogue/:ccg?p=swd" }
        ]
    }, {
        tabs: [
            { name: "Dungeons&Dragons", url: "/catalogue/:rpgames?p=dnd" },
            { name: "Pathfinder", url: "/catalogue/:rpgames?p=pf" },
            { name: "Кориолис", url: "/catalogue/:rpgames?p=kor" },
            { name: "Game of Thrones", url: "/catalogue/:rpgames?p=got" }
        ]
    }, {
        tabs: [
            { name: "Пазлы", url: "/catalogue/:puzzles?p=puzzles" },
            { name: "Головоломки", url: "/catalogue/:puzzles?p=brainteaser" }
        ]
    }, {
        tabs: [
            { name: "Техника", url: "/catalogue/:models?p=tech" },
            { name: "Авиация", url: "/catalogue/:models?p=aviation" },
            { name: "Автомобили", url: "/catalogue/:models?p=cars" }
        ]
    }
];

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

for (let i = 0; i < popup__tabs.length; i++) {
    popup__tabs[i].addEventListener('mouseover', (evt) => {
        popup__container.innerHTML = '';
        catalogue__tabs[i]['tabs'].forEach(el => {
            popup__container.innerHTML += `<a href="${el.url}">${el.name}</a>`;
        });
    });
}
