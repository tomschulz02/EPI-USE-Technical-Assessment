import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div className="home-welcome-container">
			<div className="home-welcome-header">
				<h2>Welcome</h2>
			</div>
			<div className="home-welcome-nav">
				<Link to={'/view'} className="home-welcome-nav-item">
					View Employees
				</Link>
				<Link to={'/add'} className="home-welcome-nav-item">
					Add Employees
				</Link>
			</div>
			<div className="home-welcome-message">
				<p>Welcome to the cloud-hosted employee register for EPI-USE.</p>
				<p>Here you can view all the employees in the organisation in either a table or tree format. It's up to you.</p>
				<p>
					You can also add new employees to the organisation, or modify existing employees to reflect business advances.
				</p>
				<p>
					Get started by navigating to one of our pages using the quick links or the navigation bar at the top of the
					page
				</p>
			</div>
		</div>
	);
}
