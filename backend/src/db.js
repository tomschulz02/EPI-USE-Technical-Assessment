import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

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
