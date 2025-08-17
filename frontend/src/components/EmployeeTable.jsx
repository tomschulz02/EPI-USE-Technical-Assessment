import React, { useState } from 'react';
import '../styles/table.css';
import md5 from 'md5';

export default function EmployeeTable({ employees, onEdit, onDelete, onSort }) {
	const [menuPosition, setMenuPosition] = useState(null);
	const [activeEmployee, setActiveEmployee] = useState(null);
	const [sort, setSort] = useState({ column: '', direction: 'asc' });

	const manager_map = {};
	employees.map((emp, index) => {
		manager_map[emp.id] = emp.name + ' ' + emp.surname;
	});

	const handleActionsClick = (event, employee) => {
		event.preventDefault();
		const rect = event.currentTarget.getBoundingClientRect();
		setMenuPosition({
			top: rect.top + window.scrollY - 2 * rect.height, // Added rect.height to position below the dots
			left: rect.left + window.scrollX,
		});
		setActiveEmployee(employee);
	};

	const handleCloseMenu = () => {
		setMenuPosition(null);
		setActiveEmployee(null);
	};

	const handleSort = (column) => {
		let newDirection = 'asc';

		if (column === sort.column) {
			if (sort.direction === 'desc') {
				column = '';
			} else {
				newDirection = 'desc';
			}
		}

		const newSort = {
			column,
			direction: newDirection,
		};

		setSort(newSort);
		onSort(column);
	};

	return (
		<>
			<table className="employee-table">
				<thead>
					<tr>
						<th onClick={() => handleSort('name')}>
							Name{' '}
							{sort.column === 'name' ? sort.direction === 'desc' ? <span>&#8593;</span> : <span>&#8595;</span> : ''}
						</th>
						<th onClick={() => handleSort('role')}>
							Role{' '}
							{sort.column === 'role' ? sort.direction === 'desc' ? <span>&#8593;</span> : <span>&#8595;</span> : ''}
						</th>
						<th onClick={() => handleSort('salary')}>
							Salary{' '}
							{sort.column === 'salary' ? sort.direction === 'asc' ? <span>&#8593;</span> : <span>&#8595;</span> : ''}
						</th>
						<th onClick={() => handleSort('manager')}>
							Manager{' '}
							{sort.column === 'manager' ? sort.direction === 'desc' ? <span>&#8593;</span> : <span>&#8595;</span> : ''}
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{employees.map((emp) => (
						<tr key={emp.id}>
							{/* <td>
                                <img
                                    src={`https://www.gravatar.com/avatar/${md5(emp.email.trim().toLowerCase())}?d=identicon`}
                                    alt="avatar"
                                    width="40"
                                    height="40"
                                />
                            </td> */}
							<td>
								{emp.name} {emp.surname}
							</td>
							<td>{emp.role}</td>
							<td>{emp.salary}</td>
							<td>{manager_map[emp.manager_id] || '—'}</td>
							<td
								className="employee-table-employee-actions"
								onClick={(e) => handleActionsClick(e, emp)}
								style={{ cursor: 'pointer' }}>
								&#8942;
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{menuPosition && (
				<>
					<div className="context-menu-overlay" onClick={handleCloseMenu} />
					<div
						className="context-menu"
						style={{
							position: 'absolute',
							top: menuPosition.top,
							left: menuPosition.left,
						}}>
						<button
							onClick={() => {
								handleCloseMenu();
							}}>
							View
						</button>
						<button
							onClick={() => {
								onEdit(activeEmployee);
								handleCloseMenu();
							}}>
							Edit
						</button>
						<button
							onClick={() => {
								onDelete(activeEmployee);
								handleCloseMenu();
							}}>
							Delete
						</button>
					</div>
				</>
			)}
		</>
	);
}
