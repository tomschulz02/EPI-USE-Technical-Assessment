import React, { useState, useEffect } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import apiRequest from '../api/api';

export default function TablePage() {
	const [employees, setEmployees] = useState([]);
	const [originalEmployeeList, setOriginalEmployeeList] = useState([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [sortConfig, setSortConfig] = useState({ column: '', direction: 'asc' });

	useEffect(() => {
		const fetchEmployees = async () => {
			setLoading(true);
			try {
				const data = await apiRequest('/employees/', { method: 'GET' });
				setEmployees(data.data);
				setOriginalEmployeeList(data.data);
			} catch (error) {
				console.error(error);
				setEmployees([]);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployees();
	}, []);

	const filtered = employees.filter((emp) => `${emp.name} ${emp.surname}`.toLowerCase().includes(search.toLowerCase()));

	const handleDelete = (id) => {
		if (window.confirm('Delete this employee?')) {
			setLoading(true);
			api
				.delete(`/employees/${id}`)
				.then(() => {
					setEmployees((prev) => prev.filter((emp) => emp.id !== id));
				})
				.finally(setLoading(false));
		}
	};

	const handleSort = (column) => {
		let direction = 'asc';

		if (sortConfig.column === column) {
			if (sortConfig.direction === 'asc') {
				direction = 'desc';
			} else {
				column = '';
			}
		}
		const newSort = { column, direction };
		// Update sort configuration
		setSortConfig(newSort);

		const sortedEmployees = [...originalEmployeeList].sort((a, b) => {
			let compareA, compareB;

			switch (column) {
				case 'name':
					compareA = `${a.name} ${a.surname}`.toLowerCase();
					compareB = `${b.name} ${b.surname}`.toLowerCase();
					break;
				case 'role':
					compareA = a.role.toLowerCase();
					compareB = b.role.toLowerCase();
					break;
				case 'salary':
					compareA = parseFloat(a.salary);
					compareB = parseFloat(b.salary);
					break;
				case 'manager':
					compareA = a.manager_id
						? `${originalEmployeeList.find((e) => e.id === a.manager_id)?.name || ''}`.toLowerCase()
						: '';
					compareB = b.manager_id
						? `${originalEmployeeList.find((e) => e.id === b.manager_id)?.name || ''}`.toLowerCase()
						: '';
					break;
				default:
					return 0;
			}

			if (compareA < compareB) return direction === 'asc' ? -1 : 1;
			if (compareA > compareB) return direction === 'asc' ? 1 : -1;
			return 0;
		});
		console.log(sortedEmployees);
		setEmployees(sortedEmployees);
	};

	return (
		<>
			{loading && <Loader />}
			<div className="table-page-content">
				<h1>Employees Table</h1>
				<SearchBar classname={'table-page-search'} value={search} onChange={setSearch} />
				{filtered.length > 0 ? (
					<EmployeeTable
						employees={filtered}
						onEdit={(id) => (window.location.href = `/edit/${id}`)}
						onDelete={handleDelete}
						onSort={handleSort}
					/>
				) : (
					<div>No employee data to display</div>
				)}
			</div>
		</>
	);
}
