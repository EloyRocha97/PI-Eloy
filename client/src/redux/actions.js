import axios from "axios";

var urlrecipes = "http://localhost:3001/recipes";
var urldiets = "http://localhost:3001/diets";
var addurl = "http://localhost:3001/addrecipes";

export const GET_RECIPES = "GET_RECIPES";
export function getRecipes() {
	return async function (dispatch) {
		return await axios.get(urlrecipes).then((res) => {
			dispatch({ type: GET_RECIPES, payload: res.data });
		});
	};
}

export const GET_DIETS = "GET_DIETS";
export function getDiets() {
	return async function (dispatch) {
		let json = await axios.get(urldiets);
		return dispatch({ type: GET_DIETS, payload: json.data });
	};
}

export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export function searchByName(name) {
	return async function (dispatch) {
		try {
			let json = await axios.get(
				"http://localhost:3001/recipes?name=" + name
			); //pegale a la ruta que me viene por query desde el back y pasale lo q me llega por payload
			return dispatch({
				type: "SEARCH_BY_NAME",
				payload: json.data, // lo que devuelve la ruta una vez le asigne algo por name
			});
		} catch (error) {
			console.log("No se pudo encontrar la receta");
		}
	};
}

export const POST_RECIPE = "POST_RECIPE";
export function postRecipe(payload) {
	const request = {
		url: addurl,
		method: "POST",
		data: payload,
	};
	return function (dispatch) {
		return axios(request).then((response) => {
			dispatch({ type: POST_RECIPE, payload: response.data });
		});
	};
}

export const ORDER_BY_NAME = "ORDER_BY_NAME";
export function orderByName(payload) {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
}

export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export function orderByScore(payload) {
	return {
		type: ORDER_BY_SCORE,
		payload,
	};
}

export const RECIPE_DETAIL = "RECIPE_DETAIL";
export function recipeDetail(id) {
	return async function (dispatch) {
		let json = await axios.get("http://localhost:3001/recipes/" + id);
		return dispatch({ type: RECIPE_DETAIL, payload: json.data });
	};
}

export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export function filterByDiets(payload) {
	return {
		type: FILTER_BY_DIETS,
		payload,
	};
}

export const CHANGE_STATE_ADD = "CHANGE_STATE_ADD";
export function changeStateAdd(estado) {
	return {
		type: CHANGE_STATE_ADD,
		payload: estado,
	};
}
