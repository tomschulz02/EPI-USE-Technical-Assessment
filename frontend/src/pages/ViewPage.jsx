import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ViewPage() {
	const [activeTab, setActiveTab] = useState('/table');
	const location = useLocation();

	useEffect(() => {
		setActiveTab(location.pathname);
	}, [location.pathname]);

	return (
		<>
			<div className="view-page-nav-bar">
				<Link to={'/view/table'} className={`${activeTab.includes('table') ? 'active' : ''}`}>
					View Table
				</Link>
				<Link to={'/view/tree'} className={`${activeTab.includes('tree') ? 'active' : ''}`}>
					View Hierarchy
				</Link>
			</div>
			<div className="view-page-content">
				<Outlet />
			</div>
		</>
	);
}
