const router = require("express").Router()

const profileController = require('../../controllers/profileController.js')

router.post('/', profileController.createProfile)
router.get('/', profileController.getAllProfile)
router.get('/:id', profileController.getProfile)
router.put('/', profileController.updateProfile)
router.delete('/', profileController.deleteProfile)

module.exports = router