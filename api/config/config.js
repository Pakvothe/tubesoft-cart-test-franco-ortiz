const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "postgres",
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "postgres",
	},
	production: {
		// use_env_variable: process.env.DATABASE_URL,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT,
		host: process.env.DB_HOST,
		dialect: "postgres",
		logging: false,
		native: false,
		pool: {
			max: 3,
			min: 1,
			idle: 10000,
		},
		dialectOptions: {
			ssl: {
				require: true,
				// Ref.: https://github.com/brianc/node-postgres/issues/2009
				rejectUnauthorized: false,
			},
			keepAlive: true,
		},
	},
};
