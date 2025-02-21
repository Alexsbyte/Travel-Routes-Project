const router = require("express").Router();
const RouteController = require("../controllers/Route.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router

  .get("/", RouteController.getAll)
  .post("/", verifyAccessToken,  RouteController.create)
  .put("/:id",verifyAccessToken,   RouteController.update)
  .delete("/:id",verifyAccessToken,  RouteController.delete);

module.exports = router;
