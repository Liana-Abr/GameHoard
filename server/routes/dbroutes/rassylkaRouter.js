const router = require("express").Router()

const rassylkaController = require('../../controllers/rassylkaController.js')

router.post('/', rassylkaController.createRassylka)
router.get('/', rassylkaController.getAllRassylka)
router.get('/:id', rassylkaController.getRassylka)
router.put('/', rassylkaController.updateRassylka)
router.delete('/', rassylkaController.deleteRassylka)

module.exports = router