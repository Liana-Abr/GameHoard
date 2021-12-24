const router = require("express").Router()

const productController = require('../../../../project/server/controllers/productController.js')

router.post('/', productController.createProduct)
router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)
router.put('/', productController.updateProduct)
router.put('/skidka', productController.setSkidkaProduct)
router.delete('/', productController.deleteProduct)

module.exports = router