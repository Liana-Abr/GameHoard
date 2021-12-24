const router = require("express").Router();

const productController = require('../controllers/productController.js');

router.post('/product', productController.createProduct);
router.get('/product', productController.getAllProducts);
router.get('/getproduct', productController.getOneProduct);
router.get('/product/:id', productController.getProduct);
router.put('/product', productController.updateProduct);
router.put('/product/skidka', productController.setSkidkaProduct);
router.delete('/product', productController.deleteProduct);

module.exports = router;