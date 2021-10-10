const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

//Rutas
router.get("/", function (req, res) {
	res.send("Welcome!");
});
router.get("/products", controllers.Products.list);
router.get("/carts", controllers.Carts.list);

module.exports = router;
