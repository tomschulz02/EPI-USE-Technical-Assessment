import { BrowserRouter as Router, Routes, Route, Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AddEmployeePage from './pages/AddEmployeePage';
import HierarchyPage from './pages/HierarchyPage';
import TablePage from './pages/TablePage';
import ViewPage from './pages/ViewPage';
import { MessagePopup } from './components/MessageContext';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Navigate to={'/home'} replace />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/view" element={<ViewPage />}>
						<Route path="/view" element={<Navigate to={'/view/table'} replace />} />
						<Route path="/view/table" element={<TablePage />} />
						<Route path="/view/tree" element={<HierarchyPage />} />
					</Route>
					<Route path="/add" element={<AddEmployeePage />} />
				</Route>
			</Routes>
		</Router>
	);
}

function Layout() {
	const [activeTab, setActiveTab] = useState('');
	const location = useLocation();

	useEffect(() => {
		const tab = location.pathname;
		setActiveTab(tab);
	}, [location.pathname]);

	return (
		<>
			<header>
				<h1>EPI-USE Technical Assessment</h1>
			</header>
			<nav>
				<Link to={'/home'} className={`${activeTab.includes('/home') ? 'active' : ''}`}>
					Home
				</Link>
				<Link to={'/view'} className={`${activeTab.includes('/view') ? 'active' : ''}`}>
					View
				</Link>
				<Link to={'/add'} className={`${activeTab.includes('/add') ? 'active' : ''}`}>
					Add
				</Link>
			</nav>
			<MessagePopup />
			<main>
				<Outlet />
			</main>
			<footer>
				<p>This application was created by Thomas Schulz for the use and evaluation by EPI-USE</p>
			</footer>
		</>
	);
}
