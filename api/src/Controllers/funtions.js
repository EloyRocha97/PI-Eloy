require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { URL } = process.env;

const getApi = async () => {
	const apiUrl = await axios.get(URL);
	const apiInfo = await apiUrl.data.results.map((e) => {
		return {
			id: e.id,
			name: e.title,
			img: e.image,
			diet: e.diets,
			summary: e.summary, // un resumen del plato
			healthScore: e.healthScore, // que tan saludable es
			createdInDb: false,
		};
	});
	return apiInfo;
};

const getDbInfo = async () => {
	return await Recipe.findAll({
		include: {
			model: Diet,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});
};

const getAllRecipes = async () => {
	const apiInfo = await getApi();
	const dbInfo = await getDbInfo();
	const allRecipes = [...apiInfo, ...dbInfo];
	return allRecipes;
};

module.exports = {
	getApi,
	getAllRecipes,
	getDbInfo,
};
