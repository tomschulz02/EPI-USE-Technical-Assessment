import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import HierarchyPage from './pages/HierarchyPage';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/add" element={<AddEmployeePage />} />
				<Route path="/edit/:id" element={<EditEmployeePage />} />
				<Route path="/hierarchy" element={<HierarchyPage />} />
			</Routes>
		</Router>
	);
}
