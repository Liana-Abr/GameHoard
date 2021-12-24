const router = require("express").Router()

const sliderController = require('../../controllers/sliderController.js')

router.post('/', sliderController.createSlider)
router.get('/', sliderController.getAllSlider)
router.get('/:id', sliderController.getSlider)
router.put('/', sliderController.updateSlider)
router.delete('/', sliderController.deleteSlider)

module.exports = router