const search = document.querySelector('.search-input');
const output1 = document.querySelector('.search-output');
search.addEventListener('input', async (evt) => {
    let res = await fetch('/api/product/getproduct', {
        method: 'GET',
        headers: {
            value: search.value
        }
    });
    let commits = await res.json();
    while (output1.firstChild) {
        output1.firstChild.remove();
        output1.style.display = 'none';
    }
    commits.forEach(el => {
        output1.style.display = 'flex';
        let a = document.createElement('a');
        a.href = `/catalogue/product/${el.id_product}`;
        a.innerHTML = `${el.name_product}`;
        output1.append(a);
    });
    if (search.value == '') {
        while (output1.firstChild) {
            output1.firstChild.remove();
        }
        output1.style.display = 'none';
    }
});
