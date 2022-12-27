const { Router } = require("express");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { getAllRecipes } = require("./funtions");
const { v4: uuidv4 } = require("uuid");

const getRecipes = async (req, res) => {
	const { name } = req.query;
	try {
		const allRecipes = await getAllRecipes();
		console.log("Estoy en allRecipes");
		if (name) {
			const byName = allRecipes.filter((e) =>
				e.name.toLowerCase().includes(name.toLocaleLowerCase())
			);
			byName.length
				? res.status(200).send(byName)
				: res.status(404).send("No hay recetas con ese nombre");
		} else {
			res.status(200).send(allRecipes);
		}
	} catch (error) {
		res.status(400).send("esta mal");
	}
};

const getRecipesById = async (req, res, next) => {
	const { id } = req.params;
	const allRecipes = await getAllRecipes();
	let validate = id.includes("-"); // si tiene el guion es porque se encuentra en la base de datos

	if (validate) {
		try {
			let dbId = await Recipe.findByPk(id, { include: TypeDiet }); // entonces la busco directo de la base de datos
			res.status(200).json([dbId]);
		} catch (err) {
			console.log(err);
		}
	} else {
		try {
			if (id) {
				let recipeId = allRecipes.filter(
					(el) => el.id === parseInt(id)
				);
				// console.log(recipeId);
				recipeId.length
					? res.status(200).json(recipeId[0])
					: res.status(400).send("Not fuound");
			}
		} catch (err) {
			res.json({ message: err });
		}
	}
};

const addRecipes = async (req, res) => {
	try {
		const { name, summary, healthScore, img, dietTypes } = req.body;
		const allRecipes = await getAllRecipes();
		const recipesResults = allRecipes.filter((e) => {
			e.name.toLowerCase().includes(name.toLocaleLowerCase());
		});
		if (recipesResults.length) {
			return res.status(404).json("Esta receta existe");
		}
		var temp = await Diet.findAll({
			where: { id: { [Op.or]: dietTypes } },
			attributes: ["name"],
		});

		var diet = [];
		temp.map((e) => {
			diet.push(e.name);
		});
		let id = uuidv4();
		var createdInDb = true;
		const newRecipe = await Recipe.create({
			createdInDb,
			id,
			name,
			img,
			diet,
			summary,
			healthScore,
		});
		await newRecipe.addDiet(dietTypes);
		let recipeDb = await Recipe.findAll({
			where: { id: id },
			include: { model: Diet },
		});
		res.status(200).send("Creado correctamente");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = { getRecipes, addRecipes, getRecipesById };
