import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import api from '../api/api';

export default function EditEmployeePage() {
	const { id } = useParams();
	const [managers, setManagers] = useState([]);
	const [employee, setEmployee] = useState(null);

	useEffect(() => {
		api.get('/employees').then((res) => setManagers(res.data.data));
		api.get(`/employees/${id}`).then((res) => setEmployee(res.data.data));
	}, [id]);

	const handleSubmit = (form) => {
		api.put(`/employees/${id}`, form).then(() => {
			window.location.href = '/';
		});
	};

	if (!employee) return <p>Loading...</p>;

	return (
		<div className="edit-employees-window">
			<h1>Edit Employee</h1>
			<EmployeeForm initialData={employee} managers={managers} onSubmit={handleSubmit} />
		</div>
	);
}
