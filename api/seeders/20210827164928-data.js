const products = require("../data/product");
const carts = require("../data/cart");
const { Product, Cart } = require("../models/index");

("use strict");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return Promise.all([
			//Cargamos Productos
			await Product.bulkCreate(products, { hooks: true }),
			//Cargamos Carros
			await Cart.bulkCreate(carts, { hooks: true }),
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.bulkDelete("Products", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			}),
			queryInterface.bulkDelete("Carts", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			}),
		]);
	},
};
