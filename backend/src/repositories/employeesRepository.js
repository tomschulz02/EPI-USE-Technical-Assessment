import pool from '../db.js';

async function fetchAllEmployees() {
	try {
		const result = await pool.query('SELECT * FROM employees;');
		return result.rows;
	} catch (err) {
		console.error(err);
		return 'DB_ERROR';
	}
}

async function fetchEmployee(id) {
	try {
		const result = await pool.query('SELECT * FROM employees WHERE id=$1;', [id]);
		return result.rows;
	} catch (err) {
		console.error(err);
		return 'DB_ERROR';
	}
}

async function createEmployee(name, surname, dob, emp_no, salary, role, email, manager = null) {
	try {
		const result = await pool.query(
			'INSERT INTO employees (name, surname, birth_date, employee_number, salary, role, manager_id, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
			[name, surname, dob, emp_no, salary, role, manager, email]
		);
		return result.rows;
	} catch (err) {
		console.error(err);
		return 'DB_ERROR';
	}
}

async function updateEmployee(id, name, surname, dob, emp_no, salary, role, email, manager = null) {
	try {
		const result = await pool.query(
			`
                UPDATE employees
                SET name=$1, surname=$2, birth_date=$3, employee_number=$4, salary=$5, role=$6, manager_id=$7, email=$8
                WHERE id=$9
				RETURNING *;
            `,
			[name, surname, dob, emp_no, salary, role, manager, email, id]
		);
		return result.rows;
	} catch (err) {
		console.error(err);
		return 'DB_ERROR';
	}
}

async function deleteEmployee(id) {
	try {
		const result = await pool.query('DELETE FROM employees WHERE id=$1 RETURNING *;', [id]);
		return result.rows;
	} catch (err) {
		console.error(err);
		return 'DB_ERROR';
	}
}

async function checkDuplicateEntry(emp_no, email) {
	try {
		const result = await pool.query('SELECT id FROM employees WHERE employee_number=$1 OR email=$2;');

		return result.rows.length > 0;
	} catch (err) {
		console.error(err);
		return 'DB_ERROR';
	}
}

export const employeesRepo = {
	fetchAllEmployees,
	fetchEmployee,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	checkDuplicateEntry,
};
