import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

export const NavBar = () => {
	return (
		<div id="NavBar" className={style.NavLinks}>
			<div>
				<NavLink
					activeStyle={{
						color: "180,180,180",
						fontWeight: "Open Sans",
					}}
					className={style.Link}
					to="/addrecipes"
				>
					Agregar Receta
				</NavLink>
			</div>
			<div>
				<NavLink
					activeStyle={{
						color: "180,180,180",
						fontWeight: "Open Sans",
					}}
					className={style.Link}
					to="/home"
				>
					<span>Home</span>
				</NavLink>
			</div>

			<div>
				<NavLink
					activeStyle={{
						color: "180,180,180",
						fontWeight: "Open Sans",
					}}
					className={style.Link}
					to="/about"
				>
					About
				</NavLink>
			</div>
		</div>
	);
};

