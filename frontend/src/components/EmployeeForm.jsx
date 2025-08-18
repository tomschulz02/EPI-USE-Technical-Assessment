import React, { useEffect, useState } from 'react';
import '../styles/form.css';

export default function EmployeeForm({ initialData, managers, onSubmit }) {
	const [form, setForm] = useState({
		name: '',
		surname: '',
		email: '',
		role: '',
		salary: '',
		dob: '',
		employee_no: '',
		manager: '',
	});

	useEffect(() => {
		setForm(
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
	}, [initialData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(form);
		onSubmit(form);
	};

	return (
		<form className="employee-form" onSubmit={handleSubmit}>
			<div className="form-field">
				<input name="name" value={form.name || ''} onChange={handleChange} placeholder=" " required />
				<label>First Name</label>
			</div>
			<div className="form-field">
				<input name="surname" value={form.surname || ''} onChange={handleChange} placeholder=" " required />
				<label>Last Name</label>
			</div>
			<div className="form-field">
				<input name="email" value={form.email || ''} onChange={handleChange} placeholder=" " required />
				<label>Email</label>
			</div>
			<div className="form-field">
				<input name="role" value={form.role || ''} onChange={handleChange} placeholder=" " required />
				<label>Role</label>
			</div>
			<div className="form-field">
				<input type="number" name="salary" value={form.salary || ''} onChange={handleChange} placeholder=" " required />
				<label>Salary</label>
			</div>
			<div className="form-field">
				<input type="date" name="dob" value={form.dob ? form.dob.split('T')[0] : ''} onChange={handleChange} required />
				<label>Date of Birth</label>
			</div>
			<div className="form-field">
				<input name="employee_no" value={form.employee_no || ''} onChange={handleChange} placeholder=" " required />
				<label>Employee Number</label>
			</div>
			<div className="form-field">
				<select name="manager" value={form.manager} onChange={handleChange}>
					<option value="">No Manager</option>
					{managers.map((m) => (
						<option key={m.id} value={m.id}>
							{m.name} {m.surname}
						</option>
					))}
				</select>
				<label>Manager</label>
			</div>
			<button type="submit">Save</button>
		</form>
	);
}
