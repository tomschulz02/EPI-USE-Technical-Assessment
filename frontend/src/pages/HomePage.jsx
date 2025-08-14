import React, { useState, useEffect } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import SearchBar from '../components/SearchBar';
import api from '../api/api';

export default function HomePage() {
	const [employees, setEmployees] = useState([]);
	const [search, setSearch] = useState('');
	const [filteredEmployees, setFilteredEmployees] = useState([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const result = await api.get('/employees/').then((res) => {
				return res.data.data;
			});

			setEmployees(result);
		};

		fetchEmployees();
	}, []);

	useEffect(() => {
		const filtered = employees.filter((emp) =>
			`${emp.name} ${emp.surname}`.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredEmployees(filtered);
	}, [employees, search]);

	const handleDelete = (id) => {
		if (window.confirm('Delete this employee?')) {
			api.delete(`/employees/${id}`).then(() => {
				setEmployees((prev) => prev.filter((emp) => emp.id !== id));
			});
		}
	};

	return (
		<div>
			<h1>Employees</h1>
			<SearchBar value={search} onChange={setSearch} />
			<EmployeeTable
				employees={filteredEmployees}
				onEdit={(id) => (window.location.href = `/edit/${id}`)}
				onDelete={handleDelete}
			/>
		</div>
	);
}
