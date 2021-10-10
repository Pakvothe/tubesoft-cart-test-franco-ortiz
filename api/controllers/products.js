"use strict";

const { Product } = require("../models/index");

exports.list = (req, res, next) => {
	Product.findAll({})
		.then((p) => {
			return res.status(200).send(p);
		})
		.catch((error) => {
			console.log(error);
			return res.status(304).send(error);
		});
};
