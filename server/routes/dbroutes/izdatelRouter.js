const router = require("express").Router()

const izdatelController = require('../../controllers/izdatelController.js')

router.post('/', izdatelController.createIzdatel)
router.get('/', izdatelController.getAllIzdatel)
router.get('/:id', izdatelController.getIzdatel)
router.post('/update', izdatelController.updateIzdatel)
router.delete('/', izdatelController.deleteIzdatel)

module.exports = router