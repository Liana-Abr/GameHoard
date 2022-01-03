const router = require("express").Router();

const rassylkaController = require("../../controllers/rassylkaController.js");

router.post("/", rassylkaController.createRassylka);
router.get("/", rassylkaController.getAllRassylka);
router.get("/:id", rassylkaController.getRassylka);
router.post("/update", rassylkaController.updateRassylka);
router.post("/delete", rassylkaController.deleteRassylka);

module.exports = router;
