import {
	GET_RECIPES,
	GET_DIETS,
	FILTER_BY_DIETS,
	ORDER_BY_NAME,
	SEARCH_BY_NAME,
	ORDER_BY_SCORE,
	RECIPE_DETAIL,
	POST_RECIPE,
	CHANGE_STATE_ADD,
} from "./actions";

const initialState = {
	recipes: [],
	filterRecipes: [], // copia
	diets: [],
	detail: "",
	response: "Initial", //respuesta para receta por post "ok"
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case POST_RECIPE:
			return {
				...state,
				response: action.payload,
			};
		case RECIPE_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				filterRecipes: action.payload,
			};
		case GET_DIETS:
			return {
				...state,
				diets: action.payload,
			};
		case FILTER_BY_DIETS:
			const { origin, orders, filterdiet } = action.payload;

			let filtered = state.recipes; //todos los datos de recipes

			if (filterdiet) {
				filtered = filtered.filter((e) => e.diet.includes(filterdiet));
			}

			if (origin) {
				if (origin === "Api") {
					filtered = filtered.filter((e) => e.createdInDb === false);
				} else {
					filtered = filtered.filter((e) => e.createdInDb === true);
				}
			}

			if (orders) {
				if (orders === "nameAsc") {
					filtered = filtered.sort((a, b) =>
						a.name.localeCompare(b.name)
					);
				}
				if (orders === "nameDesc") {
					filtered = filtered.reverse((a, b) =>
						a.name.localeCompare(b.name)
					);
				}

				if (orders === "puntosAsc") {
					filtered = filtered.sort(function (a, b) {
						return (
							parseInt(a.healthScore, 10) -
							parseInt(b.healthScore, 10)
						);
					});
				}

				if (orders === "puntosDesc") {
					filtered = filtered.sort(function (a, b) {
						return (
							parseInt(b.healthScore, 10) -
							parseInt(a.healthScore, 10)
						);
					});
				}
				// filtered = filtered.filter((e) => e.id !== "99");
			}

			return {
				...state,
				filterRecipes: filtered,
			};

		case ORDER_BY_NAME:
			const recipesSorted =
				action.payload === "asc"
					? state.recipes.sort((a, b) => {
							if (a.name > b.name) return 1;
							if (b.name > a.name) return -1;
							return 0;
					  })
					: state.recipes.sort((a, b) => {
							if (a.name > b.name) return -1;
							if (b.name > a.name) return 1;
							return 0;
					  });
			return {
				...state,
				recipes: recipesSorted,
			};
		case ORDER_BY_SCORE:
			const recipesByScore =
				action.payload === "asc"
					? state.recipes.sort((a, b) => {
							if (a.healthScore > b.healthScore) return 1;
							if (b.healthScore > a.healthScore) return -1;
							return 0;
					  })
					: state.recipes.sort((a, b) => {
							if (a.healthScore > b.healthScore) return -1;
							if (b.healthScore > a.healthScore) return 1;
							return 0;
					  });
			return {
				...state,
				recipes: recipesByScore,
			};

		case SEARCH_BY_NAME:
			return {
				...state,
				recipes: action.payload,
			};
		case CHANGE_STATE_ADD:
			return {
				...state,
				response: action.payload,
			};
		default:
			return state;
	}
}
export default rootReducer;
