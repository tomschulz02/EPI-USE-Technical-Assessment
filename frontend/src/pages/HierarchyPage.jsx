import React, { useEffect, useState } from 'react';
import HierarchyTree from '../components/HierarchyTree';
import api from '../api/api';
import apiRequest from '../api/api';

export default function HierarchyPage() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchTree = async () => {
			try {
				const data = await apiRequest('/employees/hierarchy/', { method: 'GET' });
				setData(data.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchTree();
	}, []);

	if (!data) return <p>Loading...</p>;

	return (
		<div className="view-page-hierarchy-container">
			<h1>Organisation Hierarchy</h1>
			<HierarchyTree data={data} onNodeClick={(node) => console.log(node)} />
		</div>
	);
}
