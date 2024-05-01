const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController.js");

router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.delete("/:id", deviceController.delete);
router.delete("/type/:typeId", deviceController.deleteByType);

module.exports = router;
