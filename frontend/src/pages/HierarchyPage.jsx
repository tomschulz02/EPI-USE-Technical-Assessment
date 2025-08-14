import React, { useEffect, useState } from 'react';
import HierarchyTree from '../components/HierarchyTree';
import api from '../api/api';

export default function HierarchyPage() {
	const [data, setData] = useState(null);

	useEffect(() => {
		api.get('/hierarchy').then((res) => setData(res.data));
	}, []);

	if (!data) return <p>Loading...</p>;

	return (
		<div>
			<h1>Organisation Hierarchy</h1>
			<HierarchyTree data={data} onNodeClick={(node) => console.log(node)} />
		</div>
	);
}
