import React, { useEffect, useState } from 'react';
import HierarchyTree from '../components/HierarchyTree';
import api from '../api/api';
import apiRequest from '../api/api';
import Loader from '../components/Loader';
import { useMessage } from '../components/MessageContext';

export default function HierarchyPage() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const { showMessage } = useMessage();

	useEffect(() => {
		const fetchTree = async () => {
			setLoading(true);
			try {
				const data = await apiRequest('/employees/hierarchy/', { method: 'GET' });
				setData(data.data);
			} catch (error) {
				showMessage(error.message, 'error');
			} finally {
				setLoading(false);
			}
		};
		fetchTree();
	}, []);

	return (
		<>
			{loading && <Loader />}
			<div className="view-page-hierarchy-container">
				<h1>Organisation Hierarchy</h1>
				{data ? (
					<HierarchyTree data={data} onNodeClick={(node) => console.log(node)} />
				) : (
					<p>A hierarchy tree cannot be drawn from the given employee data</p>
				)}
			</div>
		</>
	);
}
