const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};
// const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@
// ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const proConfig = {
    connectionString: process.env.HEROKU_POSTGRESQL_DBNAME_URL,
    ssl: true
};

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;