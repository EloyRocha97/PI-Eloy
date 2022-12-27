import { useSelector, useDispatch } from "react-redux";
import {
    getDiets,
    getRecipes,
    postRecipe,
    changeStateAdd
} from "../../redux/actions";
import React, { useEffect, useState } from "react";
import { AddRecipeValidate, AddRecipeObj, btn } from "./Validaciones";
import style from "./AddRecipe.module.css";
import Icon from "./comida.svg";

const AddRecipe = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const initStateInputRecipe = {
        name: "",
        img: "",
        diet: "",
        dietId: "",
        dietTypes: [],
        summary: "",
        healthScore: "",

    };
    const [stateInputRecipe, setStateInputRecipe] = useState(initStateInputRecipe); //Local

    //recipes
    const allRecipes = useSelector((state) => state.recipes); //Global food
    const response = useSelector((state) => state.response); //Global allfood
    //die
    let alldiet = useSelector((state) => state.diets); //Global diet
    var diet = alldiet.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });

    const handleInputChange = function (e) {
        e.preventDefault();
        setStateInputRecipe({
            ...stateInputRecipe,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "dietId") {
            if (stateInputRecipe.dietTypes.includes(parseInt(e.target.value))) {
                alert("Already existing. Please try again.");
            } else {
                /* for text - recipes */
                var combo = document.getElementById("diet_input");
                var selected = combo.options[combo.selectedIndex].text;
                setStateInputRecipe({
                    ...stateInputRecipe,
                    diet: [
                        ...stateInputRecipe.diet,
                        selected,
                    ],
                });

                setStateInputRecipe((state) => ({
                    ...state,
                    dietTypes: [...state.dietTypes, e.target.value],
                }));
            }
        }
        setErrors(
            AddRecipeValidate(
                { ...stateInputRecipe, [e.target.name]: e.target.value },
                allRecipes
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var objRecipe = AddRecipeObj(stateInputRecipe);
        console.log(objRecipe);
        dispatch(postRecipe(objRecipe));
    };

    const handleOk = (e) => {
        e.preventDefault();
        alert(response);
        // resetForm()
        setStateInputRecipe(initStateInputRecipe); //inicializa en blanco los campos
        dispatch(changeStateAdd("null")); //cambio estado
    };
    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch]);

    return (
        <div className={style.createRecipe} >
            <h4>&bull; Create Recipe &bull;</h4>
            <div className={style.underline}></div>
            <div className={style.icon_wrapper}>
                <img
                    className={style.icon}
                    viewBox="0 0 145.192 145.192"
                    src={Icon}
                    alt="Icon svg"
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div >
                    <input className={style.name}
                        key="name"
                        type="text"
                        placeholder="Inserte nombre de la dieta..."
                        name="name"
                        id="name_input"
                        required
                        onChange={handleInputChange}
                        value={stateInputRecipe.name}
                    />
                    {errors.name && (
                        <p className={style.danger}>{errors.name}</p>
                    )}
                </div>
                <div className={style.healthScore}>
                    <input
                        key="healthScore"
                        type="number"
                        placeholder="Inserte Puntos..."
                        name="healthScore"
                        id="healthScore_input"
                        required
                        onChange={handleInputChange}
                        value={stateInputRecipe.healthScore}
                    />
                    {errors.healthScore && (
                        <p className={style.danger}>{errors.healthScore}</p>
                    )}
                </div>
                <div className={style.summary}>
                    <textarea
                        cols="30"
                        rows="2"
                        placeholder="Inserte Resumen..."
                        name="summary"
                        id="summary_input"
                        required
                        key="summary"
                        onChange={handleInputChange}
                        value={stateInputRecipe.summary}
                    />
                    {errors.summary && (
                        <p className={style.danger}>{errors.summary}</p>
                    )}
                </div>
                <div className={style.diet}>
                    <select
                        placeholder="Todas las dietas"
                        name="dietId"
                        id="diet_input"
                        //required
                        key="dietId"
                        onChange={handleInputChange}
                        value={stateInputRecipe.dietId}
                    >
                        <option key="0" value="" hidden defaultValue
                            className={style.selectD}>
                            Seleccionar Dieta
                        </option>

                        {diet.map((e, i) => (
                            <option key={i} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                    {errors.dietId && (
                        <p className={style.danger}>{errors.dietId}</p>
                    )}
                </div>
                <div className={style.message}>
                    <textarea
                        name="message"
                        placeholder="diet"
                        id="message_input"
                        cols="30"
                        rows="2"
                        value={stateInputRecipe.diet}
                        readOnly
                    ></textarea>
                </div>
                <div className={style.image}>
                    <input
                        key="img"
                        type="text"
                        placeholder="Insert Url Image..."
                        name="img"
                        id="img_input"
                        required
                        onChange={handleInputChange}
                        value={stateInputRecipe.img}
                    />
                    {errors.img && (
                        <p className="danger">{errors.img}</p>
                    )}
                </div>
                <div>
                    {!Object.keys(errors).length
                        ? btn(response, handleOk, handleSubmit)
                        : ""}
                </div>
            </form>
        </div >
    );
};

export default AddRecipe;
