const { Router } = require("express");
const diet = Router();
const { Diet } = require("../db");
const { diets } = require("./diets");
const { getAllRecipes } = require("./funtions");

const getDiets = async (req, res) => {
	try {
		let allDiets = await Diet.findAll();
		res.status(200).json(allDiets);
	} catch (error) {}
};

const loadingDiets = async () => {
	try {
		const allRecipes = await getAllRecipes();
		allRecipes.map((e) => {
			// console.log(e.diets)
			e.diet.map(async (d) => {
				await Diet.findOrCreate({ where: { name: d } });
			});
		});
		diets.forEach((e) => {
			Diet.findOrCreate({
				where: { name: e.name, id: e.id },
			});
		});
	} catch (error) {
		console.log("malio sal");
	}
};

module.exports = { loadingDiets, getDiets };
