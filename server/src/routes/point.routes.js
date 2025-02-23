const router = require("express").Router();
// const RouteController = require("../controllers/Route.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router
        .get("/:routeId", getPointsByRoute)
        .post("/", createPoint)
        .put("/:id", updatePoint)
        .delete("/:id", deletePoint)

module.exports = router;
