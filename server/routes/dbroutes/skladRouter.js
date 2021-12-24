const router = require("express").Router()

const skladController = require('../../controllers/skladController.js')

router.post('/', skladController.createSklad)
router.get('/', skladController.getAllSklad)
router.get('/:id', skladController.getSklad)
router.put('/', skladController.updateSklad)
router.put('/nalichie', skladController.updateSkladNalichie)
router.put('/prodano', skladController.updateSkladProdano)
router.delete('/', skladController.deleteSklad)

module.exports = router