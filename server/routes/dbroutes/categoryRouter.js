const router = require("express").Router()

const categoryController = require('../../controllers/categoryController.js')

router.post('/', categoryController.createCategory)
router.get('/', categoryController.getAllCategory)
router.get('/:id', categoryController.getCategory)
router.put('/', categoryController.updateCategory)
router.delete('/', categoryController.deleteCategory)

module.exports = router