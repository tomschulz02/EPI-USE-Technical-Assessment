import React, { useState } from 'react';
import '../styles/form.css';

export default function EmployeeForm({ initialData, managers, onSubmit }) {
	const [form, setForm] = useState(
		initialData || {
			name: '',
			surname: '',
			email: '',
			role: '',
			salary: '',
			dob: '',
			employee_no: '',
			manager: '',
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<form className="employee-form" onSubmit={handleSubmit}>
			<input name="name" value={form.name} onChange={handleChange} placeholder="First Name" required />
			<input name="surname" value={form.surname} onChange={handleChange} placeholder="Last Name" required />
			<input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
			<input name="role" value={form.role} onChange={handleChange} placeholder="Role" required />
			<input type="number" name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" required />
			<input type="date" name="birth_date" value={form.dob} onChange={handleChange} required />
			<input
				name="employee_number"
				value={form.employee_no}
				onChange={handleChange}
				placeholder="Employee Number"
				required
			/>
			<select name="manager_id" value={form.manager} onChange={handleChange}>
				<option value="">No Manager</option>
				{managers.map((m) => (
					<option key={m.id} value={m.id}>
						{m.name} {m.surname}
					</option>
				))}
			</select>
			<button type="submit">Save</button>
		</form>
	);
}
