const checkForSpecialChar = (string) => {
    let specialChars = "<>!#$%^*()_+[]{}?:;|'\"\\,/~`-=";
    if (string !== undefined) {
        for (let i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return true;
            }
        }
        return false;
    }
    return false;
};

module.exports = checkForSpecialChar;