var { Router } = require("express");
var router = Router();

const {
	getRecipes,
    addRecipes,
    getRecipesById
} = require("../Controllers/ControllRecipes");

router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipesById);
router.post("/addrecipes", addRecipes);
module.exports = router