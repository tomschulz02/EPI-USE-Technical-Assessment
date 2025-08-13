import { employeesService } from '../services/employeesService';

async function fetchAllEmployees(req, res) {
	try {
		const employees = await employeesService.fetchAllEmployees();

		if (employees === 'DB_ERROR' || employees === 'SERVICE_ERROR') {
			return res.status(500).json({ success: false, message: 'Internal server error' });
		}

		if (employees.length === 0) {
			return res.status(200).json({ success: true, message: 'No employees registered yet', data: [] });
		}

		return res.status(200).json({ success: true, message: 'Retrieved all registered employees', data: employees });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

async function fetchEmployee(req, res) {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ success: false, message: 'Employee ID is missing' });
		}

		const employee = await employeesService.fetchEmployee(id);

		if (employee === 'DB_ERROR' || employee === 'SERVICE_ERROR') {
			return res.status(500).json({ success: false, message: 'Internal server error' });
		}

		if (employee === 'EMPLOYEE_DNE') {
			return res.status(404).json({ success: false, message: 'Employee not found' });
		}

		return res.status(200).json({ success: true, message: 'Retrieved all registered employees', data: employee });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

async function addEmployee(req, res) {
	try {
		const { name, surname, dob, employee_no, salary, role, manager, email } = req.body;

		const result = await employeesService.addEmployee({
			name,
			surname,
			dob,
			employee_no,
			salary,
			role,
			manager,
			email,
		});

		if (result === 'MISSING_FIELDS') {
			return res.status(400).json({ success: false, message: 'Some required fields are missing' });
		}

		if (result === 'DUPLICATE_ENTRY') {
			return res.status(400).json({ success: false, message: 'Duplicate data for unique fields was entered' });
		}

		if (result === 'MANAGER_DNE') {
			return res.status(400).json({ success: false, message: 'Chosen manager does not exist' });
		}

		if (result === 'DB_ERROR' || result === 'SERVICE_ERROR') {
			return res.status(500).json({ success: false, message: 'Internal server error' });
		}

		return res.status(200).json({ success: true, message: 'Successfully registered new employee', data: result });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

async function updateEmployee(req, res) {
	try {
		const { name, surname, dob, employee_no, salary, role, manager, email } = req.body;
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ success: false, message: 'Employee ID is missing' });
		}

		const result = await employeesService.updateEmployee(id, {
			name,
			surname,
			dob,
			employee_no,
			salary,
			role,
			manager,
			email,
		});
	} catch (err) {}
}

async function removeEmployee(req, res) {}

export const employeesController = {
	fetchAllEmployees,
	fetchEmployee,
	addEmployee,
	updateEmployee,
	removeEmployee,
};
