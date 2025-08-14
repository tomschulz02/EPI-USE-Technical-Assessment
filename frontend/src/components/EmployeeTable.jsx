import React from 'react';
import '../styles/table.css';
import md5 from 'md5';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
	return (
		<table className="employee-table">
			<thead>
				<tr>
					<th>Avatar</th>
					<th>Name</th>
					<th>Role</th>
					<th>Manager</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{employees.map((emp) => (
					<tr key={emp.id}>
						<td>
							<img
								src={`https://www.gravatar.com/avatar/${md5(emp.email.trim().toLowerCase())}?d=identicon`}
								alt="avatar"
								width="40"
								height="40"
							/>
						</td>
						<td>
							{emp.name} {emp.surname}
						</td>
						<td>{emp.role}</td>
						<td>{emp.manager_name || '—'}</td>
						<td>
							<button onClick={() => onEdit(emp.id)}>Edit</button>
							<button onClick={() => onDelete(emp.id)}>Delete</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
