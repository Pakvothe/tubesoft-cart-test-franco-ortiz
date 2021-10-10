module.exports = {
	PORT: process.env.PORT,
	DB: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "postgres",
		logging: false,
		native: false,
	},
	FRONT_URL: process.env.FRONT_URL,
	SECRET_KEY: process.env.SECRET_KEY,
};
