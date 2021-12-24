const router = require("express").Router()

const sposob_oplatyController = require('../../controllers/sposob_oplatyController.js')

router.post('/', sposob_oplatyController.createSposob_Oplaty)
router.get('/', sposob_oplatyController.getAllSposob_Oplaty)
router.get('/:id', sposob_oplatyController.getSposob_Oplaty)
router.put('/', sposob_oplatyController.updateSposob_Oplaty)
router.delete('/', sposob_oplatyController.deleteSposob_Oplaty)

module.exports = router