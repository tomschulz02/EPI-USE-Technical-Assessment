import React from 'react';
import Tree from 'react-d3-tree';
import '../styles/hierarchy.css';

export default function HierarchyTree({ data, onNodeClick }) {
	return (
		<div className="hierarchy-container">
			<Tree data={data} orientation="vertical" translate={{ x: 400, y: 50 }} onNodeClick={onNodeClick} />
		</div>
	);
}
