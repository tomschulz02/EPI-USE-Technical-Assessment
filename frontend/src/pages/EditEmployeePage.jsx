import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import apiRequest from '../api/api';
import Loader from '../components/Loader';

export default function EditEmployeePage({ emp_id, closeEdit }) {
	const id = emp_id;
	const [managers, setManagers] = useState([]);
	const [employee, setEmployee] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchEmployeeData = async () => {
			setLoading(true);
			try {
				const managers = await apiRequest('/employees/', { method: 'GET' });
				setManagers(managers.data);

				const data = await apiRequest(`/employees/${id}`, { method: 'GET' });
				setEmployee(data.data);
			} catch (error) {
				console.error(error);
				setEmployee({});
				setManagers([]);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployeeData();
	}, [id]);

	const handleSubmit = async (form) => {
		setLoading(true);
		try {
			await apiRequest(`/employees/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
		} catch (error) {
			console.error(error);
			window.alert('Failed to update employee details');
		} finally {
			setLoading(false);
			closeEdit({ target: { className: 'edit-employees-close-window' }, action: 'submit' });
		}
	};

	return (
		<>
			{loading && <Loader />}
			<div className="edit-employees-container" onClick={closeEdit}>
				<div className="edit-employees-window">
					<h1>Edit Employee</h1>
					<div className="edit-employees-close-window" onClick={closeEdit}>
						&times;
					</div>
					<EmployeeForm initialData={employee} managers={managers} onSubmit={handleSubmit} />
				</div>
			</div>
		</>
	);
}
