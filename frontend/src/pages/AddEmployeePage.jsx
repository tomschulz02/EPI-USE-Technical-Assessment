import React, { useEffect, useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import api from '../api/api';

export default function AddEmployeePage() {
	const [managers, setManagers] = useState([]);

	useEffect(() => {
		api.get('/employees').then((res) => setManagers(res.data));
	}, []);

	const handleSubmit = (form) => {
		api.post('/employees', form).then(() => {
			window.location.href = '/';
		});
	};

	return (
		<div>
			<h1>Add Employee</h1>
			<EmployeeForm managers={managers} onSubmit={handleSubmit} />
		</div>
	);
}
