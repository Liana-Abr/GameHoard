const router = require("express").Router();

const profileController = require("../../controllers/profileController.js");

router.post("/", profileController.createProfile);
router.get("/", profileController.getAllProfile);
router.get("/:id", profileController.getProfile);
router.post("/update", profileController.updateProfile);
router.post("/delete", profileController.deleteProfile);

module.exports = router;
