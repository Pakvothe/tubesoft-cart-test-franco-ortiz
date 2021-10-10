module.exports = {
  DB: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    native: false,
    use_env_variable: process.env.DATABASE_URL,
    pool: {
      max: 3,
      min: 1,
      idle: 10000,
    },
    ssl: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true,
        // Ref.: https://github.com/brianc/node-postgres/issues/2009
      },
      keepAlive: true,
    },
  },
  FRONT_URL: process.env.FRONT_URL,
  SECRET_KEY: process.env.SECRET_KEY,
};
