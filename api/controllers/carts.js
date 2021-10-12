"use strict";

const { Cart, Product, Prod_Cart } = require("../models/index");

exports.post = (req, res) => {
	const { cartProducts, createDate } = req.body;
	Cart.create({ cartProducts, createDate })
		.then((result) => res.status(201).send("Cart saved succesfully"))
		.catch((err) => res.send(err));
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
