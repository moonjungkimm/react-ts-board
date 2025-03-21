const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // 로컬 환경에서는 false
        trustServerCertificate: true,
    },
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

module.exports = { sql, poolConnect, pool };
