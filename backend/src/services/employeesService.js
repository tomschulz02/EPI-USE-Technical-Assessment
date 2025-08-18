import { employeesRepo } from '../repositories/employeesRepository.js';

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
		const result = await employeesRepo.fetchEmployee(id);
		if (result === 'DB_ERROR') {
			return result;
		}
		if (result.length === 0) {
			return 'EMPLOYEE_DNE';
		}
		return result[0];
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function addEmployee(details) {
	try {
		const { name, surname, employee_no, dob, role, salary, manager, email } = details;

		if (!name || !surname || !employee_no || !dob || !role || !salary || !email) {
			return 'MISSING_FIELDS';
		}

		if (manager && (await employeesRepo.fetchEmployee(manager)).length === 0) {
			return 'MANAGER_DNE';
		}

		if (await employeesRepo.checkDuplicateEntry(employee_no, email)) {
			return 'DUPLICATE_ENTRY';
		}

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

		if (result === 'DB_ERROR' || result.length === 0) {
			return 'DB_ERROR';
		}

		return result[0];
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function updateEmployee(id, details) {
	try {
		const { name, surname, employee_no, dob, role, salary, manager, email } = details;

		if (manager && id === manager) {
			return 'MANAGER_LOOP';
		}

		if (manager && (await employeesRepo.fetchEmployee(manager)).length === 0) {
			return 'MANAGER_DNE';
		}

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

		if (result === 'DB_ERROR' || result.length === 0) {
			return 'DB_ERROR';
		}

		return result[0];
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function removeEmployee(id) {
	try {
		const result = await employeesRepo.deleteEmployee(id);

		if (result === 'DB_ERROR' || result.length === 0) {
			return 'DB_ERROR';
		}

		return result[0];
	} catch (err) {
		console.error(err);
		return 'SERVICE_ERROR';
	}
}

async function fetchHierarchy() {
	try {
		const employees = await employeesRepo.fetchAllEmployees();

		// create tree structure from flat list
		const lookup = {};
		employees.forEach((employee) => {
			lookup[employee.id] = {
				name: `${employee.name} ${employee.surname}`,
				attributes: {
					role: employee.role,
					email: employee.email,
					employee_no: employee.employee_number,
					salary: employee.salary,
				},
				children: [],
			};
		});

		let root = [];
		employees.forEach((employee) => {
			if (employee.manager_id === null) {
				root.push(lookup[employee.id]);
			} else {
				const manager = lookup[employee.manager_id];
				if (manager) {
					manager.children.push(lookup[employee.id]);
				}
			}
		});

		return root;
	} catch (error) {
		console.error(error);
		return 'SERVICE_ERROR';
	}
}

export const employeesService = {
	fetchAllEmployees,
	fetchEmployee,
	addEmployee,
	updateEmployee,
	removeEmployee,
	fetchHierarchy,
};
