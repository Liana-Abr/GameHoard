const router = require("express").Router();

const skladController = require("../../controllers/skladController.js");

router.post("/", skladController.createSklad);
router.get("/", skladController.getAllSklad);
router.get("/:id", skladController.getSklad);
router.post("/update", skladController.updateSklad);
router.post("/nalichie", skladController.updateSkladNalichie);
router.post("/prodano", skladController.updateSkladProdano);
router.post("/delete", skladController.deleteSklad);

module.exports = router;
