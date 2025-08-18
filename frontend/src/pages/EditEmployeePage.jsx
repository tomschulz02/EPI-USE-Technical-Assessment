import React, { useEffect, useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import apiRequest from '../api/api';
import Loader from '../components/Loader';
import { useMessage } from '../components/MessageContext';

export default function EditEmployeePage({ emp_id, closeEdit }) {
	const id = emp_id;
	const [managers, setManagers] = useState([]);
	const [employee, setEmployee] = useState({});
	const [loading, setLoading] = useState(false);
	const { showMessage } = useMessage();

	useEffect(() => {
		const fetchEmployeeData = async () => {
			setLoading(true);
			try {
				const managers = await apiRequest('/employees/', { method: 'GET' });
				setManagers(managers.data);

				const data = await apiRequest(`/employees/${id}`, { method: 'GET' });
				setEmployee(data.data);
			} catch (error) {
				showMessage(error.message, 'error');
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
			showMessage('Successfully updated employee data', 'success');
			closeEdit({ target: { className: 'edit-employees-close-window' }, action: 'submit' });
		} catch (error) {
			showMessage(error.message, 'error');
		} finally {
			setLoading(false);
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
