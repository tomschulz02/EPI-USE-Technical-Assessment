import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	connectionString: process.env.DB_CONN_STR,
	ssl: { rejectUnauthorized: false },
});

pool
	.connect()
	.then((client) => {
		console.log('Connected to DB');
		client.release();
	})
	.catch((error) => {
		console.error('Database connection error', error);
	});

export default pool;
