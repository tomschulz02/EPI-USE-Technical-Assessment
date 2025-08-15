import React, { useState, useEffect } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import SearchBar from '../components/SearchBar';
import api from '../api/api';

export default function TablePage() {
	const [employees, setEmployees] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		// Replace with API call
		api.get('/employees').then((res) => setEmployees(res.data.data));
	}, []);

	const filtered = employees.filter((emp) => `${emp.name} ${emp.surname}`.toLowerCase().includes(search.toLowerCase()));

	const handleDelete = (id) => {
		if (window.confirm('Delete this employee?')) {
			api.delete(`/employees/${id}`).then(() => {
				setEmployees((prev) => prev.filter((emp) => emp.id !== id));
			});
		}
	};

	return (
		<div className="table-page-content">
			<h1>Employees Table</h1>
			<SearchBar classname={'table-page-search'} value={search} onChange={setSearch} />
			<EmployeeTable
				employees={filtered}
				onEdit={(id) => (window.location.href = `/edit/${id}`)}
				onDelete={handleDelete}
			/>
		</div>
	);
}
