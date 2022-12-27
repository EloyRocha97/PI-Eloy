import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { recipeDetail } from "../../redux/actions";
import style from "./Details.module.css";

const Details = () => {
    let { id: idRecipes } = useParams();
    let [id] = useState(idRecipes);
    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.detail); //Global recipes
    let { name, img, summary } = recipe;

    const history = useHistory();
    console.log(history.location.pathname);

    function goBack() {
        history.push("/home");
        //history.goBack(1);
    }

    useEffect(() => {
        dispatch(recipeDetail(id));
        console.log(recipe)
    }, [dispatch, id]);
    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.card__imagecontainer}>
                    <img className={style.card__image} src={img} alt="" />
                </div>

                <svg className={style.card__svg} viewBox="0 0 800 500">

                    <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                    <path className={style.card__line} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth="3" fill="transparent" />
                </svg>

                <div className={style.card__content}>
                    <h1 className={style.card__title}> {name}</h1>
                    <p> {summary} </p>
                </div>
            </div>
        </div>
    );
};
export default Details;
