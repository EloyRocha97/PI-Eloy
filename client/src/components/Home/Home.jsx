import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, filterByDiets } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Cards from '../AllCards/AllCard';
import Paginate from '../Pag/Pagination'
import styles from './Home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.filterRecipes)
    const diets = useSelector(state => state.diets);

    //////////////// PAGINADO 1-9
    const [currentPage, setCurrentPage] = useState(1);    // pagina que ira cambiando
    const [recipesPerPage] = useState(9);
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe); // las 9 recetas que se iran mostrando en cda pág
    const paginate = (pageNumber) => setCurrentPage(pageNumber);// 1, 9, 18, 27


    //estado local filtros/ordenamientos
    const initialState = {
        orders: "",
        filterdiet: "",
        origin: "",
    };
    let [stateFilter, setStateFilter] = useState(initialState); // Local filter

    //Evento para todos los filtros y busquedas
    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.name, "------", e.target.value);
        setStateFilter({ ...stateFilter, [e.target.name]: e.target.value });
    };



    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
        console.log(allRecipes);
    }, [dispatch]);

    useEffect(() => {
        dispatch(filterByDiets(stateFilter));
        console.log("renderizo");
    }, [dispatch, stateFilter, stateFilter.orders, stateFilter.filterdiet]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    return (
        <div className={styles.fond}>
            {/* <span className={styles.s1}>Comida</span>
            <span className={styles.s2}>Recetas</span> */}
            <h1 className={styles.letra}>MIRA QUE TE COMO!</h1>
            <div className={styles.DisplayFilters}>
                <div className={styles.columnaHP}>
                    {/* ORDENAMIENTOS */}
                    <div className={styles.Order}>
                        <select
                            name="orders"
                            id="orders"
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="default"> ORDENAMIENTOS</option>
                            <option value="nameAsc">Name A to Z</option>
                            <option value="nameDesc">Name Z to A</option>
                            <option value="puntosAsc">PUNTOS-Lower</option>
                            <option value="puntosDesc">PUNTOS-Higher</option>
                        </select>
                    </div>
                    {/* [ ] Botones/Opciones para filtrar por: BD o API*/}
                    <div className={styles.FilterByBdApi}>
                        <select
                            id="origin"
                            placeholder="By Origin"
                            name="origin"
                            key="origin"
                            onChange={(e) => handleChange(e)}
                        >
                            <option
                                className={styles.Origin}
                                value=""
                            >
                                Filter By Origin
                            </option>
                            <option value="Api">Api</option>
                            <option value="DB">Data Base</option>
                        </select>
                    </div>
                    <div className={styles.Order}>
                        {/* [ ] Botones/Opciones para filtrar por: diets*/}
                        <div className={styles.FilterBydiets}>
                            <select
                                id="filterdiet"
                                name="filterdiet"
                                onChange={(e) => handleChange(e)}
                            >
                                <option className="diett" value="">
                                    Filter by dietas
                                </option>
                                {diets && diets.map(d => (
                                    <option value={d.name} key={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="button-filter"
                            onClick={(e) => {
                                document.getElementById("origin").value = "";
                                document.getElementById("orders").value = "default";
                                document.getElementById("filterdiet").value = "";
                                dispatch(filterByDiets(stateFilter));
                                setStateFilter(initialState);
                            }}
                        >
                            ---- Clean Filters ----
                        </button>
                    </div>
                </div>
            </div>

            <Paginate
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginate={paginate}
                currentPage={currentPage}
            />

            <Cards recipes={currentRecipes} />


            <div className={styles.flex}>
                <Link to='/'>
                    <button className={styles.back}>Volver</button>
                </Link>
            </div>
        </div>

    )

}