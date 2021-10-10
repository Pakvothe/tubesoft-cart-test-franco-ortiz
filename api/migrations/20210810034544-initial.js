const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Products", deps: []
 * createTable() => "Carts", deps: [Products]
 * createTable() => "Prod_Carts", deps: [Products, Carts]
 *
 */

const info = {
	revision: 1,
	name: "initial",
	created: "2021-10-13T12:37:02.136Z",
	comment: "",
};

const migrationCommands = (transaction) => {
	return [
		{
			fn: "createTable",
			params: [
				"Products",
				{
					id: {
						type: Sequelize.INTEGER,
						field: "id",
						autoIncrement: true,
						primaryKey: true,
						allowNull: false,
					},
					name: {
						type: Sequelize.STRING,
						field: "name",
						allowNull: false,
					},
					img: {
						type: Sequelize.STRING,
						field: "img",
						allowNull: true,
					},
					price: {
						type: Sequelize.INTEGER,
						field: "price",
						allowNull: false,
					},
					stock: {
						type: Sequelize.INTEGER,
						//TODO: validar que sea mayor o igual a 0
						field: "stock",
					},
					totalStock: {
						type: Sequelize.INTEGER,
						//TODO: validar que sea mayor o igual a 0
						field: "totalStock",
					},
					rating: {
						type: Sequelize.INTEGER,
						//TODO: validar que sea mayor o igual a 1
						field: "rating",
					},
					createdAt: {
						type: Sequelize.DATE,
						field: "createdAt",
						allowNull: false,
					},
					updatedAt: {
						type: Sequelize.DATE,
						field: "updatedAt",
						allowNull: false,
					},
					deletedAt: {
						type: Sequelize.DATE,
						field: "deletedAt",
					},
				},
				{ transaction },
			],
		},
		{
			fn: "createTable",
			params: [
				"Carts",
				{
					id: {
						type: Sequelize.INTEGER,
						field: "id",
						autoIncrement: true,
						primaryKey: true,
						allowNull: false,
					},
					total: {
						type: Sequelize.INTEGER,
						field: "total",
						allowNull: false,
					},
					createdAt: {
						type: Sequelize.DATE,
						field: "createdAt",
						allowNull: false,
					},
					updatedAt: {
						type: Sequelize.DATE,
						field: "updatedAt",
						allowNull: false,
					},
				},
				{ transaction },
			],
		},
		{
			fn: "createTable",
			params: [
				"Prod_Cart",
				{
					createdAt: {
						type: Sequelize.DATE,
						field: "createdAt",
						allowNull: false,
					},
					updatedAt: {
						type: Sequelize.DATE,
						field: "updatedAt",
						allowNull: false,
					},
					ProductId: {
						type: Sequelize.INTEGER,
						field: "ProductId",
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
						references: { model: "Products", key: "id" },
						primaryKey: true,
					},
					CartId: {
						type: Sequelize.INTEGER,
						field: "CartId",
						onUpdate: "CASCADE",
						onDelete: "CASCADE",
						references: { model: "Carts", key: "id" },
						primaryKey: true,
					},
				},
				{ transaction },
			],
		},
	];
};

const rollbackCommands = (transaction) => {
	return [
		{
			fn: "dropTable",
			params: ["Products", { transaction }],
		},
		{
			fn: "dropTable",
			params: ["Carts", { transaction }],
		},
		{
			fn: "dropTable",
			params: ["Prod_Cart", { transaction }],
		},
	];
};

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
	let index = pos;
	const run = (transaction) => {
		const commands = _commands(transaction);
		return new Promise((resolve, reject) => {
			const next = () => {
				if (index < commands.length) {
					const command = commands[index];
					console.log(`[#${index}] execute: ${command.fn}`);
					index++;
					queryInterface[command.fn](...command.params).then(next, reject);
				} else resolve();
			};
			next();
		});
	};
	if (this.useTransaction) {
		console.log("Tabla creada", transaction);
		return queryInterface.sequelize.transaction(run);
	}
	return run(null);
};

module.exports = {
	pos,
	useTransaction,
	up: (queryInterface, sequelize) => {
		return execute(queryInterface, sequelize, migrationCommands);
	},
	down: (queryInterface, sequelize) => {
		// return execute(queryInterface, sequelize, rollbackCommands);
		// Migración inicial. Con hacer un drop de todas las tablas debería ser suficiente
		return queryInterface.dropAllTables();
	},
	info,
};
