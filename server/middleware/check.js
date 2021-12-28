module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    if (req.query) {
        const { sale, newTovar, vremya_igry_product, name_product, izdatel_id, category_id, podcategory_id, min_igrok_product, vozrast_ogranich_product, min_price_product, max_price_product, min_vremya_igry_product, max_vremya_igry_product } = req.query;
        const arr = [];
        let a = '';
        if (name_product) {
            arr.push(`name_product = ${name_product}`);
        }
        if (izdatel_id) {
            arr.push(`izdatel_id = ${izdatel_id}`);
        }
        if (category_id) {
            arr.push(`category_id = ${category_id}`);
        }
        if (podcategory_id) {
            arr.push(`podcategory_id = ${podcategory_id}`);
        }
        if (min_igrok_product) {
            arr.push(`min_igrok_product = ${min_igrok_product}`);
        }
        if (vozrast_ogranich_product) {
            arr.push(`vozrast_ogranich_product = ${vozrast_ogranich_product}`);
        }
        if (min_price_product) {
            arr.push(`price_product > ${min_price_product}`);
        }
        if (max_price_product > 0) {
            arr.push(`price_product < ${max_price_product}`);
        }
        if (min_vremya_igry_product) {
            arr.push(`vremya_igry_product > ${min_vremya_igry_product}`);
        }
        if (max_vremya_igry_product) {
            arr.push(`vremya_igry_product < ${max_vremya_igry_product}`);
        }
        if (vremya_igry_product) {
            arr.push(`vremya_igry_product = ${vremya_igry_product}`);
        }
        if (newTovar == 'on') {
            arr.push(`date_vypusk_product < ${Date.now()} and date_vypusk_product > ${+Date.now() - 5}`);
        }
        if (sale == 'on') {
            arr.push(`skidka_product > 0`);
        }
        if (arr.length > 0) {
            a = `where ${arr.join(' and ')}`;
        }
        req.headers.check = a;
        next();
    }
};