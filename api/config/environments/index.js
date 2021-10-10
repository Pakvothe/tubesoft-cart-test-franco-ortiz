require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const PRODUCTION = require("./production");
const DEVELOPMENT = require("./development");
const { NODE_ENV } = process.env;

let currentEnv = DEVELOPMENT;

if (NODE_ENV === "production") {
	currentEnv = PRODUCTION;
}

module.exports = currentEnv;
