const router = require("express").Router();

const categoryController = require("../../controllers/categoryController.js");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategory);
router.post("/update", categoryController.updateCategory);
router.post("/delete", categoryController.deleteCategory);

module.exports = router;
