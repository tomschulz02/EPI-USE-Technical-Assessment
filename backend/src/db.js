import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	connectionString: process.env.DB_CONN_STR,
	ssl: { rejectUnauthorized: false },
});

export default pool;
