import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

const LandingPage = () => {
    return (
        <div className={styles.landing}>
            <h1 className={styles.welcom}>BIENVENIDOS A MI COCINA...</h1>
            <Link to='/home'>
                <button className={styles.boton}>Ingresar</button>
            </Link>
        </div>
    )
}

export default LandingPage;