import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Tree from 'react-d3-tree';
import md5 from 'md5'; // for Gravatar
import '../styles/hierarchy.css';

// Utility: Gravatar URL
const getGravatarUrl = (email, size = 40) => {
	if (!email) return `https://www.gravatar.com/avatar/?d=identicon&s=${size}`;
	const hash = md5(email.trim().toLowerCase());
	return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

// Map roles to colors
const roleColors = {
	CEO: '#FF5722',
	CTO: '#4CAF50',
	CFO: '#2196F3',
	'Lead Developer': '#FFC107',
	'Frontend Developer': '#9C27B0',
	'Backend Developer': '#795548',
	Accountant: '#00BCD4',
	'Financial Analyst': '#FF9800',
};

export default function HierarchyTree({ data, onNodeClick, hierarchyPointNode }) {
	const [hoveredNode, setHoveredNode] = useState(null);

	const CustomNode = ({ nodeDatum, toggleNode }) => {
		const avatarSize = 40;
		const xOffset = avatarSize / 2;
		const roleColor = roleColors[nodeDatum.attributes.role] || '#777';

		const nodeRef = React.useRef();

		const handleMouseEnter = () => {
			setTimeout(() => {
				if (nodeRef.current) {
					const rect = nodeRef.current.getBoundingClientRect();
					setHoveredNode({ node: nodeDatum, x: rect.left + rect.width / 2, y: rect.top, roleColor });
				}
			}, 10);
		};

		const handleMouseLeave = () => {
			setHoveredNode(null);
		};

		return (
			<g ref={nodeRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				{/* Node Circle / Avatar */}
				<circle
					r={avatarSize / 2}
					fill={roleColor}
					stroke="#333"
					strokeWidth={2}
					onClick={toggleNode}
					style={{ cursor: 'pointer' }}
				/>

				{/* Gravatar */}
				<image
					href={getGravatarUrl(nodeDatum.attributes.email, avatarSize)}
					x={-xOffset}
					y={-avatarSize / 2}
					width={avatarSize}
					height={avatarSize}
					clipPath="circle(50%)"
					onClick={toggleNode}
					style={{ cursor: 'pointer' }}
				/>

				{/* Name */}
				<text x={avatarSize / 2 + 5} dy={0} fontSize={18}>
					{nodeDatum.name}
				</text>

				{/* Role */}
				<text x={avatarSize / 2 + 5} dy={15} fontSize={14}>
					{nodeDatum.attributes.role}
				</text>
			</g>
		);
	};

	return (
		<div className="hierarchy-container">
			<Tree
				data={data}
				orientation="vertical"
				translate={{ x: 400, y: 50 }}
				nodeSize={{ x: 180, y: 100 }}
				separation={{ siblings: 1.5, nonSiblings: 2 }}
				pathFunc="elbow"
				collapsible={true}
				initialDepth={0}
				onNodeClick={onNodeClick}
				renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
			/>

			{hoveredNode &&
				createPortal(
					<div
						className="hover-card"
						style={{
							position: 'absolute',
							left: hoveredNode.x - 30,
							top: hoveredNode.y - 50,
							backgroundColor: 'white',
							border: `2px solid ${hoveredNode.roleColor}`,
							borderRadius: 8,
							padding: 10,
							boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
							pointerEvents: 'none',
							whiteSpace: 'nowrap',
							fontSize: 12,
							display: 'flex',
							alignItems: 'center',
							zIndex: 1000,
						}}>
						{/* Avatar in hover card */}
						<img
							src={getGravatarUrl(hoveredNode.node.attributes.email, 50)}
							alt={hoveredNode.node.name}
							style={{
								width: 50,
								height: 50,
								borderRadius: '50%',
								border: `2px solid ${hoveredNode.roleColor}`,
								marginRight: 10,
							}}
						/>
						{/* Info */}
						<div>
							<div>
								<strong>{hoveredNode.node.name}</strong>
							</div>
							<div>Role: {hoveredNode.node.attributes.role}</div>
							<div>Email: {hoveredNode.node.attributes.email}</div>
							<div>Employee #: {hoveredNode.node.attributes.employee_no}</div>
							<div>Salary: {hoveredNode.node.attributes.salary}</div>
						</div>
					</div>,
					document.body
				)}
		</div>
	);
}
