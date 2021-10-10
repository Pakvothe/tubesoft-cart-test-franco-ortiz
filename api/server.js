const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");

const server = express();

/**
 * SETUP GENERAL
 */

server.use(morgan("dev")); //para logear a la terminal
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
server.use(cors({ origin: true, credentials: true }));

server.use("/", routes);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
