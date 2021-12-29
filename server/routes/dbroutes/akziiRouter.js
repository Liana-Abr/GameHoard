const router = require("express").Router()

const akziiController = require('../../controllers/akziiController.js')

router.post('/', akziiController.createAkzii)
router.get('/', akziiController.getAllAkzii)
router.get('/:id', akziiController.getAkzii)
router.post('/update', akziiController.updateAkzii)
router.delete('/', akziiController.deleteAkzii)

module.exports = router