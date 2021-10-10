"use strict";

const { Cart, Product, Prod_Cart } = require("../models/index");

exports.get = (req, res, next) => {
	let { id } = req.params;
	if (!id) return res.status(404).send("The cart was not found");
	Cart.findByPk(id)
		.then((a) => {
			return res.status(200).send(a);
		})
		.catch((error) => {
			console.log(error);
			return res.status(304).send(error);
		});
};

exports.put = (req, res, next) => {
	let cart = req.body;
	let { id } = req.params;

	if (!id) return res.status(400).send("The cart was not found");
	Cart.update(cart, { where: { id } }).then(() => {
		return res.status(200).send("The cart was updated");
	});
};

exports.post = (req, res, next) => {
	let { cartId, productId, total } = req.params;

	if (!cartId || !productId) return res.status(400).send("The cart was not added correctly");
	Product.findByPk(productId).then(() => {
		Cart.create({
			total,
		}).then((a) => {
			return res.send({ msg: "The cart was created" });
		});
	});
};

exports.list = (req, res, next) => {
	Cart.findAll({})
		.then((a) => {
			return res.status(200).send(a);
		})
		.catch((error) => {
			console.log(error);
			return res.status(304).send(error);
		});
};

exports.delete = (req, res, next) => {
	let { id } = req.params;
	if (!id) return res.status(400).send("The id do not exist");

	Cart.destroy({
		where: {
			id,
		},
	}).then(() => {
		return res.status(200).send({ msg: "Cart was deleted succesfully" });
	});
};
