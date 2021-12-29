const router = require("express").Router();

const productController = require('../../controllers/productController.js');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/getproduct', productController.getOneProduct);
router.get('/:id', productController.getProduct);
router.post('/update', productController.updateProduct)
router.put('/skidka', productController.setSkidkaProduct)
router.delete('/', productController.deleteProduct)

module.exports = router;