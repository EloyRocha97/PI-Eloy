import React from "react";
import { Link } from "react-router-dom";
import Card from '../Card/Card'


export default function Cards({ recipes }) {
    return (
        <div >
            {recipes && recipes?.map((e) => (
                <div key={e.id}>
                    <Link to={`/recipes/${e.id}`} >
                        <Card name={e.name}
                            img={e.img}
                            healthScore={e.healthScore}
                            diet={e.diet.join(", ")} />
                    </Link>
                </div>
            ))
            }
        </div>
    )
}