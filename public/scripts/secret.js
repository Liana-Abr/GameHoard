let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};

let konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
let konamiCodePosition = 0;

document.addEventListener('keydown', function (e) {
    let key = allowedKeys[e.keyCode];
    let requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
            activateCheats();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateCheats() {
    document.querySelector('.dragon').style = `
        transition: 5s all ease-in-out;
        left: 100%
    `;
    function sound() {
        let audio = new Audio('../sounds/secret.wav');
        audio.play();
    }
    function clearSecret() {
        document.querySelector('.dragon').style = `
        transition: none;
        left: -3000px
    `;
    }
    setTimeout(sound, 2500);
    setTimeout(clearSecret, 6000);


    alert("Вы разбудили деда");
}