import { employeesRepo } from '../repositories/employeesRepository';

async function fetchAllEmployees() {
	try {
		const result = await employeesRepo.fetchAllEmployees();

		return result;
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function fetchEmployee(id) {
	try {
		return await employeesRepo.fetchEmployee(id);
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function addEmployee(details) {
	try {
		const { name, surname, employee_no, dob, role, salary, manager, email } = details;

		const result = await employeesRepo.createEmployee(
			name,
			surname,
			dob,
			employee_no,
			salary,
			role,
			email,
			manager || null
		);

		return result;
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function updateEmployee(id, details) {
	try {
		const { name, surname, employee_no, dob, role, salary, manager, email } = details;

		const result = await employeesRepo.updateEmployee(
			id,
			name,
			surname,
			dob,
			employee_no,
			salary,
			role,
			email,
			manager || null
		);

		return result;
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function removeEmployee(id) {
	try {
		const result = await employeesRepo.deleteEmployee(id);

		return result;
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

export const employeesService = {
	fetchAllEmployees,
	fetchEmployee,
	addEmployee,
	updateEmployee,
	removeEmployee,
};
