const router = require("express").Router();
const FavoriteController = require("../controllers/Favorite.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router
  .get("/", verifyAccessToken, FavoriteController.getAllFavorites)
  .get("/:route_id", verifyAccessToken, FavoriteController.getOneRouteFavorite) // покажет карточки, кото мы добавим в избранное
  .post("/", verifyAccessToken, FavoriteController.createFavorite)
  .delete("/:route_id", verifyAccessToken, FavoriteController.deleteFavorite);

module.exports = router;
