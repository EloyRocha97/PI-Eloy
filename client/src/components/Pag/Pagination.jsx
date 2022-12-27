import React from "react";
import styles from "./Pagination.module.css";

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div className={styles.Pagination}>
			{pageNumbers.map((e) => (
				<p key={e} className={styles.pagNum}>
					<button className={styles.pageLink}
						onClick={() => paginate(e)}
					>
						{e}
					</button>
				</p>
			))}
		</div>
	);

}

