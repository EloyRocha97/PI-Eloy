var { Router } = require("express");
var router = Router();

const {
	getDiets
} = require("../Controllers/ControllDiet");

router.get("/diets", getDiets);

module.exports = router;