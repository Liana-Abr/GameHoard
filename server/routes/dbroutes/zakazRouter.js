const router = require("express").Router()

const zakazController = require('../../controllers/zakazController.js')

router.post('/', zakazController.createZakaz)
router.get('/', zakazController.getAllZakaz)
router.get('/:id', zakazController.getZakaz)
router.put('/', zakazController.updateZakaz)
router.delete('/', zakazController.deleteZakaz)

module.exports = router