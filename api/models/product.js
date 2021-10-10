"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsToMany(models.Cart, { through: "Prod_Product" });
		}
	}
	Product.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			img: {
				type: DataTypes.STRING,
				//TODO: validar si es url
				allowNull: true,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			totalStock: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			paranoid: true,
			sequelize,
			timestamps: true,
			modelName: "Product",
		}
	);
	return Product;
};
