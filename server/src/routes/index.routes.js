const router = require("express").Router();
const authRoutes = require("./user.routes");

const formatResponse = require("../utils/formatResponse");

router.use("/auth", authRoutes);

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
