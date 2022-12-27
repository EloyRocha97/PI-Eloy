import React from "react";
import style from "./Card.module.css"

const Card = (props) => {
    return (
        <div className={style.card}>
            <div className={style.thumbnail}>
                <img className={style.left} src={props.img} />
            </div>
            <div className={style.right}>
                <h1>{props.name}</h1>
                <div className={style.author}><img src="https://st.depositphotos.com/1533030/1472/v/600/depositphotos_14725079-stock-illustration-knife-fork-and-spoon.jpg" />
                    <h2>Resto Eloy</h2>
                </div>
                <div className={style.separator}></div>
                <p>{props.diet}</p>
            </div>
            <div className={style.fab}><h5>{props.healthScore}</h5></div>
        </div >

    )
}

export default Card;
