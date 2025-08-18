import React, { useEffect, useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import apiRequest from '../api/api';
import Loader from '../components/Loader';
import { useMessage } from '../components/MessageContext';

export default function AddEmployeePage() {
	const [managers, setManagers] = useState([]);
	const [loading, setLoading] = useState(false);
	const { showMessage } = useMessage();

	useEffect(() => {
		const fetchManagers = async () => {
			setLoading(true);
			try {
				const data = await apiRequest('/employees/', { method: 'GET' });

				setManagers(data.data);
			} catch (error) {
				showMessage('Failed to load managers', 'error');
				setManagers([]);
			} finally {
				setLoading(false);
			}
		};

		fetchManagers();
	}, []);

	const handleSubmit = async (form) => {
		setLoading(true);
		try {
			const response = await apiRequest('/employees/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			if (response.success) {
				showMessage('Successfully registered employee', 'success');
			}
		} catch (error) {
			showMessage(error.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading && <Loader />}
			<div className="add-employee-form">
				<h1>Add Employee</h1>
				<EmployeeForm managers={managers} onSubmit={handleSubmit} />
			</div>
		</>
	);
}
