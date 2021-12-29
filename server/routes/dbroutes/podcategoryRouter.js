const router = require("express").Router()

const podcategoryController = require('../../controllers/podcategoryController.js')

router.post('/', podcategoryController.createPodcategory)
router.get('/', podcategoryController.getAllPodcategory)
router.get('/:id', podcategoryController.getPodcategory)
router.post('/update', podcategoryController.updatePodcategory)
router.delete('/', podcategoryController.deletePodcategory)

module.exports = router