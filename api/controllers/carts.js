"use strict";

const { Cart, Product, Prod_Cart } = require("../models/index");

exports.post = async (req, res) => {
	const { cartProducts, createDate } = await req.body;
	return Cart.create({ cartProducts, createDate })
		.then((result) => res.status(201).json(result))
		.catch((err) => res.status(400).json(err));
};

exports.list = (req, res, next) => {
	return Cart.findAll({})
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((error) => {
			console.log(error);
			return res.status(400).send(error);
		});
};

exports.delete = async (req, res, next) => {
	let { id } = await req.params;
	return Cart.destroy({
		where: {
			id,
		},
	})
		.then(() => {
			return res.status(200).send({ msg: "Cart was deleted succesfully" });
		})
		.catch((error) => {
			return res.status(400).send(error);
		});
};
