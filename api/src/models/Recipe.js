const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"recipe",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			summary: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			spoonacularScore: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			healthScore: {
				type: DataTypes.STRING,
			},
			analyzedInstructions: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			diet: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			timestamps: false,
			createdAt: false,
			updatedAd: false,
		}
	);
};
