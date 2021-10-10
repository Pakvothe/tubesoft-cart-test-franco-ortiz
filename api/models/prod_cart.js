"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Prod_Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Prod_Cart.init(
		{
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Prod_Cart",
		}
	);
	return Prod_Cart;
};
