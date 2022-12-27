const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerRecipes = require("./routerRecipes");
const routerDiets = require("./routerDiets");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", routerRecipes);
router.use("/", routerDiets);

module.exports = router;
