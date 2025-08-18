import '../styles/card.css';
import md5 from 'md5';

export default function EmployeeCard({ details, onClose }) {
	const handleClose = (e) => {
		if (e.target.className === 'employee-card-overlay') {
			onClose();
		}
	};

	const getGravatarUrl = (email, size = 40) => {
		if (!email) return `https://www.gravatar.com/avatar/?d=identicon&s=${size}`;
		const hash = md5(email.trim().toLowerCase());
		return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
	};

	return (
		<>
			<div className="employee-card-overlay" onClick={handleClose}>
				<div className="employee-card-container">
					<h1>Employee Details</h1>
					<div className="employee-card-content">
						<div className="employee-card-avatar">
							<img src={getGravatarUrl(details.email, 100)} alt="employee avatar" />
						</div>
						<h2>{`${details.name} ${details.surname}`}</h2>
						<sub>{details.role}</sub>
						<div className="employee-card-content-section">
							<h3>Contact</h3>
							<p>{details.email}</p>
						</div>
						<div className="employee-card-content-section">
							<h3>Date of Birth</h3>
							<p>{details.birth_date.split('T')[0]}</p>
						</div>
						<div className="employee-card-content-section">
							<h3>Salary</h3>
							<p>{details.salary}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
